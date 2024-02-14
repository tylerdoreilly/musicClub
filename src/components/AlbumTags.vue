

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
   
  });

  const { data } = toRefs(props);

  onMounted(() => {
    console.log('scores',data.value)
})

</script>

<template>
    <div class="scores">
        <div class="scores__list">
            <div class="score title">
                Tags
            </div>
            <div class="score" v-for="(item, index) in data" :key="index">
                <span>{{ item.name}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .scores{
        display:flex;
        flex-direction: row;
        gap:8px;
        margin-bottom:8px;
    }

    .scores__list{
       display:flex;
       align-items:center;
       justify-content: flex-start; 
       gap:8px; 
    }

    .score{
        display:flex;
        padding:4px 12px;
        border-radius:4px;
        background-color: #161618;
    }
    strong{
        font-weight: bold;
    }

    .score.title{
        color:black;
        background-color: $exai-green;
        margin-right:5px;
    }

</style>