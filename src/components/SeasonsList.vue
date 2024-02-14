<template>
    <table class="table">
        <thead class="table-header">
        <tr>
            <th class="table-th" style="width:240px"><div class="table-th__inner"><span class="table-th__text">Artist</span></div></th>
            <th class="table-th" style="width:300px"><div class="table-th__inner"><span class="table-th__text">Albums</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Matt</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Bill</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Dan</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Ty</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Joel</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Dwayne</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Joe</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Bart</span></div></th>
            <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Kris</span></div></th>
            <th class="table-th" style="width:60px"><div class="table-th__inner"><span class="table-th__text">Avg</span></div></th>
        </tr>
        </thead>
        <tbody class="table-tbody">
        <tr v-for="(item, index) in filteredData" :key="item.id" class="table-tr">
            <td class="table-td" style="width:240px"><strong>{{ item.artist }}</strong></td>
            <td class="table-td" style="width:300px"><strong>{{ item.album }}</strong></td>
            <td class="table-td">{{ item.matt}}</td>
            <td class="table-td">{{ item.bill}}</td>
            <td class="table-td">{{ item.dan}}</td>
            <td class="table-td">{{ item.ty}}</td>
            <td class="table-td">{{ item.joel}}</td>
            <td class="table-td">{{ item.dwayne}}</td>
            <td class="table-td">{{ item.joe}}</td>
            <td class="table-td">{{ item.bart}}</td>
            <td class="table-td">{{ item.kris}}</td>
            <td class="table-td" style="width:60px">
                <template v-if="item.avg.includes('8')">
                    <span class="high-score"><strong>{{ item.avg }}</strong></span>
                </template>
               
                <template v-else>
                    <span><strong>{{ item.avg }}</strong></span>
                </template>
               
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>

    export default {
        name: 'SeasonsList',
        components:{
      
        },
        props: {
            data:{
                type:Array,
                description: 'List of Projects'
            }
        },
        data() {
            return {
                projectData: this.data.value,
                statusFilter: 'All',
                searchValue: '',
                selected: [],
                allSelected: false,
                selectedIds: [],
                id: this.$route.params.id,
            }
        },
        computed: {
            filteredData() {
                let tempData = this.data.value ? this.data.value : []

                // Set initial sort order - ascending
                tempData.sort( ( a, b ) => {
                    if ( a.id < b.id ) return -1;
                    if ( a.id > b.id ) return 1;
                    return 0;
                });

                // Process search input
                if ( this.searchValue != '' && this.searchValue ) {
                    tempData = tempData.filter( ( item ) => {
                    return item.title
                        .toUpperCase()
                        .includes( this.searchValue.toUpperCase() )
                    })
                }
                
                // Filter out by status
                if ( this.statusFilter ) {
                    tempData = tempData.filter( ( item ) => {
                        if ( this.statusFilter === 'Active' ) {
                            return ( item.active === true )
                        }
                        if ( this.statusFilter === 'In Active' ) {
                            return ( item.active === false )
                        } else {
                            return item
                        }
                    });
                }
                             
                return tempData
            },

            cloneDisabled(){
                let isDisabled
                if (this.selectedIds.length === 0 || this.selectedIds.length > 1) {
                    isDisabled = true
                } else {
                    isDisabled = false
                }
                return isDisabled
            },

            deleteDisabled(){
                // Todo: make this multi items
                let isDisabled
                if (this.selectedIds.length === 0 || this.selectedIds.length > 1) {
                    isDisabled = true
                } else {
                    isDisabled = false
                }
                return isDisabled
            }
        },
        methods:{
            getStatus(event){
                this.statusFilter = event;
            },

            selectAll() {
                this.selectedIds = [];

                if (!this.allSelected) {
                    this.data.forEach(item =>{
                        this.selectedIds.push(item.id);
                    })
                }
            },

            select() {
                this.allSelected = false;
            },

            cloneTemplate(){
                let selected = this.selectedIds[0]
                let selectedItem = this.data.find(item => item.id === selected)
                console.log('pass template',selectedItem)
                this.$emit('open-clone-template', selectedItem);
            },

            deleteTemplate(){
                // todo make this multi items
                let selected = this.selectedIds[0]
                let selectedItem = this.data.find(item => item.id === selected)
                console.log('pass template',selectedItem)
                this.$emit('open-delete-template',selectedItem);
            }
        },
    }
</script>

<style lang="scss">
    @import '@/styles/table.scss';
    .high-score{
        color:$exai-green;
    }
</style>