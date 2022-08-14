<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          :src="require('@/assets/logo-ow.png')"
          class="d-inline-block align-top "
          alt="Kitten"
        />
      </a>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <b-nav-item class="nav-link" :to="{ name: 'main' }"
              >Main page <span class="sr-only">(current)</span></b-nav-item
            >
          </li>
          <li class="nav-item">
            <b-nav-item class="nav-link" :to="{ name: 'search' }" href="#"
              >Search</b-nav-item
            >
          </li>
          <li class="nav-item">
            <b-nav-item class="nav-link" :to="{ name: 'about' }" href="#"
              >About</b-nav-item
            >
          </li>
        </ul>
        <!-- right side of navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <b-nav-text class="nav-text" v-if="!$root.store.username"
                >Hello Guest:</b-nav-text
              >
            </li>
            <li class="nav-item">
              <b-nav-item
                class="nav-link"
                v-if="!$root.store.username"
                :to="{ name: 'login' }"
                href="#"
                >Login</b-nav-item
              >
            </li>
            <li class="nav-item">
              <b-nav-item
                class="nav-link"
                v-if="!$root.store.username"
                :to="{ name: 'register' }"
                href="#"
                >Register</b-nav-item
              >
            </li>
            <li class="nav-item">
              <b-nav-text class="nav-text" v-if="$root.store.username">
                Welcome:{{ $root.store.username }}
              </b-nav-text>
            </li>
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
            <li class="nav-item">
              <b-nav-item
                class="nav-link"
                @click="Logout"
                v-if="$root.store.username"
                >Logout</b-nav-item
              >
            </li>
            <li>
              <NewRecipeModal></NewRecipeModal>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
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
  color: #7e0aa8;
}
</style>
