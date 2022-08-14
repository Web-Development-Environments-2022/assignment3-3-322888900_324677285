<template>
  <div class="container">
    <b-row>
      <b-col>
        <h1 class="title">Main Page</h1>
        <RecipePreviewList
          title="Random Recipes"
          class="RandomRecipes center"
          page_type="random"
        ></RecipePreviewList>
      </b-col>
      <b-col>
        <h1>You watched:</h1>
        <router-link to="/login" v-if="!$root.store.username" class="btn btn-info btn-lg" role="button">You need to Login to vue this</router-link>
        <RecipePreviewList
          v-if="$root.store.username"
          title="Last View Recipes"
          class="lastSeenRecipes center"
          page_type="recentleyViewed"
        ></RecipePreviewList>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      page_type: "main",
    };
  },
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

.btn-info, .btn-info:hover, .btn-info:active, .btn-info:visited {
    background-color: #7e0aa8 !important;
    border-block-color:  #7e0aa8;
}
</style>
