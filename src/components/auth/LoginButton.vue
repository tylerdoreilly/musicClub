<script setup>
  import { useAuth0 } from "@auth0/auth0-vue";
  import ExaiButton from '@/components/exai/ExaiButton.vue'
  const { loginWithRedirect } = useAuth0();
  
  const handleLogin = () => {
    loginWithRedirect({
        appState: {
            target: "/albums",
        },
    });
  };
</script>

<template>
    <ExaiButton 
      text="Log In" 
      variation="primary"
      size="large" 
      @click="handleLogin">
    </ExaiButton>
</template>