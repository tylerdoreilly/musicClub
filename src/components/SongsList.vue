<script setup>
    import { computed, ref, toRefs } from 'vue'
    import { sortBy } from 'lodash';
    import ExaiIcon from '@/components/exai/ExaiIcon.vue';
    import { useMediaQuery } from '@vueuse/core';

    const isLargeScreen = useMediaQuery('(min-width: 1500px)')

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

    console.log(data.value)

    let sort = ref(false);
    let sortedHeader = ref();
    let sortIcon = ref('')
    let updatedList = ref([])
    let searchQuery = ref("");
    let albumQuery = ref("");
    let bracketQuery = ref("");
    let isOpen = ref(false);

    const filteredList = computed(() => {
        return sortedList.value.filter((item) => {

            if ( searchQuery.value != '' && searchQuery.value ) {
                return (
                    item.artist.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
                )
            }
            if ( albumQuery.value != '' && albumQuery.value ) {
                return (
                    item.song.toLowerCase().indexOf(albumQuery.value.toLowerCase()) != -1
                )
            }
            if ( bracketQuery.value != '' && bracketQuery.value ) {
                return (
                    item.bracket == bracketQuery.value
                )
            }
            else {
                return (
                    item.artist.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 
                )
            }
           
        });
    });

    const sortedList = computed(() => {
      if (sort.value) {
         return updatedList.value
      }
      else{
         return data.value;
      }
    });

    const sortTable = (col, index) => {
        sortedHeader.value = index;
        isOpen = !isOpen
        sort.value = true
        const stringSorter = item => item[col.field].toLowerCase();

        if(isOpen == false){
            sortIcon.value = 'chevron-up'
            if(col.sortType === 'string'){
                updatedList.value = sortBy(data.value, [stringSorter, col.field])
            } else {
                updatedList.value = sortBy(data.value, col.field)
            }
           
        } else {
            sortIcon.value = 'chevron-down'
            if(col.sortType === 'string'){
                updatedList.value = sortBy(data.value, [stringSorter, col.field]).reverse()
            } else {
                updatedList.value = sortBy(data.value, col.field).reverse()
            }
        }
    };

    const activeSort = (index) => {
      if (sort.value == true && sortedHeader.value == index) {
         return {color: '#fff'}
      }
      else{
         return {color: '#5e5e5e'};
      }
    };

    const setColumnWidth = (field) => {
        if(isLargeScreen.value){
            if(field.style) {
                return {width: field.style.width + 'px'}
            }
            else if(field.style && field.field == 'album'){
                return {width: field.style.width + 'px', display: 'table-header-group'}
            }
            else {
                return {width: ' '}
            }
        } else  {
            if(field.style && field.field == 'artist') {
                return {width: '200px'}
            }
            else if(field.style && field.field == 'by'){
                return {width: field.style.width + 'px'}
            }
            else if(field.field == 'album'){
                return {display: 'none'}
            }
        }
      
    };

    const clearInput = (query) => {
        if (query == 'searchQuery'){
            searchQuery.value = '' 
        }
        if (query == 'albumQuery'){
            albumQuery.value = '' 
        }
        if (query == 'bracketQuery'){
            bracketQuery.value = '' 
        }
    };

</script>

<template>
    <div class="table-controls">
        <div class="exai-search">
            <ExaiIcon icon="x" size="16px" class="exai-search__clear" v-if="searchQuery" @click="clearInput('searchQuery')"></ExaiIcon>
            <input type="search" class="exai-search__input" v-model='searchQuery' placeholder="Search By Artist">
        </div>
        <div class="exai-search">
            <ExaiIcon icon="x" size="16px" class="exai-search__clear" v-if="albumQuery" @click="clearInput('albumQuery')"></ExaiIcon>
            <input type="search" class="exai-search__input" v-model='albumQuery' placeholder="Search By Song">
        </div>
        <div class="exai-search">
            <ExaiIcon icon="x" size="16px" class="exai-search__clear" v-if="bracketQuery" @click="clearInput('bracketQuery')"></ExaiIcon>
            <input type="search" class="exai-search__input" v-model='bracketQuery' placeholder="Search By Bracket #">
        </div>
    </div>
    <table class="table">
        <thead class="table-header">
            <tr >
                <th 
                    class="table-th" 
                    v-for="(field, index) in fields" 
                    :style="setColumnWidth(field)"
                    :key='field'
                    @click="sortTable(field, index)"
                >

                    <div class="table-th__inner">
                        <span class="table-th__text" :style="activeSort(index)">
                            <slot name="headers" :field="field" >
                                {{ field.title }}
                            </slot> 
                        </span>
                        <template v-if="sortIcon && sortedHeader == index">
                            <ExaiIcon :icon="sortIcon" size="14px" fill="#fff"></ExaiIcon>
                        </template>                           
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
                    :style="setColumnWidth(field)"
                    v-for="field in fields" 
                    :key='field'
                >

                    <slot name="columns" :item="item" :field="field" >
                        {{item[field.field]}}
                    </slot> 
                   
                </td>
            </tr>
        </tbody>
    </table> 
</template>

<style lang="scss" scoped>
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
        flex-direction: row;
        gap:5px;
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
        cursor:pointer;

        &:hover{
            color:white !important;
        }
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

    .exai-search{
        position:relative;
    }

    .exai-search__clear{
        position:absolute;
        top:11px;
        right:10px;
        z-index:1px;
        cursor:pointer;
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

    .exai-search__input:focus{
        outline: none;
        border-bottom:2px solid rgba(235, 235, 235, 0.64);
    }

    .exai-search__input::-webkit-search-cancel-button {
        appearance: none;
    }
</style>
