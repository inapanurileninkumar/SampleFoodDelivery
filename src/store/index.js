import Vue from "vue";
import Vuex from "vuex";
// MODULES
import { restaurants } from "./modules/restaurants";
import { user } from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    restaurants,
    user,
  },
});
