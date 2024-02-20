<script setup>
    import { computed, ref, toRefs, watch, useCssModule } from 'vue';
    import { storeToRefs } from 'pinia';
    import { albumsStore } from '@/stores/albums';
    import AlbumTrackList from '@/components/AlbumTracklist.vue'
    import AlbumScores from '@/components/AlbumScores.vue'
    import AlbumTags from '@/components/AlbumTags.vue'
    import AlbumDescription from '@/components/AlbumDescription.vue'
    import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs'
    import { timeConversion, getAlbumLength } from '@/composables/composables.js'

    const colorThief = new ColorThief();
    const useAlbumsStore = albumsStore();
    const { albumTrackHeaders } = storeToRefs(useAlbumsStore);
    const color = ref({});

    const props = defineProps({
        albumDetails:{
        type: Object,
        docs:{
            validation:'_',
            description:'Button text'
        }
        },
        albumData:{
        type: Object,
        docs:{
            validation:'_',
            description:'Button text'
        }
        },
    });

    const { albumDetails, albumData } = toRefs(props);


    // Computed

    const tracklist = computed(() => {
        let albumTracklist = [];

        if(Object.keys(albumDetails.value).length === 0){
            return []
        }
        albumDetails.value.tracklist.forEach(item =>{
            let obj = {};
            obj.name = item.name
            obj.track_number = item.track_number
            obj.length = timeConversion(item.duration_ms)
            obj.duration_ms = item.duration_ms
            obj.artist = item.artists[0].name
            albumTracklist.push(obj)
        })
        return albumTracklist
    })

    const albumLength = computed(() => {
        let albumTrackLength = tracklist.value.length ? getAlbumLength(tracklist.value) : 'N/A'
       
        return albumTrackLength
    })

    const albumScores = computed(() => {
        let objOne = {}
        let objTwo = {}
        let objThree = {}
        let objFour = {}
        let objFive = {}
        let objSix = {}
        let objSeven = {}
        let objEight = {}
        let objNine = {}
        let collectAlbumsScores = [];
        console.log('albumData.value',albumData.value)
        objOne.member = "Matt"
        objOne.score = albumData.value.matt
        objTwo.member = "Bill"
        objTwo.score = albumData.value.bill
        objThree.member = 'Dwayne'
        objThree.score = albumData.value.dwayne
        objFour.member= 'Ty'
        objFour.score = albumData.value.ty
        objFive.member = 'Joel'
        objFive.score = albumData.value.joel
        objSix.member = 'Dan'
        objSix.score = albumData.value.dan
        objSeven.member = 'Joe'
        objSeven.score = albumData.value.joe
        objEight.member = 'Bart'
        objEight.score = albumData.value.bart
        objNine.member = 'Kris'
        objNine.score = albumData.value.kris
        collectAlbumsScores.push(objOne,objTwo,objThree,objFour,objFive,objSix,objSeven,objEight,objNine)

        return  collectAlbumsScores
    })

    const albumAvgScore = computed(() => {
        let average = albumData.value.avg
        return average
    })

    const tags = computed(() => {
        let noTags = [{name:'N/A'}];
        let albumTags = Object.keys(albumDetails.value).length === 0 ? 
            noTags :
            albumDetails.value.lastFm.tags.tag
        return albumTags
    })

    const description = computed(() => {
        if(Object.keys(albumDetails.value).length === 0){
            return 'N/A'
        }

        let albumDescription
        let audioDbData = albumDetails.value.audioDb;

        if(audioDbData.length){
            albumDescription = audioDbData[0].strDescriptionEN;
            return albumDescription
        } else {
            return 'N/A'
        }
    })


    // handle Image Color

    const loadImageDimensions = async (imageSrc) => {

        if (!imageSrc){
            return {}
        }

        const newImg = new Image()
        newImg.src = imageSrc
        newImg.src = imageSrc + '?' + new Date().getTime();
        newImg.setAttribute('crossOrigin', '');

        await new Promise(resolve => newImg.onload = resolve)

        const albumColor = colorThief.getColor(newImg)
        const hexColor = rgbToHex(albumColor)

        return {
            color: hexColor,
        }
    }

    watch(() => albumDetails.value.albumCover,
        async () => color.value = await loadImageDimensions(albumDetails.value.albumCover),
        { 
            immediate: true 
        }
    )
   
    const rgbToHex = (color) => '#' + color.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

</script>

<template>
    <div class="album-header" v-if="albumDetails" :style="{ background: color.color }">

        <div class="album-header__content">
            <div class="album">
                <div class="album__content">
                    <div class="album__cover">
                        <template v-if="albumDetails != null">
                            <img :src=albumDetails.albumCover v-if="albumDetails.albumCover" class="album__cover--img" id="albumImg">
                        </template>   
                    </div>
                    <div class="album__details">
                        <div class="album__details-info" v-if="albumDetails != null">
                            <h1>{{ albumData.album }}</h1> 
                            <h2>{{ albumData.artist }} - {{ albumDetails.albumDate }} - {{ albumDetails.albumTracks }} Songs, {{ albumLength }}</h2> 
                            <div class="album__details-submitter">By: {{ albumData.by }}</div> 
                        </div>
                        <div class="album__details-info" v-else>
                            <h1>{{ albumData.album }}</h1> 
                            <h2>{{ albumData.artist }}</h2> 
                            <div class="album__details-submitter">By: {{ albumData.by }}</div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="album-header__gradient"></div>
    </div>
     <main class="layout-center">
        <div class="album-section">
            <AlbumTags :data="tags"></AlbumTags>
        </div>
        <div class="album-section">
            <div class="album-section__header">Scores</div>
            <AlbumScores :data="albumScores" :average="albumAvgScore"></AlbumScores>
        </div>

        <div class="album-section">
            <div class="album-section__header">Tracklist</div>
            <AlbumTrackList :fields="albumTrackHeaders" :data="tracklist"></AlbumTrackList>
        </div>

        <div class="album-section">
            <div class="album-section__header">About</div>
            <AlbumDescription :data="description"></AlbumDescription>
        </div>
        
     </main>
  
</template>



<style lang="scss">

    .album-header{
        border-bottom:1px solid #161618;
        height:400px;
        padding:10px 0px 20px 0px;
        margin-bottom:40px;
        position:relative;
        overflow:hidden;
    }
    .album-header__gradient{
        position:absolute;
        left:0;
        bottom:-20px;
        width:100%;
        height:400px;
        z-index:1;
        background: rgb(27,27,31);
        background: linear-gradient(0deg, rgba(27,27,31,1) 0%, rgba(0,212,255,0) 100%);
    }
    .album-header__content{
        max-width: 1280px;
        margin: 0 auto;
        padding: 0px 2rem 2rem 2rem;
        font-weight: normal;
        position:relative;
        z-index:4;
    }


    .album{
        display:flex;
        flex-direction: column;
        width:100%;
        gap:20px;
        margin-bottom:20px;
        margin-top:40px;
    }

    .album__content{
        display:flex;
        flex-direction: row;
        gap:30px;
        align-items:flex-end;
    }

    .album__details-info{
        display:flex;
        flex-direction: column;

    }

    .album__details-info h1{
       color:white;
       font-weight:bold;
    }

    .album__details-info h2{
        font-size:18px;
        margin-bottom:10px;
    }

    .album__details-submitter{
        margin-bottom:18px;
    }

    .album__cover{
        width:300px;
        height:300px;
        background:red;
    }

    .album__cover--img{
        width:300px;
        height:300px;
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
</style>