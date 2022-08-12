<template>
  <div class="container" id="about_page">
    <h1 class="title">Who Are We?</h1>
    <b-icon icon="github"></b-icon>
    <b-container>
      <b-row>
        <b-col
          >
          <a href="https://www.linkedin.com/in/katya-donchenk0/">
          <b-img v-b-tooltip.hover title="Go to LinkedIn profile"
            class="profile_image"
            thumbnail
            fluid
            :src="require('@/assets/katya_profile.jpg')"
            rounded="circle"
            alt="Circle image"
          > 
          </b-img
        >
        </a></b-col>
        <a href="https://www.linkedin.com/in/niv-fono-7189661a5/">
        <b-img v-b-tooltip.hover title="Go to LinkedIn profile"
          class="profile_image"
          thumbnail
          fluid
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPysUFNvqpMLIMclX-WIJ93Y51UlUePOJ4y55TkKPDiQdVovFPKlY4b27r5F8JrIRSn4&usqp=CAU"
          rounded="circle"
          alt="Circle image"
        ></b-img></a>
      </b-row>
    </b-container>
    <p>
      We are Niv and Katya, third year students for information systems
      engineering from BGU. This website is our final project in the course of
      website development.
    </p>
    <h1 class="title">What is Exprecipe?</h1>
    <p>
      Exprecipe is a recipes website. In exrecipe you can find many different
      recipes. In addition, you can save your own recipes in one place - with
      pictures and instructions that you write! No more trying to remember where
      you wrote the recipe you need right away.. With Exprecipe you can find all
      your best recipes just in one click. Another great feature Exprecipe gives
      you is the ability to save your family's traditional recipes that until
      today were passed by word of mouth - which made it very hard to preserve
      these recipes.
    </p>
    <h2 class="title">Exprecipe Development process:</h2>
    <ul>
      <!-- Need to check the link is correct -->
      <li>
        We first created an open API document via the Swagger tool which
        included the initial API we were planning to build for this website.
        <a
          href="file:///C:/Users/donnk/Documents/BGU/3/2/%D7%A1%D7%91%D7%99%D7%91%D7%95%D7%AA%20%D7%A4%D7%99%D7%AA%D7%95%D7%97%20%D7%91%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98/ex3.1/324677285_322888900/index.html"
        >
          Link to Open API document
        </a>
      </li>
      <li>
        Then, we developed the backend part of the website.
        <a
          href="https://github.com/Web-Development-Environments-2022/assignment3_2-322888900_324677285"
        >
          Link to GitHub repository of the server side
        </a>
      </li>
      <li>
        In the last part we developed the frontend part, based on the backend
        and the Open API document.
        <a
          href="https://github.com/Web-Development-Environments-2022/assignment3-3-322888900_324677285"
        >
          Link to GitHub repository of the client side
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style lang="scss" scoped>
.profile_image {
  margin-left: 200px;
  margin-right: 200px;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 250px;
  height: 250px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.title{
  text-align: center;  
}
</style>
