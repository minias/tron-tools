<!-- src/webview/pages/ResourceStatus.svelte-->
 <script lang="ts">
  import Menu from '../components/Menu.svelte';
  import { type Page } from '../store';
  let page: Page = 'ResourceStatus';
</script>

<Menu {page} />