<!-- src/webview/pages/AddressToHex.svelte -->
<script lang="ts">
  import Menu from '../components/Menu.svelte';
  import { currentPage, type Page } from '../store';
  import { tronAddressToHex } from '$lib/abiEncoder';
  let page: Page = 'AddressToHex';

  let address = '';
  let hex = '';
  let error = '';

  function convert() {
    try {
      error = '';
      hex = tronAddressToHex(address.trim());
    } catch (e) {
      hex = '';
      error = '⚠️ 변환 실패: ' + (e instanceof Error ? e.message : String(e));
    }
  }
</script>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }
  label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
  }
  input, textarea, button {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }
  button {
    margin-top: 1rem;
    background-color: #007acc;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
</style>
<Menu {page} />
<div class="container">
  <h2>TRON 주소 → Hex 변환</h2>

  <label for="address">TRON 주소 (예: T...)</label>
  <input id="address" bind:value={address} placeholder="예: TAbcd123..." />

  <button on:click={convert}>Hex로 변환</button>

  {#if hex}
    <label for="hex">0x Hex 주소</label>
    <textarea id="hex" readonly rows="3">{hex}</textarea>
  {/if}

  {#if error}
    <p style="color: red;">{error}</p>
  {/if}
</div>
