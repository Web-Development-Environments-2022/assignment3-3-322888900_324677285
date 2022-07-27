<template>
  <b-container>
    <!-- ALSO A PROBLEM - THE TITLE IS UNDEFINED - SAME ISSUE AS PROPS -->
    <!-- <h3>
      {{ title }}:
      <slot></slot>
    </h3> -->
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
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
      required: true
    }
  },
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: []
    };
  },
  //NEED TO FIND BETTER WAY TO DEAL WITH THE PROPS ISSUE - FOR NOW ITS OK
  mounted: function () {
    let vm = this;      
    vm.$nextTick(function () {      
      console.log(this._props.page_type)
      if(this._props.page_type == "random")
        this.updateRandomRecipes();
      else if(this._props.page_type == "favorites"){
        this.updateFavoritesRecipes(); 
        console.log("hereeee")
      }
      else if(this._props.page_type == "family")
        this.updateFamilyRecipes(); //NOT IMPLEMENTED YET
      else if(this._props.page_type == "myRecipes")
        this.updateMyRecipes(); //NOT IMPLEMENTED YET
    });
  },
  methods: {
    async  updateFamilyRecipes(){
 try {
        const response = await this.axios.get(
          // process.env.VUE_APP_ROOT_API + "/recipes/random",
          "http://localhost:3000/user/family"
          // this.$root.store.server_domain
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data;
        console.log(response.data)
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async updateRandomRecipes() {
      try {
        const response = await this.axios.get(
          // process.env.VUE_APP_ROOT_API + "/recipes/random",
          "http://localhost:3000/recipes/random", {withCredentials: false}
          // this.$root.store.server_domain
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },

    //NOT WORKING GOOD CURRENTLY - NEED TO CHECK IT
    async updateFavoritesRecipes() {
      try {
        const response = await this.axios.get(
          // process.env.VUE_APP_ROOT_API + "/recipes/random",
          "http://localhost:3000/user/favorites"
   
        );
        console.log(response.data)
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes); 
      } catch (error) {
        console.log(error);
      }
    }
    
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
