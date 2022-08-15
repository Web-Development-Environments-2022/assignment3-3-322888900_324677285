<template>
  <div class="container">
    <b-button class="btn btn-secondary btn-lg" v-if="$root.store.username" v-b-modal.new-rec-modal
      >+ Add New Recipe</b-button
    >
    <b-modal
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      id="new-rec-modal"
      title="New Recipe"
      @ok="submitRecipe"
    >
      <p class="my-4">Hello, please enter details of your new recipe</p>
      <div class="form-group">
        <label for="recipe_name" class="col-form-label">Recipe Name:</label>
        <textarea
          v-model="recipe_name"
          class="form-control"
          id="Recipe-text"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="RecipeName" class="col-form-label">Cooking duration:</label>
        <textarea
          v-model="duration"
          class="form-control"
          id="Recipe-duration"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="ingredients" class="col-form-label">Ingredients:</label>
        <textarea
          v-model="extendedIngredients"
          class="form-control"
          id="Recipe-ingredients"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="instructions" class="col-form-label">instructions:</label>
        <textarea
          v-model="instructions"
          class="form-control"
          id="Recipe-instructions"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="col-form-label">Image Link:</label>
        <textarea
          v-model="image"
          class="form-control"
          id="message-text"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="col-form-label">Vegan - </label>
        <input type="checkbox" id="checkbox-vegan" v-model="isVegan" />
        <label for="checkbox">{{ isVegan }}</label>
      </div>
      <div class="form-group">
        <label class="col-form-label">Vegeterian - </label>
        <input
          type="checkbox"
          id="checkbox-vegeterian"
          v-model="isVegetarian"
        />
        <label for="checkbox">{{ isVegetarian }}</label>
      </div>
      <div class="form-group">
        <label class="col-form-label">gluten free - </label>
        <input
          type="checkbox"
          id="checkbox-glutenFree"
          v-model="isGlutenFree"
        />
        <label for="checkbox">{{ isGlutenFree }}</label>
      </div>
      <div class="form-group">
        <label class="col-form-label">How many servings:</label>
        <textarea
          v-model="servings"
          class="form-control"
          id="Recipe-servings"
        ></textarea>
      </div>
    </b-modal>
  </div>
</template>

<script>
import intolerancesAsset from "../assets/intolerances";
import dietsAsset from "../assets/diets";
import cuisineAsset from "../assets/cuisine";

export default {
  data() {
    return {
      recipe_name: "",
      duration: "",
      aggregateLikes: "0",
      image: "",
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      extendedIngredients: "",
      instructions: "",
      servings: "0",
    };
  },

  methods: {
    async insertRecipe() {
      try {
        let vegan = "0";
        let vegetarian = "0";
        let glutenFree = "0";

        if (this.isVegan) {
          vegan = "1";
        }
        if (this.isVegetarian) {
          vegetarian = "1";
        }
        if (this.isGlutenFree) {
          glutenFree = "1";
        }
        console.log(vegan);
        console.log(vegetarian);
        console.log(glutenFree);
        const response = await this.axios.post(
         // "http://localhost:3000/user/myRecipes",
          this.$root.store.server_domain+"/user/myRecipes",
          {
            recipe_name: this.recipe_name,
            duration: this.duration,
            image: this.photos,
            aggregateLikes: this.aggregateLikes,
            vegan: this.isVegan,
            ingredients: this.ingredients,
            instructions: this.instructions,
            image: this.image,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
            extendedIngredients: this.extendedIngredients,
            instructions: this.instructions,
            servings: this.servings,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async submitRecipe() {
      await this.insertRecipe();
    },
    resetModal() {
      this.recipe_name = "",
      this.duration = "",
      this.aggregateLikes = "0",
      this.image = "",
      this.isVegan = false,
      this.isVegetarian = false,
      this.isGlutenFree = false,
      this.extendedIngredients = "",
      this.instructions = "",
      this.servings = "0"
      },
  },
};
</script>
