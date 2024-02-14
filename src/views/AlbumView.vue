<script setup>
  import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
  import { storeToRefs } from 'pinia';
  import { albumsStore } from '@/stores/albums';
  import ExaiLoaderNew from '@/components/ExaiLoaderNew.vue';
  import AlbumDetails from '@/components/AlbumDetails.vue';

  const useAlbumsStore = albumsStore();
  const { album, albumData, pageLoad } = storeToRefs(useAlbumsStore);
 
  console.log('album', album.value);
  console.log('album details', albumData.value);

  useAlbumsStore.fetchAlbumData();

</script>

<template>
 
    <ExaiLoaderNew variation="page" v-if="pageLoad"></ExaiLoaderNew>
    <AlbumDetails v-else :albumDetails="albumData" :albumData="album"></AlbumDetails>

</template>

<style lang="scss">
// @media (min-width: 1024px) {
//   .about {
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//   }
// }
</style>
