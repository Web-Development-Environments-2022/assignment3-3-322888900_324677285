<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.recipe_id}}</h1>
        <h3>Owner of recipe: {{recipe.owner_of_recipe}} </h3>
        <img :src="recipe.photos" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            Ingredients:
            {{recipe.ingredients}}
          </div>
          <div class="wrapped">
            Instructions:
           {{recipe.Instructions}}
          </div>
           <div class="wrapped">
            When To Cook:
           {{recipe.when_to_cook}}
          </div>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  }
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
