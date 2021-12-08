import Vue from "vue";
import VueRouter from "vue-router";

// ROUTE COMPONENTS
import Restaurants from "../components/Restaurants";
import Restaurant from "../views/Restaurant";
import Checkout from "../views/Checkout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Restaurants,
  },
  {
    path: "/restaurant/:restaurantId",
    name: "Restaurant",
    component: Restaurant,
    props: true,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    props: true,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
