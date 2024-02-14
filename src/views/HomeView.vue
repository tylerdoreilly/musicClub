<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import ExaiIcon from '@/components/exai/ExaiIcon.vue';
import LoginButton from "@/components/auth/LoginButton.vue";

const { isAuthenticated } = useAuth0();
</script>

<template>
  <main class="layout-center">
    <template v-if="!isAuthenticated">
      <div class="login">
        <div class="login__icon">
          <ExaiIcon icon="headphones" size="66" stroke="#44bd87"></ExaiIcon>
        </div>
        <div class="login__header">
          Record Club
        </div>
        <LoginButton />
      </div>
    </template>
  </main>
</template>

<style lang="scss" scoped>
  .login{
    display:flex;
    flex-direction: column;
    padding:40px;
    border:1px solid $exai-grey;
    width:400px;
    margin:0 auto;
    margin-top:100px;
    gap:15px;
    border-radius:15px;
    background:#1b1b1f;
    //box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 29px 0px;
  }

  .login__icon{
    align-self: center;
    justify-self: center;
  }

  .login__header{
    display:flex;
    justify-content: center;
    font-size:24px;
    margin-bottom:30px;
    color:white;
    font-weight:bold;
  }
</style>
