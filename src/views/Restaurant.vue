@<template>
  <div
    class="flex-row justify-content-center pb-30"
  >
    <div class="flex-col-10">
      <div 
        v-if="restaurant"
        class="flex-row"
      >
        <div
          class="flex-col-3 pr-15 pt-20 max-allowed-container-navbar overflow-y-auto"
        >
          <div 
            v-for="(category,categoryIndex) in restaurantCategories"
            :key="category['uuid']+'_'+categoryIndex"
            class="flex-row justify-content-end"
          >
            <span
              :class="[activeCategory===category['uuid']?'text-warning':'']"
              class="mt-20 pr-10 text-capitalized text-bold pointer-cursor"
              @click="bringCategoryIntoView(category)"
            >
              {{ category['label'] }}
            </span>
          </div>
        </div>
        <div
          class="flex-col-5 ph-30 max-allowed-container-navbar overflow-y-auto food-items-container"
          style="border-left:1px solid lightgray;"
        >
          <div>
            <template
              v-for="(category) in restaurantCategories"
            >
              <div
                :key="category['uuid']"
                :data-category="category['uuid']"
                class="category-container mt-30"  
              >
                <div
                  class="text-bold title text-capitalized"
                >
                  {{ category['label'] }}

                </div>
                <div
                  class="text-bold text-secondary mt-5"
                >
                  {{ category['items'].length }} ITEMS

                </div>
                <div
                  class="mt-10"
                >
                  <template
                    v-for="(foodItem, foodItemIndex) in category['items']"
                  >
                    <div
                      :key="foodItem['uuid']+'_'+foodItemIndex"
                    >
                    <food-item
                      :food-item="foodItem"
                    /> 
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
          class="flex-col-3 ptl-30"
        >
          <template
            v-if="cartItems.length"
          >
            <div
              class="cart-title-container"
            >
              <div
                class="text-bold"
                style="font-size:20pt;"
              >
                <span>Cart</span>
              </div>
              <div
                class="ml-3"
                style="font-size:10pt;"
              >
                <span
                  class="text-secondary"
                >
                  {{ cartItems.length }} ITEMS
                </span>
                <template
                  v-if="currentRestaurant!==cartRestaurant"
                >
                  <div>
                    from 
                    <span
                      class="text-bold pointer-cursor text-info"
                      @click="goToCartRestaurant"
                    >
                      {{ cartRestaurantData["label"] }}
                    </span>
                  </div>
                </template>
              </div>
            </div>
            <div
              :style="{'max-height':cartItemsMaxHeight+'px'}"
              class="overflow-y-auto overflow-x-hidden"
            >
              <cart-items 
                :restaurant="restaurant"
              />
            </div>
            <div
              class="cart-sum-container mt-5 bord="
              style="border-top:2px solid black;"
            >
              <div
                class="mt-10 flex-row align-items-center justify-content-space-between"
              >
                <span
                  class="text-bold"
                  style="font-size: 14pt;"
                >
                  Subtotal
                </span>
                <span
                  class="text-bold"
                >
                  <i class="fas fa-rupee-sign" />
                  {{ getSubTotal }}
                </span>
              </div>
              <div
                class="mt-20 pv-15 text-white bg-success-dark pointer-cursor flex-row align-items-center justify-content-center"
                @click="handleCheckoutRequest"
              >
                <span>
                  CHECKOUT
                  <span class="fas fa-arrow-right" />
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FoodItem from "../components/FoodItem.vue";
import CartItems from "../components/utils/CartItems.vue";
export default {
  name: "Restaurant",
  components: { FoodItem, CartItems },
  props: {
    restaurantId: {
      type: [Number, String],
      default: null
    }
  },
  data: function () {
    return {
      restaurant: null,
      cartItemsMaxHeight: 0,
      // INTERSECTION OBSERVER
      intersectionObserver: null,
      // ACTIVE CATEGORY
      activeCategory: null,
    };
  },
  computed: {
    ...(mapGetters({
      availableRestaurants: "restaurants/getRestaurants",
      cartItems: "cart/getCartItems",
      cartRestaurant: "cart/getCartRestaurant"
    })),
    currentRestaurant: function () {
      return this.$route["params"]["restaurantId"];
    },
    cartRestaurantData: function () {
      return this.availableRestaurants.find(restaurant => restaurant["uuid"] === this.cartRestaurant);
    },
    restaurantCategories: function () {
      if (!this.restaurant) return [];
      let categories = [{
        label: "Recommended",
        uuid: this.getUUID(),
        items: this.restaurant["menu"]["recommended"]
      }];
      categories = categories.concat(this.restaurant["categories"]);
      return categories;
    },
    getSubTotal: function () {
      return this.cartItems.map(item => item["price"] * item["count"]).reduce((a, b) => b + a);
    }
  },
  watch: {  
    restaurantId: function () {
      this.setupRestaurant();
    },
    cartItems: function () {
      this.calculateCartItemsMaxHeight();
    }
  },
  beforeMount: function () {
    this.setupRestaurant();
  },
  mounted: function () {
    this.setupScrollListeners();
  },
  beforeDestroy: function () {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    window.removeEventListener("resize", this.calculateCartItemsMaxHeight);
  },
  methods: {
    setupScrollListeners: function () {
      if (!this.restaurant) return;
      this.calculateCartItemsMaxHeight();
      window.addEventListener("resize", this.calculateCartItemsMaxHeight);
      this.intersectionObserver = new IntersectionObserver(entries => {
        if ((entries[0].isIntersecting)) {
          this.activeCategory = entries[0].target.dataset.category;
        }
      }, { threshold: [0] });
      const boxElList = document.querySelectorAll(".category-container");
      boxElList.forEach((el) => {
        this.intersectionObserver.observe(el);
      });
      this.activeCategory = this.restaurantCategories[0]["uuid"];
    },
    bringCategoryIntoView: function (category) {
      let categoryContainer = Array.from(document.getElementsByClassName("category-container")).find(categoryContainer => {
        return categoryContainer.dataset["category"] === category["uuid"];
      });
      let foodItemsContainer = document.getElementsByClassName("food-items-container")[0];
      if (categoryContainer && foodItemsContainer) {
        foodItemsContainer.scrollTop = categoryContainer.offsetTop - 100;
        this.activeCategory = category["uuid"];
      }
    },
    setupRestaurant: function () {
      this.restaurant = this.availableRestaurants.find(restaurant => restaurant["uuid"] === this.restaurantId);
      if (!this.restaurant) {
        this.routeTo("Home");
      }
    },
    getFoodItemFromCartItem: function (cartItem) {
      return this.restaurant["categories"].map(category => category["items"]).flat().find(item => item["uuid"] === cartItem["item_uuid"]);
    },
    handleCheckoutRequest: function () {
      this.routeTo("Checkout");
    },
    goToCartRestaurant: function () {
      this.routeTo("Restaurant", { restaurantId: this.cartRestaurant });
    },
    calculateCartItemsMaxHeight: function () {
      let heightToSubtrack = 85 + 40;
      let elementsToRemoveHeight = [
        "cart-sum-container", "cart-title-container"
      ];
      elementsToRemoveHeight.forEach(elementToRemoveHeight => {
        let element = document.getElementsByClassName(elementToRemoveHeight);
        if (element.length > 0)element = element[0];
        heightToSubtrack += element.offsetHeight;
      });
      this.cartItemsMaxHeight = window.innerHeight - heightToSubtrack;
    },
  }
};
</script>
