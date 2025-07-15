<!-- src/webview/components/Menu.svelte -->
<script lang="ts">
  import { currentPage } from '../store';

  export let current: 'TransferEncoder' | 'AddressToHex' = 'TransferEncoder';
  export let page: string;

  currentPage.subscribe((value) => {
    page = value;
    current = value;
  });

  function navigate(page: 'TransferEncoder' | 'AddressToHex') {
    currentPage.set(page);
  }
</script>

<nav class="menu">
  <button
    class:active={current === 'TransferEncoder'}
    on:click={() => navigate('TransferEncoder')}
  >
    TRC20 인코딩
  </button>
  <button
    class:active={current === 'AddressToHex'}
    on:click={() => navigate('AddressToHex')}
  >
    주소 → HEX 변환
  </button>
</nav>

<style>
  .menu {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    flex-wrap: wrap;
  }
  .menu button.active {
    background-color: #333;
    color: white;
  }
</style>
