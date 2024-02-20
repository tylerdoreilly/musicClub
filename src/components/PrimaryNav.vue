<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
   <div class="primary-nav"> 
      <div class="primary-nav__item">
        <router-link to="/albums">Albums</router-link> 
      </div>
      <div class="primary-nav__item">
        <router-link to="/songs">Songs</router-link> 
      </div>
    </div>
</template>

<style lang="scss" scoped>
    .primary-nav{
       display:flex;
       flex-direction:row;
       gap:10px;
       align-items:center;
       border-left: 1px solid #32363f;
       margin-left:15px;
       padding-left:18px;
    }

    .primary-nav__item a{
      cursor:pointer;
      color:rgba(235, 235, 235, 0.64);
    }

    .primary-nav__item a.router-link-active{
      color:$exai-green;
    }
</style>