<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <SearchBar :favoriteRecipes="favoriteRecipes"></SearchBar>
    <div v-if="$root.store.username && lastSearch" class="lastSearch">
      <h1>You recentley searched:</h1>
      <h3 v-if="lastSearch === null">No recentley searched recipes yet</h3>
      <b-row>
        <RecipePreview
          v-if="lastSearch "
          class="recipePreview"
          :recipe="lastSearch"
          :isSearch="true"
          :recipe_type="recipe_type"
          :favoriteRecipes="favoriteRecipes"
        />
      </b-row>
    </div>
  </div>
</template>
<script>
import RecipePreview from "../components/RecipePreview.vue";
import SearchBar from "../components/SearchBar";
export default {
  name: "App",
  components: {
    SearchBar,
    RecipePreview,
  },
  data() {
    return {
      lastSearch: null,
      recipe_type: "search",
      favoriteRecipes: [],
    };
  },
  async created() {
    try {
      const response = await this.axios.get(
        //process.env.VUE_APP_ROOT_API + "/user/favorites",
        this.$root.store.server_domain + "/user/favorites",
        // "http://localhost:3000/user/favorites",
        { withCredentials: true }
      );
      console.log("response is:", response);
      for (let i = 0; i < response.data.length; i++) {
        this.favoriteRecipes.push(response.data[i].id);
      }
      console.log("Favorites we got from db: ", this.favoriteRecipes);
    } catch (error) {
      console.log(error);
    }
  },

  mounted() {
    //doesnt update the recipe very good
    console.log(this.lastSearch);
    console.log(localStorage);
    if (localStorage.lastSearch) {
      this.lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
      console.log("mounted - last Search is:");
      console.log(this.lastSearch);
    }
  },
};
</script>
