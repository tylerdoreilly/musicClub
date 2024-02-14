<script setup>
import { computed, toRefs, useCssModule } from 'vue'
import VueFeather from 'vue-feather';

const $style =  useCssModule();

const props = defineProps({
  icon:{
    type: String,
    docs:{
      validation:'_',
      description:'Icon name'
    }
  },
  size:{
    type: String,
    docs:{
      validation:'_',
      description:'Icon size'
    }
  },
  variation:{
    type: String,
    docs:{
      validation:'_',
      description:'Icon size'
    }
  },
  fill:{
    type: String,
    docs:{
      validation:'_',
      description:'Icon size'
    }
  },
  stroke:{
    type: String,
    docs:{
      validation:'_',
      description:'Icon size'
    }
  }
});

const { icon, size, variation, fill, stroke } = toRefs(props);

const iconStyles = computed(() =>{
  const styleObj = {};
  styleObj[$style['exai-icon--primary']] = variation.value == 'primary';
  styleObj[$style['exai-icon--secondary']] = variation.value == 'secondary';
  return styleObj
})

</script>

<template>
  <vue-feather :type="icon" :size="size" :fill="fill" :stroke="stroke" :class="[$style['exai-icon'], iconStyles]"/>
</template>

<style lang="scss" module>
  .exai-icon{
    color:$exai-text-dark-1;
    vertical-align:middle;
    display:inline-flex;
    &--primary{
      color:$base-white;
    }
  }
</style>