<script setup>
  import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
  import { storeToRefs } from 'pinia';
  import { seasonsStore } from '@/stores/seasons';
  import SeasonsList from '@/components/SeasonsList.vue';
  import ExaiAutocomplete from '@/components/ExaiAutocomplete.vue';
  import ExaiLoaderNew from '@/components/ExaiLoaderNew.vue';

  const useSeasonsStore = seasonsStore();

  const { seasonsList, season, pageLoad, error } = storeToRefs(useSeasonsStore);
  const selectedSeason = ref('');

  useSeasonsStore.fetchSeasonsList();

  function handleSeasonSelection(val){
    selectedSeason.value = val;
    useSeasonsStore.fetchSeasonData(selectedSeason.value);
  }

</script>


<template>
  <ExaiLoaderNew variation="page" v-if="pageLoad"></ExaiLoaderNew>
  
  <main class="layout-center">
    <div class="page-header">
      <h1 class="page-header__title">Seasons</h1>
    </div>

    <div class="page-actions">
      <exai-autocomplete 
        :searchList="seasonsList"
        label="Select a Season"
        @selectedItem="handleSeasonSelection" >
      </exai-autocomplete>
    </div>

    <template v-if="season.value">
      <div class="table-title">
        <p v-if="selectedSeason">
        <strong>{{ selectedSeason }}</strong>
        </p>
      </div> 
      <seasons-list :data="season"></seasons-list>
    </template>

    <template v-else>
      <div class="no-content">
        <div class="no-content__title">No Content Selected</div>
        <div class="no-content__message">Please select a season from above to view data</div>
      </div>
    </template>

    <template v-if="error">
      {{ error.message }}
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
