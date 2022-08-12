<template>
  <div>
    <div v-if="$root.store.username" class="container">
      <h1 class="title">Your Favorite Recipes:</h1>
      <RecipePreviewList
        class="Favorites center"
        page_type="favorites"
      />
    </div>
    <div v-else-if="!$root.store.username">
      <h1>Sorry, you have to log in to see this page</h1>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
};
</script>

<style lang="scss" scoped>
.Favorites {
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