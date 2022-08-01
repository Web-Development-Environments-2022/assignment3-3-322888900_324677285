<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Main page</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <span v-if="!$root.store.username">
        Hello Guest!
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
          <button @click="Logout">Logout</button>
          Welcome:{{ $root.store.username }}|
          <b-nav-item-dropdown v-if="$root.store.username" text="Personal">
            <b-dropdown-item :to="{ name: 'favorites' }">favorites</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'family' }">family</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'myRecipes' }">my recipes</b-dropdown-item>
          </b-nav-item-dropdown>
      </span>
          <NewRecipeModal ></NewRecipeModal>|   
    </div>
    <router-view />
  </div>
</template>

<script>
import NewRecipeModal from "./components/NewRecipeModal.vue";

export default {
  name: "App",
components: {
    NewRecipeModal
}, 
  methods: {
  
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
