<script setup>
    import { computed, ref, toRefs, useCssModule, onMounted } from 'vue';
    import AlbumScores from '@/components/AlbumScores.vue';

  const props = defineProps({
    data:{
      type: Array,
      docs:{
        validation:'_',
        description:'Button text'
      }
    },
  });

  const { data } = toRefs(props);

  onMounted(() => {
 
  })
</script>

<template>
    <template v-for="(album, index) in data" :key="index">
       <div class="album-list">
            <div class="album">
                <div class="album__content">
                    <div class="album__cover">
                        <template v-if="album.albumDetails != null">
                            <img :src=album.albumDetails.albumCover v-if="album.albumDetails.albumCover" class="album__cover--img">
                        </template>   
                    </div>
                    <div class="album__details">
                        <div class="album__details-info" v-if="album.albumDetails != null">
                            <h1>{{ album.albumTitle }}</h1> 
                            <h2>{{ album.artist }} - {{ album.albumDetails.albumDate }} - {{ album.albumDetails.albumTracks }} Songs</h2> 
                            <div class="album__details-submitter">By: {{ album.submittedBy }}</div> 
                        </div>
                        <div class="album__details-info" v-else>
                            <h1>{{ album.albumTitle }}</h1> 
                            <h2>{{ album.artist }}</h2> 
                            <div class="album__details-submitter">By: {{ album.submittedBy }}</div>   
                        </div>
                        <AlbumScores :data="album.scores"></AlbumScores>
                    </div>
                </div>
            </div>
       </div>   
    </template>
</template>



<style lang="scss">
    .album-list{
        display:flex;
        flex-direction: column;
        gap:20px;
       
    }
    .album{
        display:flex;
        flex-direction: column;
        width:100%;
        background:$exai-dark-soft;
        gap:20px;
        padding:20px;
        margin-bottom:20px;
    }

    .album__content{
        display:flex;
        flex-direction: row;
        gap:20px;
        align-items:flex-end;
    }

    .album__details-info{
        display:flex;
        flex-direction: column;

    }

    .album__details-info h1{
       color:white;
    }

    .album__details-info h2{
        font-size:18px;
        margin-bottom:4px;
    }

    .album__details-submitter{
        margin-bottom:18px;
    }

    .album__cover{
        width:180px;
        height:180px;
        background:red;
    }

    .album__cover--img{
        width:180px;
        height:180px;
    }
</style>