<script setup>
  import { useAuth0 } from "@auth0/auth0-vue";
  import LogoutButton from '@/components/auth/LogoutButton.vue';
  import VueAvatar from "@webzlodimir/vue-avatar";
  import "@webzlodimir/vue-avatar/dist/style.css";

  const { user } = useAuth0();

</script>

<template>
    <div class="user-menu">
      <div class="user-menu__header">
        <vue-avatar background-color="#44bd87" :username="user.name" :size="40"/>
        <div class="user-menu__details">
          <div class="user-menu__name">{{ user.name }}</div>
          <div class="user-menu__email">{{ user.email }}</div>
        </div>
      </div>
      <div class="user-menu__content">
        <LogoutButton /> 
      </div>         
    </div>
</template>

<style lang="scss" scoped>
  .user-menu{
    display:flex;
    flex-direction: column;
    gap:15px;

    &__header {
      display:flex;
      flex-direction: row;
      gap:15px;
      padding-bottom:15px;
      border-bottom: 1px solid $exai-grey;
      align-items:center;
    }

    &__details{
      display:flex;
      flex-direction: column;
      gap:2px;
    }

    &__content{
      display:flex;
      flex-direction: column;
      gap:2px;
      justify-content: flex-start;
    }

    &__name{
      font-weight:bold;
    }

    &__email{
      font-weight:normal;
    }
  }
</style>