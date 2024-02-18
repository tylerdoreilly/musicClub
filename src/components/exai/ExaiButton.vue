<script setup>
import { computed, ref, toRefs, useCssModule } from 'vue'
import ExaiIcon from '@/components/exai/ExaiIcon.vue'

const btnIconSize = ref('16')
const $style = useCssModule();

const props = defineProps({
  text:{
    type: String,
    docs:{
      validation:'_',
      description:'Button text'
    }
  },
  icon:{
    type: String,
    docs:{
      validation:'_',
      description:'Icon name'
    }
  },
  iconRight:{
    type: String,
    docs:{
      validation:'_',
      description:'Right icon name'
    }
  },
  size:{
    type: String,
    default:'medium',
    docs:{
      validation:'_',
      description:'Button size'
    }
  },
  variation:{
    type: String,
    docs:{
      validation:'_',
      description:'Button Variation'
    }
  },
});

const { text, icon, iconRight, size, variation } = toRefs(props);

const buttonStyleModifiers = computed(() =>{
  const styleObj = {};
  styleObj[$style['exai-button--primary']] = variation.value == 'primary';
  styleObj[$style['exai-button--secondary']] = variation.value == 'secondary';
  styleObj[$style['exai-button--icon-only']] = variation.value == 'iconOnly';
  styleObj[$style['exai-button--flat']] = variation.value == 'flat';
  return styleObj
})

const buttonSizeModifiers = computed(() =>{
  const styleObj = {};
  styleObj[$style['exai-button--sm']] = size.value == 'small';
  styleObj[$style['exai-button--md']] = size.value == 'medium';
  styleObj[$style['exai-button--lg']] = size.value == 'large';
  return styleObj
})

const iconSize = computed(() => {
  if(size.value === 'medium'){
    return  btnIconSize.value;
  }
  if(size.value === 'small'){
    return  btnIconSize.value = '16';
  }
  if(size.value === 'large'){
    return  btnIconSize.value = '22';
  }
})

</script>

<template>
  <button type="button" :class="[$style['exai-button'], buttonStyleModifiers, buttonSizeModifiers]">
    <template v-if="icon || variation === 'iconOnly'">
      <ExaiIcon :icon="icon" :size="iconSize"></ExaiIcon>
    </template>

    <template v-if="text && variation != 'iconOnly'">
      <span :class="[$style['exai-button__text']]">{{ text }}</span>
    </template>
    
    <template v-if="iconRight && variation != 'iconOnly'">
      <ExaiIcon :icon="iconRight" :size="iconSize"></ExaiIcon>
    </template>
  </button>

</template>

<style lang="scss" module>
  .exai-button {
    @include btn-base;
    @include btn-default();
    font-size: 14px;
    padding:6px 8px;
    align-items:center;
    text-align:center;
    
    &--primary{
     background: $exai-green;
     border-color:$exai-green;
     text-align:center;
     justify-content:center;
     font-weight:bold;
    }

    &--secondary {
      background: $base-white;
      color:#2c3e50;      
    }

    &--flat{
      border:none;
      background:transparent;
      color:rgba(235, 235, 235, 0.64);
    }

    &--icon-only {
      background: $default-background;
    }

    &--lg{
      font-size:18px;
      padding:10px 16px;
      @include flex(inline-flex, row, $gap: 7px);
    }

    &__text{
      padding:0px 4px;
    }
  }
</style>