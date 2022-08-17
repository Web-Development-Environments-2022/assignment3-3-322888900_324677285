<template>
  <b-container>
    <div v-if="recipes.length !== 0">
      <b-row v-for="r in recipes" :key="r.id">
        <b-col>
          <RecipePreview
            class="recipePreview"
            :recipe="r"
            :recipe_type="page_type"
            :isSearch="isSearch"
            :favoriteRecipes="favoriteRecipes"
          />
        </b-col>
      </b-row>
    </div>
    <div v-if="recipes.length === 0 && page_type === 'myRecipes'">
      <h3>You have no recipes yet...</h3>
    </div>
    <div v-if="recipes.length === 0 && page_type === 'random'">
      <h3>Oops, we couldn't find the recipes..</h3>
    </div>
    <div v-if="recipes.length === 0 && page_type === 'recentleyViewed'">
      <h3>Oops, no last seens yet</h3>
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import NewRecipeModal from "./NewRecipeModal.vue";
export default {
  name: "RecipePreviewList",
  props: {
    isSearch:{
      type:Boolean,
      required:false,
      default:false
    },
    page_type: {
      type: String,
      required: true,
    },
  },
  components: {
    RecipePreview,  },
  data() {
    return {
      recipes: [],
      favoriteRecipes: [],
    };
  },
  async created(){
    try {
        const response = await this.axios.get(
          //process.env.VUE_APP_ROOT_API + "/user/favorites",
          this.$root.store.server_domain + "/user/favorites",
          // "http://localhost:3000/user/favorites",
          { withCredentials: true }
        );
        for(let i=0; i<response.data.length; i++){
           this.favoriteRecipes.push(response.data[i].id)
        }
      } catch (error) {
      }
  },
  mounted: function() {
    let vm = this;
    vm.$nextTick(function() {
      if (this._props.page_type == "random") this.updateRandomRecipes();
      else if (this._props.page_type == "myRecipes") this.updateMyRecipes();
      else if (this._props.page_type == "favorites")
        this.updateFavoritesRecipes();
      else if (this._props.page_type == "recentleyViewed")
        this.updateLastSeenRecipes();
    });
  },
  methods: {
    async updateRandomRecipes() {
      try {
        const response = await this.axios.get(
          //process.env.VUE_APP_ROOT_API + "/recipes/random",
          this.$root.store.server_domain+"/recipes/random",
          // "http://localhost:3000/recipes/random",
          { withCredentials: false }
        );

        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
      }
    },

    async updateLastSeenRecipes() {
      try {
        const response = await this.axios.get(
          //process.env.VUE_APP_ROOT_API + "/user/lastSeenRecipes",
          this.$root.store.server_domain + "/user/lastSeenRecipes",
          // "http://localhost:3000/user/lastSeenRecipes"
        );
        const recipes = [
          response.data.FirstRecipe,
          response.data.SecondRecipe,
          response.data.ThirdRecipe,
        ];
        this.recipes = [];
        for (let i = 0; i < recipes.length; i++) {
          if (recipes[i] !== null) {
            this.recipes.push(recipes[i]);
          }
        }
     
      } catch (error) {
      }
    },
    async updateFavoritesRecipes() {
      try {
        const response = await this.axios.get(
          //process.env.VUE_APP_ROOT_API + "/user/favorites",
          this.$root.store.server_domain + "/user/favorites",
          // "http://localhost:3000/user/favorites"
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
      }
    },
    async updateMyRecipes() {
      try {
        const response = await this.axios.get(
          //process.env.VUE_APP_ROOT_API + "/user/myRecipes",
          this.$root.store.server_domain+ "/user/myRecipes",
          // "http://localhost:3000/user/myRecipes"
        );
        try {
          const recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
        } catch (error) {
        }
      } catch (error) {
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
  max-width: 960px;
}
</style>
