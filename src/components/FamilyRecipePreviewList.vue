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
         // process.env.VUE_APP_ROOT_API + "/user/family",
          this.$root.store.server_domain + "/user/family",
          // "http://localhost:3000/user/family"
        );

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
