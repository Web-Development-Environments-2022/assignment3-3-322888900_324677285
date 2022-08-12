<template>
  <div id="app">
    <div id="nav">
      <!--LOGO -->
      <b-navbar variant="faded" type="light">
        <b-navbar-brand href="#">
          <img
            :src="require('@/assets/logo-ow.png')"
            class="d-inline-block align-top "
            alt="Kitten"
          />
        </b-navbar-brand>
      </b-navbar>

      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'main' }">Main page</b-nav-item>|
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>|
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>|

          <h5 v-if="!$root.store.username">Hello Guest!</h5>
            <b-nav-item v-if="!$root.store.username" :to="{ name: 'register' }">Register</b-nav-item>|
            <b-nav-item v-if="!$root.store.username" :to="{ name: 'login' }">Login</b-nav-item>|
          <b-nav-item @click="Logout" v-if="$root.store.username">Logout</b-nav-item>
          <h5 v-if="$root.store.username">
            Welcome:{{ $root.store.username }}
          </h5>

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown
            v-if="$root.store.username"
            text="Personal"
            right
          >
            <b-dropdown-item :to="{ name: 'favorites' }"
              >favorites</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'family' }">family</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'myRecipes' }"
              >my recipes</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <NewRecipeModal></NewRecipeModal>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import NewRecipeModal from "./components/NewRecipeModal.vue";

export default {
  name: "App",
  components: {
    NewRecipeModal,
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
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
