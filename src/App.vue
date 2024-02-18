<script setup>
  import { computed, ref, toRefs, useCssModule, onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import ExaiHeader from '@/components/exai/ExaiHeader.vue'
  import LoggedinUser from '@/components/user/LoggedinUser.vue'
  import UserMenu from '@/components/user/UserMenu.vue'
  import ExaiPopover from '@/components/exai/ExaiPopover.vue'
  import { useAuth0 } from "@auth0/auth0-vue";
  import "exai-components/dist/style.css";

  const { isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();

</script>

<template>
  <ExaiHeader appTitle="Record Club" v-if="isAuthenticated">
    <template #headerActions>
      <ExaiPopover text="Popover" placement="bottom-end" >
        <template #popoverButton>
          <LoggedinUser />
        </template>
        <UserMenu></UserMenu>
      </ExaiPopover>
    </template>
  </ExaiHeader>

  <div v-if="isLoading">
    loading
  </div>

  <RouterView /> 
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
