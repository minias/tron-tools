<script lang="ts">
  import { currentPage, type Page } from './store';
  //import { onMount } from 'svelte';
  //import { derived } from 'svelte/store';
  import TransferEncoder from './pages/TransferEncoder.svelte';
  import AddressToHex from './pages/AddressToHex.svelte';
  import ResourceStatus from './pages/ResourceStatus.svelte';
  //import Menu from './components/Menu.svelte';

  let page: Page = 'TransferEncoder';

  currentPage.subscribe((value) => {
    page = value;
  });
</script>

{#if page === 'TransferEncoder'}
  <TransferEncoder />
{:else if page === 'ResourceStatus'}
  <ResourceStatus />  
{:else if page === 'AddressToHex'}
  <AddressToHex />
{/if}
