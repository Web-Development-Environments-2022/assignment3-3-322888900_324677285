<template>
  <div id="app">
    <div id="nav">
             <!-- <b-button
         @click="AddRecipe"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        v-if="$root.store.username" 
        >Add Recipe</b-button
      > -->
      <router-link :to="{ name: 'main' }">Main page</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <span v-if="!$root.store.username">
        Hello Guest!
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <span>
          Welcome:{{ $root.store.username }}|
          <NewRecipeModal ></NewRecipeModal>|
          <button @click="Logout">Logout</button>
          <b-nav-item-dropdown v-if="$root.store.username" text="Personal" center>
            <b-dropdown-item :to="{ name: 'favorites' }">favorites</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'family' }">family</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'myRecipes' }">my recipes</b-dropdown-item>
          </b-nav-item-dropdown>
        </span>
      </span>
      <!-- <router-link :to="{}" v-if= "!$root.store.username">       </router-link> -->
       
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
