<!-- src/webview/pages/ResourceStatus.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import Chart from 'chart.js/auto';
  import dayjs from 'dayjs';

  export let page = 'ResourceStatus';

  //let startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  let startDate = dayjs('2025-01-01 00:00:00').format('YYYY-MM-DD');
  let endDate = dayjs().format('YYYY-MM-DD');
  let chart: Chart | null = null;

  const contractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // TRC20 USDT 

  async function fetchData() {
    const startTs = Number(dayjs(startDate).startOf('day').valueOf());
    const endTs = Number(dayjs(endDate).endOf('day').valueOf());

    const url = `https://apilist.tronscanapi.com/api/contract/analysis?address=${contractAddress}&type=2&start_timestamp=${startTs}&end_timestamp=${endTs}`;
    const res = await fetch(url);
    const data = await res.json();

    const labels = data.data?.map((d: any) => dayjs(d.timestamp).format('MM-DD')) || [];
    const energy = data.data?.map((d: any) => d.energy_usage || 0);
    const bandwidth = data.data?.map((d: any) => d.net_usage || 0);

    if (chart) chart.destroy();
    const ctx = document.getElementById('usageChart') as HTMLCanvasElement;
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Energy Usage',
            data: energy,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.3,
          },
          {
            label: 'Bandwidth Usage',
            data: bandwidth,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.3,
          }
        ]
      }
    });
  }

  onMount(fetchData);
</script>

<Layout {page}>

  <div class="form">
    <div class="field-group">
      <div class="box">
        <label for="startDate">시작일</label>
        <input id="startDate" type="date" bind:value={startDate} />
      </div>
      <div class="box">
        <label for="endDate">종료일</label>
        <input id="endDate" type="date" bind:value={endDate} />
      </div>
      <div class="box">
        <label for="contractAddress">USDT 컨트랙트 주소</label>
        <input id="contractAddress" type="text" value={contractAddress} disabled />
      </div>
      <button class="button" on:click={fetchData}>조회</button>
    </div>
  </div>
  <div class="box"><canvas id="usageChart" width="400" height="200"></canvas></div>
</Layout>

 