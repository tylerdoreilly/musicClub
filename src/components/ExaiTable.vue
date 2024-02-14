<script setup>
    import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { sortBy} from 'lodash';
    import { storeToRefs } from 'pinia';
    import { albumsStore } from '@/stores/albums';

    const router = useRouter();

    const props = defineProps({
        data:{
            type: Array,
            docs:{
                validation:'_',
                description:'Icon size'
            }
        },
        fields:{
            type: Array,
            docs:{
                validation:'_',
                description:'Icon size'
            }
        },
    });

    const { data, fields } = toRefs(props);

    const useAlbumsStore = albumsStore();

    let sort = ref(false);
    let updatedList = ref([])
    let searchQuery = ref("");
    let albumQuery = ref("");
    let submitterQuery = ref("");
    let seasonQuery = ref("");

    const filteredList = computed(() => {
        return sortedList.value.filter((item) => {

            if ( searchQuery.value != '' && searchQuery.value ) {
                return (
                    item.artist.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
                )
            }
            if ( albumQuery.value != '' && albumQuery.value ) {
                return (
                    item.album.toLowerCase().indexOf(albumQuery.value.toLowerCase()) != -1
                )
            }
            if ( submitterQuery.value != '' && submitterQuery.value ) {
                return (
                    item.by.toLowerCase().indexOf(submitterQuery.value.toLowerCase()) != -1
                )
            }
            if ( seasonQuery.value != '' && seasonQuery.value ) {
                return (
                    item.season.toLowerCase().indexOf(seasonQuery.value.toLowerCase()) != -1
                )
            }
            else {
                return (
                    item.artist.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 
                )
            }
           
        });
    })

    const sortTable = (col) => {
        console.log('col',col)
      sort.value = true
      updatedList.value = sortBy(data.value,col.field)
    }

    const sortedList = computed(() => {
      if (sort.value) {
         return updatedList.value
      }
      else{
         return data.value;
      }
    });

    const goToAlbum = (selectedAlbum) => {
        useAlbumsStore.addAlbumDetails(selectedAlbum);
        console.log('selected album', selectedAlbum)
        const albumId = selectedAlbum.album
        router.push({ name: 'album', params: { id: albumId } })
    }

</script>

<template>
    <div class="table-controls">
        <div class="exai-search">
            <input type="search" class="exai-search__input" v-model='searchQuery' placeholder="Search By Artist">
        </div>
        <div class="exai-search">
            <input type="search" class="exai-search__input" v-model='albumQuery' placeholder="Search By Album">
        </div>
        <div class="exai-search">
            <input type="search" class="exai-search__input" v-model='submitterQuery' placeholder="Search By Submitter">
        </div>
        <div class="exai-search">
            <input type="search" class="exai-search__input" v-model='seasonQuery' placeholder="Search By Seasonr">
        </div>
    </div>
   
    <table class="table">
        <thead class="table-header">
            <tr >
                <th 
                    class="table-th" 
                    :style="{ width: field.style ? field.style.width + 'px' : '' }"
                    v-for="field in fields" 
                    :key='field'
                    @click="sortTable(field)">

                        <div class="table-th__inner">
                            <span class="table-th__text">
                                {{ field.title }}
                            </span>
                        </div> 
                </th>
            </tr>
        </thead>
        <tbody class="table-tbody">
            <tr 
                class="table-tr" 
                v-for="item in filteredList" 
                :key='item'>

                <td 
                    class="table-td" 
                    :style="{ width: field.style ? field.style.width + 'px' : '' }"
                    v-for="field in fields" 
                    :key='field'
                    @click="goToAlbum(item)">

                    <template v-if="field.field === 'artist'">
                        <strong>{{item[field.field]}}</strong>
                    </template>

                    <template v-else-if="field.field === 'album'">
                        <strong>{{item[field.field]}}</strong>
                    </template>

                    <template v-else-if="field.field === 'avg'">
                        <strong>{{item[field.field]}}</strong>
                    </template>

                    <template v-else>
                        {{item[field.field]}}
                    </template>
                   
                </td>
            </tr>
        </tbody>
    </table> 
</template>

<style lang="scss">
   .table{
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    }
    .table-header{
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
    }
    tr{
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    .table-th {
    border-top: 0;
    padding: 0 8px;
    position: relative;
    vertical-align: bottom;
    }

    .table-th__inner {
        align-items: flex-end;
        border-bottom: 1px solid transparent;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 16px;
        padding-bottom: 2px;
    }
    .table-th__inner .table-th__text {
        font-style: normal;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        font-weight: 600;
        color: #5e5e5e;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
    }

    .table-tbody {
        background-color: inherit;
    }

    .table-tr:hover{
        cursor:pointer;
        background:$exai-dark-soft;
    }

    .table-tr:first-child .table-td {
        border-top: 0;
    }

    .table-tr .table-td, .table-tr td {
        transition: background-color .1s linear;
    }

    .table-td {
        font-style: normal;
        font-size: 14px;
        font-weight: 300;
        line-height: 21px;
        border-top: 1px solid $exai-grey;
        overflow: hidden;
        padding: 4px 8px;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: top;
    }

    .table__link{
        color:#000;
    }

    .table-actions{
        display:inline-flex;
        flex-direction: row;
        gap:5px;
    }

    .table-actions a{
        cursor:pointer;
        color:$keppel;
    }

    .table-controls {
        @include flex(flex, row, $gap:10px)
    }

    .table-container{
        @include flex(flex, column, $gap:30px)
    }

    strong{
        font-weight:bold
    }
    .high-score{
        color:$exai-green;
    }

    .table-controls{
        display:flex;
        flex-direction:row;
        align-items:center;
        height:50px;
        margin-bottom:40px;
        gap:20px;
    }

    .exai-search__input{
        background:$exai-dark-soft;
        color:$exai-text-dark-1;
        border:0px;
        border-bottom:2px solid $exai-grey;
        height:40px;
        padding:0px 12px;
        font-size:14px;
        min-width:250px;
    }
</style>