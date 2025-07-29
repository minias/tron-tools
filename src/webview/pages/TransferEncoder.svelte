<!-- src/webview/pages/TransferEncoder.svelte -->
<script lang="ts">
  import Layout from '../components/Layout.svelte';
  import { type Page } from '../store';
  import { trc20Interface, tronAddressToEthHex, tronHexToBase58 } from '$lib/abiEncoder';
  import MethodSelector from '../components/MethodSelector.svelte'; // 🔥 추가

  let page: Page = 'TransferEncoder';

  // UI 상태
  let from = '';
  let to = '';
  let amount = '';
  let bytecode = '';
  let error = '';
  let selectedMethod = 'transferFrom'; // 'transfer', 'approve' 등 추가

  const methods = ['transferFrom', 'transfer', 'approve'];
 
function encode() {
  const args: any[] = [];

  if (selectedMethod === 'transferFrom') {
    args.push(tronAddressToEthHex(String(from).trim()));
    args.push(tronAddressToEthHex(String(to).trim()));
    args.push(BigInt(String(amount).trim()));
  } else if (selectedMethod === 'transfer' || selectedMethod === 'approve') {
    args.push(tronAddressToEthHex(String(to).trim()));
    args.push(BigInt(String(amount).trim()));
  }

  bytecode = trc20Interface
    .encodeFunctionData(selectedMethod, args)
    .replace(/^0x/, '');
}

function decode() {
  const fullBytecode = bytecode.startsWith('0x') ? bytecode : '0x' + bytecode;
  const decoded = trc20Interface.decodeFunctionData(selectedMethod, fullBytecode);

  if (selectedMethod === 'transferFrom') {
    from = tronHexToBase58(decoded.from);
    to = tronHexToBase58(decoded.to);
    amount = decoded.value.toString();
  } else if (selectedMethod === 'transfer' || selectedMethod === 'approve') {
    from = ''; // UI 상 숨김
    to = tronHexToBase58(decoded.to);
    amount = decoded.value.toString();
  }
}
function onMethodChange(method: string) {
  selectedMethod = method;
  from = '';
  to = '';
  amount = '';
  bytecode = '';
  error = '';
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
    {#if selectedMethod === 'transferFrom'}
      <input bind:value={from} placeholder="From 주소 (T...)" />
    <input bind:value={to} placeholder="To 주소 (T...)" />
    <input bind:value={amount} type="number" placeholder="Amount (예: 1000000)" />      
    {/if}

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
