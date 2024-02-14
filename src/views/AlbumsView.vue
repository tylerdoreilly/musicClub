<script setup>
  import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
  import { storeToRefs } from 'pinia';
  import { albumsStore } from '@/stores/albums';
  import AlbumsList from '@/components/AlbumsList.vue';
  import ExaiTable from '@/components/ExaiTable.vue';
  import ExaiLoaderNew from '@/components/ExaiLoaderNew.vue';

  const useAlbumsStore = albumsStore();

  const { albumsList, pageLoad, albumTableHeaders, error } = storeToRefs(useAlbumsStore);
  const selectedSeason = ref('');

  useAlbumsStore.fetchAlbumsList();

  console.log('albums', albumsList)
  // function handleSeasonSelection(val){
  //   selectedSeason.value = val;
  //   useSeasonsStore.fetchSeasonData(selectedSeason.value);
  // }

</script>


<template>
  <main class="layout-fluid">
    <div class="page-header">
      <h1 class="page-header__title">Albums</h1>
    </div>

    <ExaiLoaderNew variation="page" v-if="pageLoad"></ExaiLoaderNew>

    <template v-else>
        <!-- <albums-list :data="albumsList"></albums-list> -->
        <exai-table :data="albumsList" :fields="albumTableHeaders"></exai-table>
    </template>
  </main>
 
 
  

 
 
  
</template>

<style lang="scss">
.page-header{
  display:flex;
  flex-direction: row;
  align-items:center;
  width:100%;
  min-height:150px;

  &__title{
    color:white;

  }
}

.page-actions{
  display:block;
  margin-bottom:20px;
}

.table-title{
  margin-bottom:30px;
  font-size:18px;
}

.no-content{
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  min-height:200px;
  max-height:400px;
  border-top:1px solid $exai-grey;
  border-bottom:1px solid $exai-grey;
  padding: 20px 0px;

  &__title{
    font-size:22px;
  }
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
