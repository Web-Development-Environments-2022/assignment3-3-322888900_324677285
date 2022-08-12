import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/user/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesViewPage"),
  },
  {
    path: "/user/family",
    name: "family",
    component: () => import("./pages/familyViewPage"),
  },
  {
    path: "/user/FamilyRecipeViewPage",
    name: "FamilyRecipeViewPage",
    props: true,
    component: () => import("./pages/FamilyRecipeViewPage"),
  },
  {
    path: "/user/myRecipes",
    name: "myRecipes",
    component: () => import("./pages/myRecipesViewPage"),
  },
 // {
    //path: "",
    //name:"",
   // component: ,

  //},
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  }
];

export default routes;
