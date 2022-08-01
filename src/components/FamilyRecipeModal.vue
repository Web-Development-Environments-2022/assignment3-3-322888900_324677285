<template  >
<div class="container">
    <b-button v-b-modal.family-modal>Enter Family Recipe</b-button>
  <b-modal id="family-modal" title="Family Recipe"  @ok="submitRecipe">
    <p class="my-4">Hello, Please Enter Your Family recipe</p>
   <div class="form-group">
            <label for="RecipeName" class="col-form-label">Please Enter Recipe Name:</label>
            <textarea v-model="recipeName" class="form-control" id="Recipe-text"></textarea>
    </div> 
    <div class="form-group">
            <label  class="col-form-label">Image Link:</label>
            <textarea v-model="photos" class="form-control" id="message-text"></textarea>
    </div> 
  <div class="form-group">
            <label for="RecipeOwner" class="col-form-label">Please Enter Recipe Owner:</label>
            <textarea v-model="recipeOwner" class="form-control" id="Recipe-Owner"></textarea>
    </div> 
  <div class="form-group">
            <label for="whenToCook" class="col-form-label">Please Enter Time To Cook Recipe:</label>
            <textarea v-model="whenToCook" class="form-control" id="Recipe-TimeToCook"></textarea>
    </div> 
    <div class="form-group">
            <label for="ingredients" class="col-form-label">Please Enter ingredients:</label>
            <textarea v-model="ingredients" class="form-control" id="Recipe-ingredients"></textarea>
    </div>
    <div class="form-group">
            <label for="instructions" class="col-form-label">Please Enter instructions:</label>
            <textarea v-model="instructions" class="form-control" id="Recipe-instructions"></textarea>
    </div>      
  </b-modal>
</div>
</template>
<!-- recipeName: "",
      recipeOwner:"",
      whenToCook:"",
      ingredients:"",
      instructions:"",
      photos:""  -->

<script>
import intolerancesAsset from "../assets/intolerances";
import dietsAsset from "../assets/diets";
import cuisineAsset from "../assets/cuisine";

export default{
data()
{
return{

      recipeName: "",
      recipeOwner:"",
      whenToCook:"",
      ingredients:"",
      instructions:"",
      photos:""     
}
},
 
methods:{
   async insertRecipe() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/user/family", {
        
           recipe_id :this.recipeName,
           recipe_owner : this.recipeOwner,
           when_to_cook : this.whenToCook,
           ingredients : this.ingredients,
           instructions : this.instructions,
           photos : this.photos
        
    }
  );
      
      } catch (error) {
        console.log(error);
      }
    },
    async submitRecipe(){
        await this.insertRecipe();
    }


}

}
</script>