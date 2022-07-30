<template>
<div>
  <label class="typo__label">Please Enter {{TypeOfElements}} </label>
  <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="name" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
</div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import dietsAsset from "../assets/diets";
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
      dietsAsset: [{ value: null, text: "", disabled: true }]
    }
  },
 mounted() {
    this.dietsAsset.push(...dietsAsset);
    if(this._props.TypeOfElements==="diets"){
        this.options=this.dietsAsset
      }

  },
  methods: {
    addTag (newTag) {
     
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
      $emit("TypeOfElements",value)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
