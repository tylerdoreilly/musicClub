<script setup>
  import { computed, toRefs, useSlots } from 'vue'
  import ExaiIcon from '@/components/exai/ExaiIcon.vue'
  import PrimaryNav from '@/components/PrimaryNav.vue'

  const $slots = useSlots();

  const props = defineProps({
      appTitle:{
          type: String,
          docs:{
              validation:'_',
              description:'Title of the app'
          }
      },
      
  });

  const { appTitle } = toRefs(props);

  const hasHeaderActions = computed(() => {
    return !!$slots.headerActions;
  })

</script>

<template>
    <header class="exai-header">
      <div class="exai-header__brand">
        <ExaiIcon icon="headphones" size="24" stroke="#44bd87"></ExaiIcon>
        <div class="exai-header__title">{{ appTitle }}</div>
        <PrimaryNav />
      </div>
      
      <div class="exai-header__actions" v-if="hasHeaderActions">
        <slot name="headerActions"></slot>
      </div>
    </header>
</template>

<style lang="scss" scoped>
  .exai-header{
      display:flex;
      flex-direction:row;
      justify-content: space-between;
      align-items: center;
      height:55px;
      width:100%;
      background:#161618;
      padding:0 15px;

      &__actions{
        display:flex;
        flex-direction:row;
        align-items: center;
        gap:15px;
      }
  }

  .exai-header__brand{
    display:flex;
    flex-direction:row;
    gap:10px;
    align-items:center;
  }

  @media only screen and (min-width: 1500px) {
  /* For desktop: */
  .exai-header{
    padding:0 80px;
  }
}
</style>
