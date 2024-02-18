<script setup>
  import { ref, toRefs } from 'vue'
  import { useAuth0 } from "@auth0/auth0-vue";
  import VueAvatar from "@webzlodimir/vue-avatar";
  import "@webzlodimir/vue-avatar/dist/style.css";

  const { user } = useAuth0();

</script>

<template>
    <div class="user">
      <div class="user__name">{{ user.name }}</div>
      <vue-avatar background-color="#44bd87" :username="user.name" :size="26"/>
    </div>
</template>

<style lang="scss" scoped>
  .user{
    display:flex;
    flex-direction: row;
    gap:15px;
    align-items:center;
  }

  .user__name{
    font-weight:bold;
  }
</style>