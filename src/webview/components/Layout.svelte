<!-- src/webview/components/Layout.svelte -->
<script lang="ts">
  export let page: string;
  import Menu from './Menu.svelte';
  // 페이지별 정보 매핑
  const pageMeta: Record<string, { icon: string; title: string; description: string,style:string }> = {
    TransferEncoder: {
      icon: '🔐',
      title: 'TRC20 인코딩',
      description: 'transferFrom 함수를 ABI 인코딩합니다.',
      style: "layout-left",
    },
    AddressToHex: {
      icon: '🔁',
      title: '주소 ↔ HEX 변환',
      description: 'TRON 주소와 HEX 주소를 상호 변환합니다.',
      style: "layout-left",
    },
    ResourceStatus: {
      icon: '🔋',
      title: '에너지 사용량 조회',
      description: '계정의 에너지 및 대역폭 사용량을 조회합니다.',
      style: "layout",
    },
  };

  const { icon, title, description,style } = pageMeta[page] || {
    icon: '📄',
    title: page,
    description: '',
    style: "layout",
  };

</script>

<Menu {page} />

<!-- ✅ 타이틀 블록 -->
<div class="page-header">
  <h1 class="page-title">{icon} {title}</h1>
  {#if description}
    <p class="page-description">{description}</p>
  {/if}
</div>


<div class={style}>
  <slot />
</div>