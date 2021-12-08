import Vue from "vue";
import Vuex from "vuex";
// MODULES
import { restaurants } from "./modules/restaurants";
import { user } from "./modules/user";
import { cart } from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    restaurants,
    user,
    cart,
  },
});
