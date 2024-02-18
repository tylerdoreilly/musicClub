<script setup>
  import { useAuth0 } from "@auth0/auth0-vue";
  import ExaiButton from '@/components/exai/ExaiButton.vue';

  const { loginWithRedirect } = useAuth0();
  
  const handleSignUp = () => {
    loginWithRedirect({
      appState: {
        target: "/albums",
      },
      authorizationParams: {
        screen_hint: "signup",
      }
    });
  };
</script>

<template>
    <ExaiButton text="Sign Up" @click="handleSignUp"> Sign Up </ExaiButton>
</template>