<template>
  <div>
    <b-container>
      <b-row v-for="r in recipes" :key="r.recipe_id">
        <b-col>
          <FamilyRecipePreview class="FamilyRecipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </b-container>
    <div v-if="recipes.length === 0">
      <h3>You have no recipes yet...</h3>
    </div>
  </div>
</template>

<script>
import FamilyRecipePreview from "./FamilyRecipePreview.vue";
export default {
  components: {
    FamilyRecipePreview,
  },
  data() {
    return {
      recipes: [],
    };
  },

  mounted: function() {
    let vm = this;
    vm.$nextTick(function() {
      this.updateFamilyRecipes();
      
    });
  },
  methods: {
    async updateFamilyRecipes() {
      try {
        const response = await this.axios.get(
          process.env.VUE_APP_ROOT_API + "/user/family",
          // "http://localhost:3000/user/family"
        );

        console.log(response);
        const recipes = response.data;
        console.log(response.data);
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
