<template>
<div>
  <label class="typo__label">Tagging</label>
  <multiselect v-model="value" 
  tag-placeholder="Add this as new tag" 
  placeholder="Search or add a tag" 
  label="name" 
  track-by="name" 
  :options="options" 
  :multiple="true" 
  :taggable="true" 
  @tag.prevent="addTag"></multiselect>
  <pre class="language-json"><code>{{ value  }}</code></pre>
</div>
</template>
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
    addTag (newTag) {
      console.log("laaa")
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
        if(this._props.TypeOfElements==="diets"){
      $emit("saveDiets",value)
      }
    else if(this._props.TypeOfElements==="intolerances"){
      $emit("saveIntolerances",value)
      }
    }
  }
  }

  

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
