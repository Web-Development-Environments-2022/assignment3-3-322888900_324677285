<template>
  <div class="border border-1">
    <b-icon-eye
      v-b-tooltip.hover
      title="Unwatched"
      font-scale="2"
      v-if="
        !clickedRecipes.includes(recipe.id) &&
          (recipe_type === 'random' || recipe_type === 'recentleyViewed')
      "
    >
    </b-icon-eye>
    <b-icon-eye-fill
      v-b-tooltip.hover
      title="Watched"
      font-scale="2"
      v-if="
        clickedRecipes.includes(recipe.id) &&
          (recipe_type === 'random' || recipe_type === 'recentleyViewed')
      "
    >
    </b-icon-eye-fill>
    <button
      v-b-tooltip.hover
      title="Add to favorites"
      font-scale="2"
      @click="like"
      v-if="
        !favoriteRecipes.includes(recipe.id) &&
          (recipe_type === 'random' || recipe_type === 'recentleyViewed')
      "
    >
      <b-icon-heart></b-icon-heart>
    </button>
    <button
      v-b-tooltip.hover
      title="Was added to favorites"
      font-scale="2"
      v-if="
        favoriteRecipes.includes(recipe.id) &&
          (recipe_type === 'random' || recipe_type === 'recentleyViewed')
      "
    >
      <b-icon-heart-fill></b-icon-heart-fill>
    </button>
    <router-link
      v-if="recipe_type !== 'myRecipes'"
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <div class="recipe-body center">
        <b-img
          class="recipe-image"
          thumbnail
          fluid
          :src="recipe.image"
          alt="Image 1"
        ></b-img>
      </div>
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
        <div>
          <ul class="recipe-overview">
            <li>{{ recipe.readyInMinutes }} minutes</li>
            <li>{{ recipe.aggregateLikes }} likes</li>
            <li v-if="recipe_type === 'search'">
              <div class="wrapped">
                Instructions: 
                {{recipe.instructions}}
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div class="recipe-tags">
            <kbd class="vegan" v-if="recipe.vegan">Vegan</kbd>
            <kbd class="vegetarian" v-if="recipe.vegetarian">Vegetarian</kbd>
            <kbd class="llg" v-if="recipe.glutenFree">Gluten Free</kbd>
          </div>
        </div>
      </div>
    </router-link>

    <router-link
      v-if="recipe_type === 'myRecipes'"
      :to="{ name: 'myRecipe', params: { recipe: recipe } }"
      class="recipe-preview"
    >
      <div class="recipe-body center">
        <b-img
          class="recipe-image"
          thumbnail
          fluid
          :src="recipe.image"
          alt="Image 1"
        ></b-img>
      </div>
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title ">
          {{ recipe.title }}
        </div>
        <ul class="recipe-overview ">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.aggregateLikes }} likes</li>
        </ul>
        <div>
          <div class="recipe-tags">
            <kbd class="vegan" v-if="recipe.vegan">Vegan</kbd>

            <kbd class="vegetarian" v-if="recipe.vegetarian">Vegetarian</kbd>
            <kbd class="llg" v-if="recipe.glutenFree">Gluten Free</kbd>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickedRecipes: [],
    };
  },
  props: {
    isSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    recipe: {
      type: Object,
      required: true,
    },
    recipe_type: {
      type: String,
      required: true,
    },
    favoriteRecipes: {
      type: Array,
      required: true,
    },
  },

  async mounted() {
    // geting the watched recipes from LS
    if (localStorage.watchedRecipes) {
      let dataFromLS = JSON.parse(localStorage.getItem("watchedRecipes"));
      this.clickedRecipes = dataFromLS["recipes_id"];
    }
  },

  methods: {
    async like() {
      try {
        console.log("before adding to favs: ", this.favoriteRecipes);
        const response = await this.axios.post(
          // "http://localhost:3000/user/favorites",
          this.$root.store.server_domain + "/user/favorites",
          { withCredentials: true, recipe_id: this._props.recipe.id }
        );
        this.favoriteRecipes.push(this._props.recipe.id);
        console.log("updated list of favs: ", this.favoriteRecipes);
      } catch (error) {
        console.log(error);
      }
    },

    addToWatchedRecipes() {
      console.log("Adding recipe to watched");
      if (localStorage.watchedRecipes) {
        let dataFromLS = JSON.parse(localStorage.getItem("watchedRecipes"));
        console.log("watched recipes ids are:");
        console.log(dataFromLS["recipes_id"]);
        this.clickedRecipes = dataFromLS["recipes_id"];
        if (!this.clickedRecipes.includes(this.recipe.id)) {
          this.clickedRecipes.push(this.recipe.id);
          dataFromLS["recipes_id"] = this.clickedRecipes;
          console.log("Updated list is:");
          console.log(dataFromLS);
          localStorage.setItem("watchedRecipes", JSON.stringify(dataFromLS));
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  border-color: #e87121;
}

.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 400px;
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
  height: 100%;
  overflow: hidden;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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

.vegan {
  background-color: #076e0c;
}
.vegetarian {
  background-color: #26d3aa;
}

.llg {
  background-color: #d37d0d;
}
</style>
