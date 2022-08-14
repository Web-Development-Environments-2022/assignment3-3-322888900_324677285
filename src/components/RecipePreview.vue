<template>
  <div>
    <button v-b-tooltip.hover title="Add to favorites" @click="like" v-if="!addedTofav && (recipe_type === 'random' || recipe_type === 'recentleyViewed')">
      <b-icon-heart></b-icon-heart>
    </button>
    <button v-b-tooltip.hover title="Was added to favorites" v-if="addedTofav && (recipe_type === 'random' || recipe_type === 'recentleyViewed')">
      <b-icon-heart-fill></b-icon-heart-fill>
    </button>

    <router-link @click.native="clickIndication" v-if=" recipe_type !== 'myRecipes'"
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <div class="recipe-body">
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
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.aggregateLikes }} likes</li>
        </ul>
      </div>
    </router-link>

    <router-link :style="{ color: active_color }" @click.native="clickIndication" v-if=" recipe_type === 'myRecipes'"
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
      <div :style="{ 'text-decoration-color': active_color }" class="recipe-footer">
        <div :title="recipe.title" class="recipe-title ">
          {{ recipe.title }}
        </div>
        <ul class="recipe-overview ">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.aggregateLikes }} likes</li>
        </ul>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addedTofav: false,
      clicked: false,
      active_color: "blue",
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    recipe_type:{
      type: String,
      required: true,
    }
  },
  async mounted() { // NEED TO CHECK
    if(this.recipe_type !== 'myRecipes' && this.recipe_type !== 'search'){
      console.log("in checkInFavs - was added?")
      console.log(this.addedTofav)
      try {
        if (this.addedTofav === false) {
          const response = await this.axios.get(
            process.env.VUE_APP_ROOT_API + "/user/favorites",
            // "http://localhost:3000/user/favorites",
            { withCredentials: true }
          );
          console.log(response);
          for (let i = 0; i < response.length; i++) {
            if (this._props.recipe.id === response.data[i].id) {
              this.addedTofav = true;
              console.log("Added to favorites!")
              console.log(this.addedTofav)
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  methods: {
    // async checkInFavs() {
    //   console.log("in checkInFavs")
    //   console.log(this.addedTofav)
    //   try {
    //     if (this.addedTofav === false) {
    //       console.log("check if in favourites ");
    //       const response = await this.axios.get(
    //         process.env.VUE_APP_ROOT_API + "/user/favorites",
    //         { withCredentials: true }
    //       );
    //       console.log(response[0].id);
    //       for (let i = 0; i < response.length; i++) {
    //         if (this._props.recipe.id === response[i].id) {
    //           this.addedTofav = true;
    //           console.log("Added to faavorites!")
    //           console.log(this.addedTofav)
    //         }
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async like() {
      //STILL TESTING IT
      try {
        console.log("cliked like");
        console.log(this.addedTofav);
        const response = await this.axios.post(
          "http://localhost:3000/user/favorites",
          { withCredentials: true, recipe_id: this._props.recipe.id }
        );

        console.log(response);
        console.log("after clicking");
        this.addedTofav = true;
        console.log(this.addedTofav);
      } catch (error) {
        console.log(error);
      }
    },
    //MAYBE WE DONT NEED ALL THIS - NEED TO CHECK
    clickIndication(){
      console.log("change text color")
      this.clicked = true;
      this.active_color = "orange"
      console.log(this.clicked)
      console.log(this.active_color)
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
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 18pt;
  text-align: center;
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
</style>
