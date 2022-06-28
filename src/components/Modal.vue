<template>
  <div>
    <b-button @click="modalShow = !modalShow">Create New Recipe</b-button>

    <b-modal v-model="modalShow">Hello From Modal!</b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modalShow: false
      }
    }
  }
</script>