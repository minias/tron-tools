<!-- src/webview/pages/TransferEncoder.svelte -->
<script lang="ts">
  import Layout from '../components/Layout.svelte';
  import { type Page } from '../store';
  import { trc20Interface, tronAddressToEthHex, tronHexToBase58 } from '$lib/abiEncoder';

  let page: Page = 'TransferEncoder';
  let from = '';
  let to = '';
  let amount = '';
  let bytecode = '';
  let error = '';

  function encode() {
    const hexFrom = tronAddressToEthHex(String(from).trim());
    const hexTo = tronAddressToEthHex(String(to).trim());
    const bigAmount = BigInt(String(amount).trim());

    bytecode = trc20Interface
      .encodeFunctionData('transferFrom', [hexFrom, hexTo, bigAmount])
      .replace(/^0x/, '');
  }

  function decode() {
    const fullBytecode = bytecode.startsWith('0x') ? bytecode : '0x' + bytecode;
    const decoded = trc20Interface.decodeFunctionData('transferFrom', fullBytecode);
    from = tronHexToBase58(decoded.from);
    to = tronHexToBase58(decoded.to);
    amount = decoded.value.toString();
  }

  function transform() {
    try {
      error = '';
      if (bytecode.trim() === '') {
        encode();
      } else {
        decode();
      }
    } catch (e) {
      error = '⚠️ 변환 실패: ' + (e instanceof Error ? e.message : String(e));
    }
  }
</script>
<Layout {page}>
  <div class="box">
    <input bind:value={from} placeholder="From 주소 (T...)" />
    <input bind:value={to} placeholder="To 주소 (T...)" />
    <input bind:value={amount} type="number" placeholder="Amount (예: 1000000)" />
  </div>

  <div class="center-button">
    <button on:click={transform}>변환</button>
  </div>

  <div class="box">
    <textarea bind:value={bytecode} placeholder="Bytecode 입력 또는 출력"></textarea>
  </div>
</Layout>
{#if error}
  <div class="error-container">
    <pre class="error-message">{error}</pre>
  </div>
{/if}

