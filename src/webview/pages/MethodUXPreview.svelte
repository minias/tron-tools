<!-- src/webview/pages/MethodUXPreview.svelte -->
<script lang="ts">
  import { type Page } from '../store';
  import Layout from '../components/Layout.svelte';

  let page: Page = 'MethodUXPreview';
  let selectedMethod = 'transferFrom';
  const methods = ['transferFrom', 'transfer', 'approve', 'allowance', 'returnResource'];

  const methodHelp: Record<string, string> = {
    transferFrom: 'From 주소가 포함된 transferFrom(from, to, amount)',
    transfer: 'To 주소로 amount만 입력하는 transfer(to, amount)',
    approve: 'Spender에게 amount를 허용하는 approve(spender, amount)',
    allowance: 'owner, spender로 허용량을 조회하는 allowance(owner, spender)',
    returnResource: 'function returnResource(address receiver,uint256 amount,uint256 resourceType)',
  };

  let from = '', to = '', amount = '', spender = '', owner = '', resourceType = '';
  let bytecode = '';

  function encode() {
    let args: string[] = [];
    switch (selectedMethod) {
      case 'transferFrom':
        args = [from, to, amount];
        break;
      case 'transfer':
        args = [to, amount];
        break;
      case 'approve':
        args = [spender, amount];
        break;
      case 'allowance':
        args = [owner, spender];
        break;
      case 'returnResource':
        args = [to, amount, resourceType];
        break;
    }
    bytecode = JSON.stringify(args); // 🧪 mock encode (실제 abi.encodeFunctionData 로 대체 필요)
  }

  function decode() {
    const args = JSON.parse(bytecode);
    switch (selectedMethod) {
      case 'transferFrom':
        [from, to, amount] = args;
        break;
      case 'transfer':
        [to, amount] = args;
        break;
      case 'approve':
        [spender, amount] = args;
        break;
      case 'allowance':
        [owner, spender] = args;
        break;
      case 'returnResource':
        [to, amount, resourceType] = args;
        break;
    }
  }

  function transform() {
    if (bytecode.trim()) {
      decode();
    } else {
      encode();
    }
  }

  function reset() {
    from = to = amount = spender = owner = resourceType = bytecode = '';
  }

  function onMethodChange(event: Event) {
    selectedMethod = (event.target as HTMLSelectElement).value;
    reset();
  }
</script>

<Layout {page}>
  <!-- ✅ 메서드 선택 -->
  <div class="method-selector">
    <label for="method">메서드 선택</label>
    <select id="method" bind:value={selectedMethod}>
      <option value="transferFrom">transferFrom</option>
      <option value="transfer">transfer</option>
      <option value="approve">approve</option>
      <option value="allowance">allowance</option>
      <option value="returnResource">returnResource</option>
    </select>
  </div>

  <!-- ✅ 3열 레이아웃 (입력 | 버튼 | 결과) -->
  <div class="ux-grid">
    <!-- 🔹 좌측 입력 -->
    <div class="left-inputs">
      {#if selectedMethod === 'transferFrom'}
        <input bind:value={from} placeholder="From Address" />
        <input bind:value={to} placeholder="To Address" />
        <input bind:value={amount} type="number" placeholder="Amount" />
      {:else if selectedMethod === 'transfer'}
        <input bind:value={to} placeholder="To Address" />
        <input bind:value={amount} type="number" placeholder="Amount" />
      {:else if selectedMethod === 'approve'}
        <input bind:value={spender} placeholder="Spender Address" />
        <input bind:value={amount} type="number" placeholder="Amount" />
      {:else if selectedMethod === 'allowance'}
        <input bind:value={owner} placeholder="Owner Address" />
        <input bind:value={spender} placeholder="Spender Address" />
      {:else if selectedMethod === 'returnResource'}
        <input bind:value={to} placeholder="Receiver Address" />
        <input bind:value={amount} type="number" placeholder="Amount" />
        <input bind:value={resourceType} placeholder="Resource Type" />
      {/if}
    </div>

    <!-- 🔹 가운데 변환 버튼 -->
    <div class="center-button">
      <button on:click={transform}>변환</button>
    </div>

    <!-- 🔹 우측 결과 -->
    <div class="right-output">
      <textarea bind:value={bytecode} rows="6" readonly placeholder="Hex Bytecode"></textarea>
    </div>
  </div>
</Layout>


<style>
.method-selector {
    max-width: 1000px;
    margin: 2rem auto 0;
    display: flex;
    flex-direction: column;
  }

  .method-selector label {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .method-selector select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  .ux-grid {
    display: grid;
    grid-template-columns: 1fr auto 1.5fr;
    gap: 1rem;
    max-width: 1000px;
    margin: 1rem auto;
    align-items: flex-start;
  }

  .left-inputs,
  .right-output {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .center-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .center-button button {
    height: 100%;
    min-height: 3.5rem;
    padding: 0 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #007acc;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .center-button button:hover {
    background-color: #005fa3;
  }

  textarea {
    width: 100%;
    resize: none;
    font-family: monospace;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
</style>