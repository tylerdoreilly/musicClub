<script setup>
import { computed, ref, toRefs, useCssModule } from 'vue'
import ExaiIcon from '@/components/exai/ExaiIcon.vue'

const $emit = defineEmits();

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
});

const { maxVisibleButtons, totalPages, total, perPage, currentPage } = toRefs(props);

const startPage = computed(() => {
  if (currentPage.value === 1) {
      return 1;
    }

    if (currentPage.value === totalPages.value) { 
      return totalPages.value - maxVisibleButtons.value + 1;
    }

    return currentPage.value - 1;
})

const endPage = computed(() =>{
  return Math.min(startPage.value + maxVisibleButtons.value - 1, totalPages.value);
})

const pages = computed(() => {
  const range = [];

      for (let i = startPage.value; i <= endPage.value; i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === currentPage.value 
        });
      }

      return range;
})

const isInFirstPage = computed(() => {
  return currentPage.value === 1;
})

const isInLastPage = computed(() => {
  return currentPage.value === totalPages.value;
})

const onClickFirstPage = () => {
  $emit('pagechanged', 1);
};

const onClickPreviousPage =()=> {
  $emit('pagechanged', currentPage.value - 1);
};

const onClickPage = (page)  =>{
  $emit('pagechanged', page);
};

const onClickNextPage =()=> {
  $emit('pagechanged', currentPage.value + 1);
};

const onClickLastPage =()=> {
  $emit('pagechanged', totalPages.value);    
};

const isPageActive =(page) =>{
  return currentPage.value === page;
};

</script>

<template>
  <ul class="pagination">
    <li 
      class="pagination-item"
    >
      <button 
        type="button" 
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        aria-label="Go to first page"
      >
        First
      </button>
    </li>

    <li
      class="pagination-item"
    >
      <button 
        type="button" 
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
      >
        Previous
      </button>
    </li>

    <li v-for="page in pages" class="pagination-item">
      <button 
        type="button" 
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        :aria-label="`Go to page number ${page.name}`"
        
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button 
        type="button" 
        @click="onClickNextPage"
        :disabled="isInLastPage"
        aria-label="Go to next page"
      >
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button 
        type="button" 
        @click="onClickLastPage"
        :disabled="isInLastPage"
        aria-label="Go to last page"
      >
        Last
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .pagination {
    list-style-type: none;
  }

  .pagination-item {
    display: inline-block;
  }

  .active {
    background-color: #4AAE9B;
    color: #ffffff;
  }
</style>