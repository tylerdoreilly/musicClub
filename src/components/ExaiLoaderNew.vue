<script setup>
  import { computed, toRefs, useCssModule } from 'vue'

  const $style = useCssModule();

  const props = defineProps({
    variation:{
      type: String,
      docs:{
        validation:'_',
        description:'Icon size'
      }
    },
  });

  const { variation } = toRefs(props);

  const loaderStyles = computed(() =>{
    const styleObj = {};
    styleObj[$style['exai-loader--full']] = variation.value == 'page';
    styleObj[$style['exai-loader--inner']] = variation.value == 'content';
    return styleObj
  })

</script>

<template>
  <div :class="[$style['exai-loader'], loaderStyles]">
    <div :class="[$style['exai-loader__spinner']]">
      <exai-spinner></exai-spinner>
    </div>  
    <div :class="[$style['exai-loader__background']]"></div>
  </div>
  
</template>




<style lang="scss" module>
  .exai-loader{
    display:flex;
    height:100vh;
    align-items: center;
  }

  .exai-loader--full{
    position:absolute;
    top:55px;
    left:0;
    width:100%;
    z-index:100;
    height:calc(100vh - 55px);
  }

  .exai-loader__background{
    position:absolute;
    background:$exai-dark-soft;
    top:0;
    left:0;
    width:100%;
    height:calc(100vh - 55px);
    opacity:0.8;
  }

  .exai-loader__spinner{
    z-index:50;
    display:flex;
    align-items: center;
    justify-content: center;
    margin:0 auto;
  }
</style>
