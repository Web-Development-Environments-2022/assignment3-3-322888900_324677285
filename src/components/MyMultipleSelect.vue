<template>
<div>
  <label>{{TypeOfElements}}</label>
  <multiselect v-model="value" 
  tag-placeholder="Add this as new tag" 
  v-bind:placeholder=TypeOfElements
  label="name" 
  track-by="name" 
  :options="options" 
  :multiple="true" 
  :taggable="true" 
  @input="onChange" 
  ></multiselect>
</div>
</template>
<script>src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"
</script>
<script>

import Multiselect from 'vue-multiselect'
import dietsAsset from "../assets/diets";
import intolerancesAsset from "../assets/intolerances";
export default {
  components: {
    Multiselect
  },
  props: {
    TypeOfElements: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      value: [],
      options: [],
      dietsAsset: [{ value: null, text: "", disabled: true }],
      intolerancesAsset: [{ value: null, text: "", disabled: true }],

    }
  },
 mounted() {
    this.dietsAsset.push(...dietsAsset);
    this.intolerancesAsset.push(...intolerancesAsset)
    if(this._props.TypeOfElements==="diets"){
        this.options=this.dietsAsset
      }
    else if(this._props.TypeOfElements==="intolerances"){
        this.options=this.intolerancesAsset
      }
  },
  methods: {
   
    onChange(){
      let newvalue=[]
      for(let i=0;i<this.value.length;i++){
        newvalue.push(this.value[i].name)
      }
        if(this._props.TypeOfElements==="diets"){
      this.$emit("TypeOfElements",newvalue)
      }
    else if(this._props.TypeOfElements==="intolerances"){
      this.$emit("TypeOfElements",newvalue)
      }
    }

  }
  }

  
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
