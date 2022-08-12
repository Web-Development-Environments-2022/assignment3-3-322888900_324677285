<template>
  <div>
    <button @click="like" v-if="!addedTofav">
      <b-icon-heart></b-icon-heart>
    </button>
    <button v-if="addedTofav">
      <b-icon-heart-fill></b-icon-heart-fill>
    </button>

    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <div class="recipe-body">
        <img :src="recipe.image" class="recipe-image" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      addedTofav: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.checkInFavs;
  },
  methods: {
    async checkInFavs() {
      try {
        if (this.addedTofav === false) {
          console.log("check if in favourites ");
          const response = await this.axios.get(
            "http://localhost:3000/user/favorites",
            { withCredentials: false }
          );
          console.log(response[0].id);
          for (let i = 0; i < response.length; i++) {
            if (this._props.recipe.id === response[i].id) {
              this.addedTofav = true;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async like() {//STILL TESTING IT
      try {
        const response = await this.axios.get(
          "http://localhost:3000/user/favorites",
          { withCredentials: false }
        );
        console.log(response[0].id);

        //   console.log("recipe is in favorites: ")
        //   console.log(this.addedTofav)
        //   console.log("recipe id is:  ");
        //   console.log(this._props.recipe.id)
        //   const response = await this.axios.post(
        //     "http://localhost:3000/user/favorites",
        //     {
        //       withCredentials: true,
        //       recipe_id: this._props.recipe.id
        //     }
        //   );
        //   this.addedTofav = true;
        //   console.log(this.addedTofav);
      } catch (error) {
        console.log(error);
      }
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
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
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
