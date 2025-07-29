<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let methods: string[];
  export let selectedMethod: string;

  const dispatch = createEventDispatcher();

  const methodHelp: Record<string, string> = {
    transferFrom: 'From 주소가 포함된 transferFrom(from, to, amount)',
    transfer: 'To 주소로 amount만 입력하는 transfer(to, amount)',
    approve: 'Spender에게 amount를 허용하는 approve(spender, amount)',
  };

  function handleChange(event: Event) {
    const newMethod = (event.target as HTMLSelectElement).value;
    dispatch('change', newMethod); // 🔥 커스텀 이벤트 dispatch
  }
</script>

<div class="method-selector">
  <select bind:value={selectedMethod} on:change={handleChange}>
    {#each methods as method}
      <option value={method}>{method}</option>
    {/each}
  </select>
  <p class="help-text">{methodHelp[selectedMethod]}</p>
</div>

<style>
  .method-selector {
    position: sticky; /* 스크롤해도 상단 고정 */
    top: 0;
    background: white;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #eee;
  }

  select {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    max-width: 250px;
    background-color: white;
    appearance: none;
  }

  .help-text {
    font-size: 0.9em;
    color: #666;
    margin-top: 0.25rem;
  }
</style>