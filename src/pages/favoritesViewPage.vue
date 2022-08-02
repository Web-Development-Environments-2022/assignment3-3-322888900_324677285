<template>
  <div class="container">
    <h1 class="title">Favorite Recipes</h1>
    <RecipePreviewList
      title="Favorite Recipes"
      class="FavoriteRecipes center"
      page_type="favorites"
      :favorite_recipes="recipes"
      :recipe_index_to_show="recipe_index_to_show"
    />
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
            >Previous</a
          >
        </li>
        <li v-for="index in 10" :key="index">
          <button class="page-link" @click="switch_page(index)">{{ index }}</button>
          <!-- <a class="page-link" href="#">{{ index }}</a> -->
        </li>
        <li class="page-item">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "FavoritesViewPage",
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      page_type: "favorites",
      recipes: [],
      recipe_index_to_show: 0,
      number_of_pages: 0,
    };
  },
  mounted: function() {
    this.updateFavoritesRecipes();
  },
  methods: {
    async updateFavoritesRecipes() {
      try {
        const response = await this.axios.get(
          // process.env.VUE_APP_ROOT_API + "/recipes/random",
          "http://localhost:3000/user/favorites"
        );
        console.log(response.data);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        this.number_of_pages = Math.floor(this.recipes.length / 3);
        console.log(this.number_of_pages);
      } catch (error) {
        console.log(error);
      }
    },
    switch_page(index){
      this.recipe_index_to_show = index*3
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
