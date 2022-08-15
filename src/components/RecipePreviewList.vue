<template>
  <b-container>
    <b-row v-for="r in recipes" :key="r.id">
      <b-col>
        <RecipePreview class="recipePreview" :recipe="r" :recipe_type="page_type" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  props: {
    page_type: {
      type: String,
      required: true,
    },
  },
  components: {
    RecipePreview,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted: function() {
    let vm = this;
    vm.$nextTick(function() {
      console.log("page type is:");
      console.log(this._props.page_type);
      if (this._props.page_type == "random") this.updateRandomRecipes();
      else if (this._props.page_type == "myRecipes") this.updateMyRecipes();
      else if (this._props.page_type == "favorites") this.updateFavoritesRecipes();
      else if (this._props.page_type == "recentleyViewed")
        this.updateLastSeenRecipes();
    });
  },
  methods: {
    async updateRandomRecipes() {
      console.log("Random recipes here~~~");
      try {
        const response = await this.axios.get(
          //process.env.VUE_APP_ROOT_API + "/recipes/random",
          this.$root.store.server_domain+"/recipes/random",
          // "http://localhost:3000/recipes/random",
          { withCredentials: false }
        );

        const recipes = response.data.recipes;
        console.log("Random recipes are:");
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },

    async updateLastSeenRecipes() {
      console.log("last seen recipes");
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
        console.log("last seen recipes:");
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async updateFavoritesRecipes() {
      console.log("favorite recipes here")
      try {
        const response = await this.axios.get(
          //process.env.VUE_APP_ROOT_API + "/user/favorites",
          this.$root.store.server_domain + "/user/favorites",
          // "http://localhost:3000/user/favorites"
        );
        console.log(response.data);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
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
          console.log(response);
          const recipes = response.data;
          console.log(response.data);
          this.recipes = [];
          this.recipes.push(...recipes);
          console.log(this.recipes);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
