<template>
  <div id="app">
    <div id="nav">
      <select v-if="$root.store.username" >
          <option value="" selected disabled hidden>Personal</option>
                <option>Favourites</option>
                <option>Private</option>
                <option>La Familia</option>

      </select> 
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        Welcome:
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
      <!-- <router-link :to="{}" v-if= "!$root.store.username">       </router-link> -->
       

    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
 //  data() {
   // return{
     //   options: [
       //     {key: 1, name: "Favourites"},
         //   {key: 2, name: "Private"},
           // {key: 3, name: "La Famila"},            
        //]
      //}
    //},
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
