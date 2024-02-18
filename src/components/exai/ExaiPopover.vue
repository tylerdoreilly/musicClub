<script setup>
import { defineProps, ref, toRefs, onMounted } from 'vue'
import { createPopper } from '@popperjs/core'
import { useEventListener, onClickOutside } from '@vueuse/core'

const popperInstance = ref(null)
const popcorn = ref(null)
const tooltip = ref(null)

const props = defineProps({
  text: String,
  placement:{
      type: String,
      docs:{
          validation:'_',
          description:'initial placement'
      }
  },
});

const { text, placement } = toRefs(props);

onMounted(() => {
  useEventListener(popcorn.value, 'click', show)

  onClickOutside(popcorn.value, hide)

  popperInstance.value = createPopper(popcorn.value, tooltip.value, {
    placement: placement.value,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  })
})

function show () {
  tooltip.value.setAttribute('data-show', '')
  popperInstance.value.update()
}

function hide () {
  tooltip.value.removeAttribute('data-show')
}

</script>

<template>
  <div>
    <div ref="tooltip" class="tooltip">
        <div class="arrow" data-popper-arrow></div>
        <slot></slot>
    </div>

    <button ref="popcorn" class="popover-button">
      <slot name="popoverButton"></slot>
    </button>
  </div>
</template>

<style lang="scss" scoped>

.popover-button{
  background:transparent;
  border:none;
  font-weight:normal;
  color:rgba(235, 235, 235, 0.64);
  cursor:pointer;
}

.tooltip {
  display: none;
}

.tooltip[data-show] {
  display: block;
  background:#202127;
  padding:20px;
  color:rgba(235, 235, 235, 0.64);
}

.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.arrow {
  visibility: hidden;
}

.arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.tooltip[data-popper-placement^='top'] > .arrow {
  bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}

.tooltip[data-popper-placement^='left'] > .arrow {
  right: -4px;
}

.tooltip[data-popper-placement^='right'] > .arrow {
  left: -4px;
}
</style>