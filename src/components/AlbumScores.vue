

<script setup>
 import { computed, toRefs, useCssModule, onMounted } from 'vue'

 const props = defineProps({
    data:{
      type: Array,
      docs:{
        validation:'_',
        description:'Icon size'
      }
    },
    average:{
      type: String,
      docs:{
        validation:'_',
        description:'Icon size'
      }
    },
  });

  const { data, average } = toRefs(props);

  onMounted(() => {
    console.log('scores',data.value)
})

</script>

<template>
    
    <div class="test">
        <div class="categories">
            <div class="categories_item" v-for="(item, index) in data" :key="index">
                    <div class="score">
                        <span>{{ item.member}}</span>
                        <span><strong>{{ item.score}}</strong> / 10</span>
                    </div>  
            </div>    
        </div>
        <div class="test-side">
           <div class="average">
                <span class="average-label">Avg</span>
                <span class="average-score">{{ average }}</span>
           </div>
        </div>
    </div>
   
</template>

<style lang="scss" scoped>
    .scores{
        // display:flex;
        // flex-direction: row;
        // gap:8px;
        // margin-bottom:8px;
    }

    .scores__list{
       display:flex;
       align-items:center;
       flex:80%;
       justify-content: space-between;
       flex-wrap: wrap;     
    }

    .score{
        display:flex;
        flex-direction: row;           
  margin: 5px;                  
  justify-content: space-between;
        padding:4px 12px;
        border-radius:4px;
    }
    strong{
        font-weight: bold;
    }

    .test{
        display:flex;
        flex-direction:row;
        gap:80px;
    }
    .test-side{
        flex:20%;
        display:flex;
        flex-direction:column;
        background:$exai-green;
        align-items:stretch;
        border-radius: 10px;
    }

    .categories {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;   
        gap:15px;  
        flex:80%;            /* NEW */
    }

    .categories_item a {
    color: white;
    }

    .categories_item {
    flex: 1 0 30%;                    /* NEW */
    background-color: #161618;
    }

    .average{
        display:flex;
        flex-direction: column;
        align-self:center;
        justify-content: center;
    }

    .average-label{
        font-size:20px;
        color:black
    }

    .average-score{
        font-size:60px;
        color:black;
        font-weight:bold;
    }
</style>