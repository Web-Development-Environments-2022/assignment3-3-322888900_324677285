<template>
  <div class="container">
    <h1 class="title">Favorite Recipes</h1>
    <b-container>
      <!-- ALSO A PROBLEM - THE TITLE IS UNDEFINED - SAME ISSUE AS PROPS -->
      <!-- <h3>
      {{ title }}:
      <slot></slot>
    </h3> -->
    <!-- THERE'S A PROBLEM TO SHOW LESS THEN 3 RECIPES (IT SHOWS THE PREVIOUSE RECIPES) -->
      <b-row> 
        <b-col v-for="(n,i) in 3" :key="i">
          <RecipePreview
            class="recipePreview"
            :recipe="recipes[recipe_index_to_show + i]"
          />
        </b-col>
      </b-row>
    </b-container>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
            >Previous</a
          >
        </li>
        <li v-for="(n,i) in number_of_pages" :key="i">
          <button class="page-link" @click="switch_page(i)">
            {{ n }}
          </button>
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
import RecipePreview from "../components/RecipePreview";

export default {
  name: "FavoritesViewPage",
  components: {
    RecipePreview,
  },
  data() {
    return {
      page_type: "favorites",
      recipes: [],
      recipe_index_to_show: 0,
      number_of_pages: 0,
      current_page: 0,
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
        let reminder = this.recipes.length % 3
        this.number_of_pages = Math.floor(this.recipes.length / 3);
        if (reminder !== 0){
          this.number_of_pages = this.number_of_pages + 1
        }
        console.log("number of pages is:")
        console.log(this.number_of_pages);
      } catch (error) {
        console.log(error);
      }
    },
    switch_page(index) {
      console.log("button was clicked");
      this.recipe_index_to_show = index * 3;
      console.log("number is:");
      console.log(this.recipe_index_to_show);
      this.current_page = index
      console.log("current page is:")
      console.log(this.current_page)
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
