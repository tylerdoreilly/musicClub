<script setup>
  import { useAuth0 } from "@auth0/auth0-vue";
  import LogoutButton from '@/components/auth/LogoutButton.vue';

  const { user } = useAuth0();
  
</script>

<template>
    <div class="user">
      <div class="user__name">{{ user.name }}</div>
    </div>
    <LogoutButton />
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