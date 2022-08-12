<template>
<div>
  <div v-if="$root.store.username" class="container">
    <h1 class="title">Family Recipes</h1>
    <FamilyRecipeModal></FamilyRecipeModal>
    <FamilyRecipePreviewList title="Family Recipes" class="FamilyRecipes center"/>
  </div>
  <div v-else-if="!$root.store.username">
    <h1> Sorry, you have to log in to see this page</h1>
  </div>
  </div>
</template>

<script>
import FamilyRecipePreviewList from "../components/FamilyRecipePreviewList";
import FamilyRecipeModal from "../components/FamilyRecipeModal.vue";
export default {
  components: {
    FamilyRecipePreviewList,
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
