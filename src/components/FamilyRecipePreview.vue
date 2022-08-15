<template>
  <router-link 
    :to="{
      name: 'FamilyRecipeViewPage',
      params: { recipe: recipe },
      prop: { recipe: recipe },
    }"
    class="recipe-preview border border-1"
  >
    <div>
      <div class="recipe-body">
        <b-img
          class="recipe-image"
          thumbnail
          fluid
          :src="recipe.photos"
          alt="Image 1"
        ></b-img>
      </div>
      <div class="recipe-footer">
        <div :title="recipe.recipe_id" class="recipe-title">
          {{ recipe.recipe_id }}
        </div>
        <ul class="recipe-overview">
          <li>Best time to make it: {{ recipe.when_to_cook }}</li>
          <li>Owner of this recipe: {{ recipe.owner_of_recipe }}</li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "FamilyRecipePreview",

  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 350px;
  height: 350px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 16pt;
  text-align: center;
  text-decoration-line: underline;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

kbd {
padding: 6px 6px;
color: white;
border-radius: 3px;
  font-family: Arial, Helvetica, sans-serif;
}

.vegan{
  background-color: #076e0c;
  
}
.vegetarian{
  background-color: #26d3aa;
}

.llg{
    background-color: #E87121;

}

</style>
