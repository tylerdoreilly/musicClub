<script setup>
    import { computed, toRefs } from 'vue'

    const props = defineProps({
        avgScore:{
            type: Number,
            docs:{
                validation:'_',
                description:'Average Score'
            }
        },
    });

    const { avgScore } = toRefs(props);

    const setScoreColour = computed(() => {
      if (avgScore.value >= 8 && avgScore.value < 10) {
         return {color: '#44bd87'}
      }
      else if (avgScore.value >= 6 && avgScore.value < 8){
        return {color: 'rgba(63, 136, 197, 1)'}
      }
      else if (avgScore.value >= 4 && avgScore.value < 6){
        return {color: '#DF7373'}
      }
      else if (avgScore.value >= 1 && avgScore.value < 4){
        return {color: '#CC444B'}
      }
      else if (avgScore.value == 10){
        return {color: '#7C72A0'}
      }
      else{
         return {color: 'rgba(235, 235, 235, 0.64)'};
      }
    });

</script>

<template>
   <div class="avgScore" :style="setScoreColour"> 
        {{ avgScore }}
    </div>
</template>

<style lang="scss" scoped>
    .avgScore{
        font-weight:bold;
    }
</style>