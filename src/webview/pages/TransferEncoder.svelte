<!-- src/webview/pages/TransferEncoder.svelte -->
<script lang="ts">
  import Menu from '../components/Menu.svelte';
  import { type Page } from '../store';
  let page: Page = 'TransferEncoder';
  // ABI 인코딩용 유틸 (ethers 이용)
  import { Interface } from 'ethers';
  import { tronAddressToHex } from '$lib/abiEncoder';
  
  const abi = ["function transferFrom(address from, address to, uint256 value)"];
  const iface = new Interface(abi);

  let owner = '';
  let from = '';
  let to = '';
  let amount = '';
  let encoded = '';
  let error = '';

  function encode() {
  try {
    error = '';
    const trimmedFrom = String(from).trim();
    const trimmedTo = String(to).trim();
    const trimmedAmount = String(amount).trim();

    if (!trimmedFrom.startsWith('T') || trimmedFrom.length < 34) {
      throw new Error('from 주소 형식이 잘못되었습니다');
    }

    if (!trimmedTo.startsWith('T') || trimmedTo.length < 34) {
      throw new Error('to 주소 형식이 잘못되었습니다');
    }

    if (!trimmedAmount || isNaN(Number(trimmedAmount))) {
      throw new Error('amount 값이 잘못되었습니다');
    }

    const hexFrom = tronAddressToHex(trimmedFrom);
    const hexTo = tronAddressToHex(trimmedTo);
    const bigAmount = BigInt(trimmedAmount);

    encoded = iface.encodeFunctionData("transferFrom", [hexFrom, hexTo, bigAmount]);
  } catch (e) {
    encoded = '';
    error = '⚠️ ABI 인코딩 실패: ' + (e instanceof Error ? e.message : String(e));
  }
}

</script>

<style>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }

  label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
  }
  /* select, */
  input,
  textarea,
  .full-button {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }


  .full-button {
    margin-top: 1rem;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    /* 꼭 추가 */
    pointer-events: auto;
    z-index: 0;
  }
 
</style>
  <Menu {page} />
  <div class="form-container">
  <label for="from">From 주소</label>
  <input id="from" bind:value={from} placeholder="보내는 주소" />
  <label for="to">To 주소</label>
  <input id="to"  bind:value={to} placeholder="받는 주소" />
  <label for="amount">Amount</label>
  <input id="amount"  bind:value={amount} placeholder="정수 형태로 입력 (예: 1000000)" type="number" />
  <button on:click={encode} class="full-button">ABI 인코딩</button>
  {#if encoded}
    <label    for="encoded" style="margin-top:2rem">인코딩 결과 (hex)</label>
    <textarea id="encoded"  readonly style="width:100%;height:150px">{encoded}</textarea>
  {/if}
  {#if error}
    <p style="color:red">{error}</p>
  {/if}
</div>

