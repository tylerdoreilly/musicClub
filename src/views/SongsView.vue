<script setup>
  import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
  import { storeToRefs } from 'pinia';
  import { songsStore } from '@/stores/songs';
  import SongsList from '@/components/SongsList.vue';
  import ExaiLoaderNew from '@/components/ExaiLoaderNew.vue';
  import { useMediaQuery } from '@vueuse/core';

  const useSongsStore = songsStore();
  const { songsList, pageLoad, songTableHeaders, error } = storeToRefs(useSongsStore);

  useSongsStore.fetchSongsList();

  const isLargeScreen = useMediaQuery('(min-width: 1500px)');

  console.log('albums', songsList)

</script>


<template>
  <main class="layout-fluid">
    <div class="page-header">
      <h1 class="page-header__title">Songs</h1>
    </div>

    <ExaiLoaderNew variation="page" v-if="pageLoad"></ExaiLoaderNew>

    <template v-else>
        <SongsList 
          :data="songsList" 
          :fields="songTableHeaders">
        
            <template #columns="{ item, field }">
              <template v-if="field.field === 'artist'">
                  <strong>{{item[field.field]}}</strong>
                </template>

                <template v-else-if="field.field === 'song'">
                    <strong>{{item[field.field]}}</strong>
                </template>

                <template v-else-if="field.field === 'bracket'">
                    Bracket {{item[field.field]}}
                </template>

                <template v-else>
                    {{item[field.field]}}
                </template>          
            </template>        
        </SongsList>
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

.grouped-cols{
  display:flex;
  flex-direction: column;
  gap:2px;
}

strong {
    font-weight: bold;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
