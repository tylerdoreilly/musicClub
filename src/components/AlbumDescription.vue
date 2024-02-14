

<script setup>
 import { toRefs } from 'vue'

 const props = defineProps({
    data:{
      type: String,
      docs:{
        validation:'_',
        description:'Icon size'
      }
    },
   
  });

  const { data } = toRefs(props);

</script>

<template>
    <div class="description">
      <div class="description__copy"> {{ data }}</div>
    </div>
</template>

<style lang="scss" scoped>
    .description{
        display:flex;
        flex-direction: row;
        background-color: #161618;
        padding:20px;
    }

    .description__copy{
       padding-right:100px;
    }


</style>