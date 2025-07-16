<!-- src/webview/pages/AddressToHex.svelte -->
<script lang="ts">
  import Layout from '../components/Layout.svelte';
  import { type Page } from '../store';
  import { tronAddressToHex, tronHexToAddress } from '$lib/abiEncoder';

  let page: Page = 'AddressToHex';
  let tronAddress = '';
  let hexAddress = '';
  let error = '';

  function convert() {
    try {
      error = '';
      if (tronAddress.trim() && !hexAddress.trim()) {
        hexAddress = tronAddressToHex(tronAddress.trim());
      } else if (!tronAddress.trim() && hexAddress.trim()) {
        tronAddress = tronHexToAddress(hexAddress.trim());
      } else if (tronAddress.trim() && hexAddress.trim()) {
        hexAddress = tronAddressToHex(tronAddress.trim());
      } else {
        error = '⚠️ 주소 또는 HEX 입력이 필요합니다.';
      }
    } catch (e) {
      error = '⚠️ 변환 실패: ' + (e instanceof Error ? e.message : String(e));
    }
  }
</script>
<Layout {page}>
  <!-- 좌측 textarea -->
  <div class="box">
    <textarea bind:value={tronAddress} placeholder="TRON 주소 (예: T...)" rows="3"></textarea>
  </div>

  <!-- 중앙 버튼 (높이 100% 맞춤) -->
  <div class="center-button">
    <button on:click={convert}>변환</button>
  </div>

  <!-- 우측 textarea -->
  <div class="box">
    <textarea bind:value={hexAddress} placeholder="HEX 주소 (예: 41...)" rows="3"></textarea>
  </div>
</Layout>

 
{#if error}
  <div class="error-container">
    <pre class="error-message">{error}</pre>
  </div>
{/if}
