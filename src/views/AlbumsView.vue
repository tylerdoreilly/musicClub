<script setup>
  import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
  import { storeToRefs } from 'pinia';
  import { albumsStore } from '@/stores/albums';
  import ExaiTable from '@/components/ExaiTable.vue';
  import ExaiLoaderNew from '@/components/ExaiLoaderNew.vue';
  import AvgScore from '@/components/AvgScore.vue';
  import { useMediaQuery } from '@vueuse/core';

  const useAlbumsStore = albumsStore();
  const { albumsList, pageLoad, albumTableHeaders, error } = storeToRefs(useAlbumsStore);

  useAlbumsStore.fetchAlbumsList();

  const isLargeScreen = useMediaQuery('(min-width: 1960px)');
  const isMediumScreen = useMediaQuery('(max-width: 1435px)');

  console.log('albums', albumsList)

</script>


<template>
  <main class="layout-fluid">
    <div class="page-header">
      <h1 class="page-header__title">Albums</h1>
    </div>

    <ExaiLoaderNew variation="page" v-if="pageLoad"></ExaiLoaderNew>

    <template v-else>
        <exai-table 
          :data="albumsList" 
          :fields="albumTableHeaders">

            <template #headers="{ field }">

              <template v-if="field.field === 'by'">
                  <template v-if="isLargeScreen"> {{field.title}}</template>
                  <template v-else>By</template>
              </template>

              <template v-else-if="field.field === 'season'">
                  <template v-if="isLargeScreen"> {{field.title}}</template>
                  <template v-else>SZN</template>
              </template>

              <template v-else>
                    {{field.title}}
                </template>     
            </template>
        
            <template #columns="{ item, field }">
                <template v-if="field.field === 'artist'">
                  <template v-if="isMediumScreen">
                    <div>{{item[field.field]}}</div>
                    <div><strong>{{ item.album }}</strong></div>
                  </template>
                  <template v-else>
                    {{item[field.field]}}
                  </template>
                </template>

                <template v-else-if="field.field === 'album'">
                 {{item[field.field]}}
                </template>

                <template v-else-if="field.field === 'season'">
                  <template v-if="isLargeScreen">Season {{item[field.field]}}</template>
                  <template v-else>{{item[field.field]}}</template> 
                </template>

                <template v-else-if="field.field === 'avg'">
                    <AvgScore :avgScore="item[field.field]"></AvgScore>
                </template>

                <template v-else>
                    {{item[field.field]}}
                </template>          
               
             
            </template>        
        </exai-table>
    </template>
  </main>
 
</template>

<style lang="scss">
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

@media only screen and (min-width: 1500px) {
  /* For desktop: */
  .page-header{
    min-height:150px;
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
