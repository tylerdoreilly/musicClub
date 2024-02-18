<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import ExaiButton from '@/components/exai/ExaiButton.vue';

const { logout } = useAuth0();

const handleLogout = () =>
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    }
  });
</script>

<template>
  <ExaiButton 
    text="Log Out" 
    icon="log-out"
    variation="flat" 
    @click="handleLogout"> 
  </ExaiButton>
</template>