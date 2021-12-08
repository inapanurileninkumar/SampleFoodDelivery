@<template>
  <div
    class="flex-row navbar justify-content-center"
  >
    <div
    class="flex-col-10"
    >
      <div
        class="flex-row align-items-center justify-content-space-between"
      >
        <div class="flex-col-2">
          <div
            class="logo-container flex-row  pointer-cursor align-items-center justify-content-start"
            @click="routeToHome"
          >
            <logo/>
            <b
              class="pl-10 text-warning"
            >
              SWIGGY
            </b>
          </div>
        </div>
        <div
          class="flex-col-10"
        >
          <div
            class="flex-row align-items-center justify-content-end"
          >
            <i 
              v-if="isInRestaurantsPage"
              class="fas fa-search text-secondary-lite hover-text-secondary pointer-cursor"
              @click="handleActivateSearch"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "./logo.vue";
import { eventMixin } from "../../mixins/utils/eventMixin";
export default {
  components: { logo, },
  mixins: [eventMixin],
  name: "Navbar",
  data: function () {
    return {};
  },
  computed: {
    isInRestaurantsPage: function () {
      return this.$route["name"] === "Home";
    }
  },
  methods: {
    handleActivateSearch: function () {
      this.emitGlobalEvent("activateRestaurantSearch");
    },
    routeToHome: function () {
      this.routeTo("Home");
    },
  }
};
</script>

<style lang="scss" scoped>
  .navbar, .logo-container{
    min-height: 80px;
    max-height: 80px;
  }
  .navbar{
    // -webkit-box-shadow: 0 4px 6px -6px rgb(75, 75, 75);
    // -moz-box-shadow: 0 4px 6px -6px rgb(75, 75, 75);
    // box-shadow: 0 4px 6px -6px rgb(75, 75, 75);
    border-bottom: 1px solid lightgray;
  }
</style>
