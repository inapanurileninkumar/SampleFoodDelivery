<template>
  <div id="app">
    <div
      class="flex-row justify-content-center"
    >
      <div
        class="flex-col-12"
      >
        <nav-bar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./components/utils/NavBar.vue";
import { restaurantModel } from "./models/restaurantModel";
import { addressModel } from "./models/addressModel";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { NavBar, },
  mixins: [restaurantModel, addressModel],
  computed: {
    ...(mapGetters({
      getRestaurants: "restaurants/getRestaurants",
    })),
  },
  beforeMount: function () {
    this.setupApp();
  },
  methods: {
    ...(mapActions({
      addRestaurant: "restaurants/addRestaurant",
      addAddress: "user/addAddress"
    })),
    setupApp: function () {
      if (this.getRestaurants.length) return;
      let numberOfRestaurants = this.getRandomNumber(30, 50);
      for (let i = 0; i < numberOfRestaurants; i++) {
        this.addRestaurant(this.getRandomRestaurant());
      }
      let numberOfAddresses = this.getRandomNumber(2, 5);
      for (let i = 0; i < numberOfAddresses; i++) {
        this.addAddress(this.getRandomAddress());
      }
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
