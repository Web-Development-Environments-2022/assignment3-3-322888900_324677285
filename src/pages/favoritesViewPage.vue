<template>
  <div class="container">
    <h1 class="title">Favorite Recipes</h1>
    <RecipePreviewList title="Favorite Recipes" class="FavoriteRecipes center" page_type="favorites" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name:"FavoritesViewPage",
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      page_type: "favorites"
    };
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
