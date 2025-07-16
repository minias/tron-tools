<!-- src/webview/components/Menu.svelte -->
<script lang="ts">
  import { currentPage } from '../store';

  export let current: 'TransferEncoder' | 'ResourceStatus' | 'AddressToHex' = 'TransferEncoder';
  export let page: string;

  currentPage.subscribe((value) => {
    page = value;
    current = value;
  });

  function navigate(page: 'TransferEncoder' | 'ResourceStatus' | 'AddressToHex') {
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
  <button
    class:active={current === 'ResourceStatus'}
    on:click={() => navigate('ResourceStatus')}
  >
    에너지 사용량 조회
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

  .menu button {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    min-width: 160px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .menu button:hover {
    background-color: #ececec;
  }

  .menu button.active {
    background-color: #333;
    color: white;
    border-color: #333;
  }

  @media (max-width: 480px) {
    .menu {
      flex-direction: column;
    }

    .menu button {
      width: 100%;
    }
  }
</style>