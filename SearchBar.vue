<template>
  <div class="container">
    <input type="text" v-model="search" placeholder="Search Recipes">
  </div>
</template>
<script>

export default{
    data(){
        return {
            search:""
        }    
    }
}
</script>