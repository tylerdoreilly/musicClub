<script setup>
    import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
    import ExaiPagination from '@/components/exai/ExaiPagination.vue'

    const props = defineProps({
        data:{
            type: Array,
            docs:{
                validation:'_',
                description:'Table Data'
            }
        },
        fields:{
            type: Array,
            docs:{
                validation:'_',
                description:'Table Headers'
            }
        },
        paging:{
            type: Boolean,
            docs:{
                validation:'_',
                description:'Table has pager?'
            }
        },
    });

    const { data, fields, paging } = toRefs(props);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const totalItems = ref();
    const totalPages = ref(7);

    const filteredList = computed(() => {
        totalItems.value = data.value.length
        totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value)

        return filterByPagination()
    })

    const onPageChange = (page) => {
      console.log(page)
      currentPage.value = page;
    }

    const filterByPagination = () =>{
        const startIndex = (currentPage.value - 1) * itemsPerPage.value;
        const endIndex = startIndex + itemsPerPage.value;
        return data.value.slice(startIndex, endIndex);
    }


</script>

<template>
    

    <div class="table-wrapper">
        <table class="table">
            <thead class="table-header">
                <tr >
                    <th 
                        class="table-th" 
                        :style="{ width: field.style ? field.style.width + 'px' : '' }"
                        v-for="field in fields" 
                        :key='field'>

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
                        :key='field'>

                            {{item[field.field]}}
                    
                    </td>
                </tr>
            </tbody>
        </table> 
        <div class="table-pager" v-if="paging">
            <ExaiPagination
                :total-pages="totalPages"
                :total="totalItems"
                :per-page="itemsPerPage"
                :current-page="currentPage"
                @pagechanged="onPageChange"
            />
        </div>
    </div>

   
</template>

<style lang="scss" scoped>
.table-wrapper{
    background-color: #161618;
        padding:20px;
}
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

    th.table-th:last-child .table-th__inner{
        justify-content: flex-end;
    }

    td:last-child {
        text-align: right;
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

    .table-pager{
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content: flex-end;
        margin-top:10px;
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