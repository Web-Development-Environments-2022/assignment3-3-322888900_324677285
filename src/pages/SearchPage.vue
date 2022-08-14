<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <SearchBar @update-last-search="updateLastSearch"></SearchBar>
    <div v-if="$root.store.username && lastSearch" class="lastSearch">
      <h2>You recentley searched:</h2>
      <b-row>
        <RecipePreview
          class="recipePreview"
          :recipe="lastSearch"
          recipe_type="search"
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
      recipe_type: "random",
    };
  },
  methods:{
    updateLastSearch(){ //supposed to update the last searched value 
    // every time we click search in the child component - seems it's not happening
      console.log("heree")
      if (localStorage.lastSearch){
        this.lastSearch = JSON.parse(localStorage.getItem("lastSearch"))
        console.log("update method - last Search is:");
        console.log(this.lastSearch);
    }
    }
  },
  mounted() {
   //doesnt update the recipe very good
   if (localStorage.lastSearch){
      this.lastSearch = JSON.parse(localStorage.getItem("lastSearch"))
      console.log("mounted - last Search is:");
      console.log(this.lastSearch);
    }
  },
};
</script>
