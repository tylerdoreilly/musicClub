<script setup>
  import { computed, ref, toRefs } from 'vue'

  const props = defineProps({
    searchList:{
      type: Array,
      docs:{
        validation:'_',
        description:'Button text'
      }
    },
    label:{
      type: String,
      docs:{
        validation:'_',
        description:'Label text'
      }
    },
  });

  const emit = defineEmits(["selectedItem"])

  const { searchList, label } = toRefs(props);
  let searchTerm = ref('');
  let selectedItem = ref('')

  const searchItems = computed(() => {
    if (searchTerm.value === '') {
      return []
    }

    let matches = 0

    return searchList.value.filter(item => {    
      if (      
        item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
        && matches < 10
      ) {
        matches++
        return item
      }
    })
  });

  const selectItem = (item) => {
    selectedItem.value = item;
    searchTerm.value = '';
    emit("selectedItem", item);
  }
 
</script>

<template>
  <div class="exai-autocomplete">
    <label for="search" class="exai-autocomplete__label">{{ label }}</label>
    <input type="text" id="search" class="exai-autocomplete__search" placeholder="Type here..." v-model="searchTerm">

    <div class="exai-autocomplete__dropdown" v-if="searchItems.length">
      <div class="dropdown-list__header">
        <div class="dropdown-list__title">Seasons</div>
        <div class="dropdown-list__count">{{ searchItems.length }} of {{ searchList.length }}</div>
      </div>
      <div class="dropdown-list">
        <div class="dropdown-list__item" 
          v-for="item in searchItems"
          :key="item.title"
          @click="selectItem(item.title)">

          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
    .exai-autocomplete{
      display:flex;
      flex-direction: column;
      position:relative;
      width:300px;
      height:80px;
    }

    .exai-autocomplete__label{
      padding-bottom:8px;
    }

    .exai-autocomplete__search{
      background:$exai-dark-soft;
      color:$exai-text-dark-1;
      border:0px;
      border-bottom:2px solid $exai-grey;
      height:40px;
      padding:0px 8px;
      font-size:16px;

    }
    
    .exai-autocomplete__dropdown{
      border:1px solid $exai-grey;
      display:block;
      width:auto;
      position:absolute;
      top:78px;
      width:300px;
      max-width:300px;
      z-index:50;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      padding:10px;
      background:#161618;
    }

    .dropdown-list{
      display:flex;
      flex-direction: column;
      justify-content: center;
      //gap:12px;
      padding:8px 12px;
    }

    .dropdown-list__item{
      display:flex;
      flex-direction: row;
      align-items: center;
      padding-bottom:4px;
      font-size:17px;
      cursor:pointer;
      border-bottom:1px solid $exai-grey;
    }

    .dropdown-list__item:last-child{
      cursor:pointer;
      border-bottom:0px solid $exai-grey;
    }

    .dropdown-list__item:hover{
      color:$exai-green;
    }

    .dropdown-list__header{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: auto;
      width: 100%;
      padding: 0 12px;
    }

    .dropdown-list__title{
      color:white;
    }

</style>
