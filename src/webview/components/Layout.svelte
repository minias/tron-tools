<!-- src/webview/components/Layout.svelte -->
<script lang="ts">
  export let page: string;
  import Menu from './Menu.svelte';
</script>

<Menu {page} />
<div class="layout">
  <slot />
</div>