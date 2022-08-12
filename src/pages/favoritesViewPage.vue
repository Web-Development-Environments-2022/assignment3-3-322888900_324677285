<template>
  <div>
    <div v-if="$root.store.username">
      <h1 class="title">Favorite Recipes</h1>
      <div>
        <b-container>
          <!-- THERE'S A PROBLEM TO SHOW LESS THEN 3 RECIPES (IT SHOWS THE PREVIOUSE RECIPES) -->
          <b-row>
            <b-col v-for="(n, i) in 3" :key="i">
              <div v-if="recipe_index_to_show + i <= recipes.length">
                <RecipePreview
                  class="recipePreview"
                  :recipe="recipes[recipe_index_to_show + i]"
                />
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <br />
      <br />
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end">
          <li class="page-item">
            <button
              class="page-link"
              @click="previous"
              :disabled="prev_button_enable"
            >
              Previous
            </button>
          </li>
          <li v-for="(n, i) in number_of_pages" :key="i">
            <button class="page-link" @click="switch_page(i)">
              {{ n }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="next"
              :disabled="next_button_enable"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else-if="!$root.store.username">
      <h1>Sorry, you have to log in to see this page</h1>
    </div>
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
      next_button_enable: false,
      prev_button_enable: true,
    };
  },
  mounted: function() {
    this.updateFavoritesRecipes();
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
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
        let reminder = this.recipes.length % 3;
        this.number_of_pages = Math.floor(this.recipes.length / 3);
        if (reminder !== 0) {
          this.number_of_pages = this.number_of_pages + 1;
        }
        console.log("number of pages is:");
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
      this.current_page = index;
      console.log("current page is:");
      console.log(this.current_page);
      if (this.current_page !== 1) {
        this.prev_button_enable = false;
      }
    },

    next() {
      console.log("next button");
      if (this.current_page !== this.number_of_pages - 1) {
        this.switch_page(this.current_page + 1);
      }
      if (this.current_page + 1 === this.number_of_pages - 1) {
        this.next_button_enable = true;
      }
    },
    previous() {
      console.log("previous button");
      if (this.current_page !== 0) {
        this.switch_page(this.current_page - 1);
        if (this.current_page - 1 === this.number_of_pages - 1) {
          this.prev_button_enable = true;
        }
      }
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
