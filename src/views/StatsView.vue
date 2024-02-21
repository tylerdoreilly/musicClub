<script setup>
  import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
  import { storeToRefs } from 'pinia';
  import { albumsStore } from '@/stores/albums';
  import { statsStore } from '@/stores/stats';
  import StatsTable from '@/components/stats/StatsTable.vue';
  import ExaiLoaderNew from '@/components/ExaiLoaderNew.vue';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie,Doughnut } from 'vue-chartjs'
  import { useMediaQuery } from '@vueuse/core';


  const useAlbumsStore = albumsStore();
  const useStatsStore = statsStore();
  const { albumsList, pageLoad } = storeToRefs(useAlbumsStore);
  const { statsTableHeaders } = storeToRefs(useStatsStore);

  useAlbumsStore.fetchAlbumsList();
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "start",
        labels: {
            usePointStyle: true,
            textAlign: "left",
            boxHeight: 8,
            boxWidth: 8,
            color: 'rgb(255,255,255)',
            padding:12
        },
        elements: {
            point: {
                hoverRadius: 0,
                pointRadius: 0,
                pointStyle: "circle",
            },
        },
      }
    }
  })

  const isLargeScreen = useMediaQuery('(min-width: 1500px)');

  console.log('albums', albumsList)

  const topTenAlbums = computed(() => {
    return albumsList.value.filter(album => album.avg == 10)
  });

  const topRatedAlbums = computed(() => {
    return albumsList.value.filter(album => album.avg >= 9 && album.avg < 10)
  });

  const scoresCount = computed(() =>{
   const topTens = avgCounts(albumsList, [10]);
   const topScores = avgCounts(albumsList, [8, 10])
   const averageScores = avgCounts(albumsList, [6, 8])
   const belowScores = avgCounts(albumsList, [4, 6])
   const shitScores = avgCounts(albumsList, [1, 4])

   const chartData = {
    labels: ['topTens', 'topScores', 'avgScores', 'belowScores', 'shitScores'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', 'pink'],
        data: [topTens, topScores, averageScores, belowScores, shitScores],
        borderWidth: 0,
      }
    ]
   }
  //  const counts = [
  //   {name:'topTens', pl: topTens, avg:'test', inc:'test'},
  //   {name:'topScores', pl: topScores, avg:'test', inc:'test'},
  //   {name:'avgScores', pl: averageScores, avg:'test', inc:'test'},
  //   {name:'belowScores', pl: belowScores, avg:'test', inc:'test'},
  //   {name:'shitScores', pl:shitScores, avg:'test', inc:'test'},
  // ]

   return chartData
  })

  const avgCounts = (albums, range) => {
    let count

    count = range.length > 1 ? 
      albums.value.filter(album => album.avg >= range[0] && album.avg < range[1]) :
      albums.value.filter(album => album.avg == range[0])

    return Number(count.length)
  }

</script>


<template>
  <main class="layout-center">
    <div class="page-header">
      <h1 class="page-header__title">Stats</h1>
    </div>

    <ExaiLoaderNew variation="page" v-if="pageLoad"></ExaiLoaderNew>

    <template v-else>
      <div class="album-section">
        <div class="album-section__header">Top Tens</div>
        <StatsTable :fields="statsTableHeaders" :data="topTenAlbums" :paging="false"></StatsTable>
      </div>

      <div class="album-section">
        <div class="album-section__header">Top Rated</div>
        <StatsTable :fields="statsTableHeaders" :data="topRatedAlbums" :paging="true"></StatsTable>
      </div>

      <div class="album-section">
        <div class="album-section__header">Scores Chart</div>
        <div class="test">
          <Doughnut :data="scoresCount" :options="options" />
        </div>
        
      </div>

      
    </template>
  </main>
 
</template>

<style lang="scss" scoped>
.test{
  height:400px;
  width:100%;
  background:#161618;
  padding:40px 20px;
}
.page-header{
  display:flex;
  flex-direction: row;
  align-items:center;
  width:100%;
  min-height:100px;

  &__title{
    color:white;

  }
}

.album-section{
        display:flex;
        flex-direction:column;
        margin-bottom:60px;
    }
    .album-section__header{
        font-size:18px;
        color:white;
        display:inline-flex;
        flex-direction:row;
        align-self: flex-start;
        border-bottom:2px solid $exai-green;
        margin-bottom:20px;
    }

@media only screen and (min-width: 1500px) {
  /* For desktop: */
  .page-header{
    min-height:150px;
  }
}

</style>
