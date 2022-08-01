<template>
  <div class="container">
    <b-alert class="mt-2" v-if="addedTofav" variant="warning" dismissible show>
      Added to favorites
    </b-alert>
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <b-form @submit.prevent="like">
        <b-button
          type="submit"
          variant="primary"
          style="width:100px;display:block;"
          class="mx-auto w-100"
          >Add To Favourites</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      addedTofav: false,
    };
  },
  methods: {
    async like() {
      try {
        console.log("call like favourite ");
        console.log(this.$route.params.recipeId);
        const response = await this.axios.post(
          "http://localhost:3000/user/favorites",
          {
            // withCredentials: true,
            recipe_id: this.$route.params.recipeId,
          }
        );
        this.addedTofav = true;
        console.log(addedTofav);
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    // try {
    //   let response;
    //   response = this.$route.params.response;
    try {
      console.log(this.$route.params.recipeId);
      const response = await this.axios.post(
        "http://localhost:3000/user/lastSeenRecipes",
        {
          recipe_id: this.$route.params.recipeId
        }
      );

      console.log("response.status", response.status);
      if (response.status !== 200) this.$router.replace("/NotFound");
    } catch (error) {
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;

      // } catch (error) {
      //   console.log("error.response.status", error.response.status);
      //   this.$router.replace("/NotFound");
      //   return;
      // }
    }
  },

  async created() {
    try {
      let response;
      response = this.$route.params.response;

      try {
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          // this.$root.store.server_domain + "/recipes/info",
          "http://localhost:3000/recipes/fullRecipe/" +
            this.$route.params.recipeId
          // process.env.VUE_APP_ROOT_API + "/recipes/fullRecipe",
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
      } = response.data;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
      };
      //localStorage.getItem("lastRecipes").recipe1= this.$route.params.recipeId
      this.recipe = _recipe;
      
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
