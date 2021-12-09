<template>
  <div
    class="flex-row justify-content-center pt-30 max-allowed-container-navbar overflow-y-auto thinScrollbar"
  >
    <div class="flex-col-10">
      <div
        class="ph-10 pv-10 restaurants-header flex-row align-items-center justify-content-space-between"
      >
        <div class="restaurant-count text-bold">
          {{ availableRestaurants.length }} Restaurants
        </div>
        <div>
          <span
            v-for="(sortingType, sortingTypeIndex) in sortingTypes"
            :key="sortingType['sortBy'] + '_' + sortingTypeIndex"
            :class="[
              isActiveSorting(sortingType['sortBy'])
                ? 'active text-secondary-dark'
                : '',
            ]"
            class="ph-10 pointer-cursor sorting-type text-secondary hover-text-secondary-dark pv-15"
            @click="sortBy = sortingType['sortBy']"
          >
            {{ sortingType["label"] }}
          </span>
        </div>
      </div>
      <div v-if="isSearchActive" class="pv-20 flex-row justify-content-end">
        <div class="flex-col-6 pr-20 restaurant-search bordered-secondary-lite">
          <div class="flex-row align-items-center">
            <input
              ref="restaurantSearch"
              v-model="restaurantSearchKeyword"
              type="text"
              style="font-size: 15pt"
              placeholder="Search Restaurants"
              class="search-input text-warning text-bold pv-10 ph-20"
              @keyup.esc="closeRestaurantSearch"
            />
            <span
              class="pointer-cursor search-close text-secondary-lite hover-text-secondary"
              title="close"
              @click="closeRestaurantSearch"
            >
              X
            </span>
          </div>
        </div>
      </div>
      <div class="flex-row wrap mt-10">
        <div
          v-for="(restaurant, restaurantIndex) in filteredRestaurants"
          :key="restaurant['uuid'] + '_' + restaurantIndex"
          class="flex-col-3"
        >
          <div class="p-10">
            <restaurant
              :restaurant="restaurant"
              @click.native="goToRestaurant(restaurant)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Restaurant from "./RestaurantInfo.vue";
import { eventMixin } from "../mixins/utils/eventMixin";
export default {
  name: "Restaurants",
  components: { Restaurant },
  mixins: [eventMixin],
  data: function () {
    return {
      sortBy: null,
      sortingTypes: [
        {
          label: "Relavance",
          sortBy: "relavant",
        },
        {
          label: "Delivery Time",
          sortBy: "deliveryTime",
        },
        {
          label: "Rating",
          sortBy: "rating",
        },
        {
          label: "Cost: Low to High",
          sortBy: "costLowHigh",
        },
        {
          label: "Cost: Hight to Low",
          sortBy: "costHighLow",
        },
      ],
      // SEARCHING
      isSearchActive: false,
      restaurantSearchKeyword: null,
    };
  },
  computed: {
    ...mapGetters({
      availableRestaurants: "restaurants/getRestaurants",
    }),
    filteredRestaurants: function () {
      let searchKeyword = (this.restaurantSearchKeyword || "").toLowerCase();
      let restaurants = this.availableRestaurants.filter((restaurant) => {
        return restaurant["label"].toLowerCase().includes(searchKeyword);
      });
      restaurants.sort((a, b) => {
        if (this.sortBy && this.sortBy !== "relavant") {
          if (this.sortBy === "deliveryTime") {
            return a["deliveryTime"] - b["deliveryTime"];
          } else if (this.sortBy === "rating") {
            return (
              Number.parseFloat(b["rating"]) - Number.parseFloat(a["rating"])
            );
          } else if (this.sortBy === "costHighLow") {
            return b["cost"]["price"] - a["cost"]["price"];
          } else if (this.sortBy === "costLowHigh") {
            return a["cost"]["price"] - b["cost"]["price"];
          }
        }
        return 1;
      });
      return restaurants;
    },
  },
  beforeMount: function () {
    this.setGlobalEventListeners(true);
  },
  beforeDestroy: function () {
    this.setGlobalEventListeners(false);
  },
  methods: {
    isActiveSorting: function (sortBy) {
      return (!this.sortBy && sortBy === "relavant") || this.sortBy === sortBy;
    },
    handleOpenSearchEvent: function () {
      this.activateRestaurantSearch();
    },
    activateRestaurantSearch: function () {
      this.restaurantSearchKeyword = "";
      this.isSearchActive = true;
      this.$nextTick(() => {
        this.$refs["restaurantSearch"].focus();
      });
    },
    closeRestaurantSearch: function () {
      this.isSearchActive = false;
      this.restaurantSearchKeyword = "";
    },
    goToRestaurant: function (restaurant) {
      this.routeTo("Restaurant", { restaurantId: restaurant["uuid"] });
    },
    setGlobalEventListeners: function (set) {
      let eventListeners = {
        activateRestaurantSearch: this.handleOpenSearchEvent,
      };
      if (set) {
        this.addGlobalEventListeners(eventListeners);
      } else {
        this.removeGlobalEventListeners(eventListeners);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.restaurants-header {
  border-bottom: 1px solid lightgray;

  .restaurant-count {
    font-size: 20pt;
  }

  .sorting-type {
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease-in-out;

    &.active {
      border-bottom: 2px solid red;
    }
  }
}
.restaurant-search {
  .search-input {
    outline: none;
    border: none;
    width: 100%;
    letter-spacing: 1px;

    &::placeholder {
      color: lightgray;
    }
  }
}
</style>
