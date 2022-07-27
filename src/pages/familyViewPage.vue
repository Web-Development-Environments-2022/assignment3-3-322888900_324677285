<template>
  <div class="container">
    <h1 class="title">Family Recipes</h1>
    <FamilyRecipeModal></FamilyRecipeModal>
    <RecipePreviewList title="Family Recipes" class="FamilyRecipes center" page_type="family" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import FamilyRecipeModal from "../components/FamilyRecipeModal.vue";
export default {
  components: {
    RecipePreviewList,
    FamilyRecipeModal
  }
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
