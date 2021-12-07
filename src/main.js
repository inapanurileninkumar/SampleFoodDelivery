import Vue from "vue";
import App from "./App.vue";
// IMPORTING ROUTER
import router from "./router";
// IMPORT STORE
import store from "./store";

// IMPORTING ALL GLOBAL STYLES
import "./assets/main.scss";

import { globalMixin } from "./mixins/globalMixin";
Vue.config.productionTip = false;

Vue.mixin(globalMixin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
