<template>
  <div class="container">
    <div v-if="$root.store.username">
      <h1 class="title">Your Recipes:</h1>
      <RecipePreviewList
        title="My Recipes"
        class="myRecipes center"
        page_type="myRecipes"
      />
    </div>
    <div v-else-if="!$root.store.username">
      <NotFoundPage></NotFoundPage>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import NotFoundPage from "../pages/NotFoundPage.vue";
export default {
  components: {
    RecipePreviewList,
    NotFoundPage,
  },
};
</script>

<style lang="scss" scoped>
.myRecipes {
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
