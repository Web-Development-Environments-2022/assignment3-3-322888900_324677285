import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  //{//after log in page
    //path: "/myPage",
    //name: "myPage",
   // component: () => import("./pages/myPage"),
 // },
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
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/user/favorites",
    name: "favorites",
    component: () => import("./pages/favoritesViewPage"),
  },
  {
    path: "/user/family",
    name: "family",
    component: () => import("./pages/familyViewPage"),
  },
  {
    path: "/user/myRecipes",
    name: "myRecipes",
    component: () => import("./pages/myRecipesViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
