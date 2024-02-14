<script setup>
  import { useAuth0 } from "@auth0/auth0-vue";
  
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
    <exai-button text="Sign Up" @click="handleSignUp"> Sign Up </exai-button>
</template>