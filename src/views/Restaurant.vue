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
          class="flex-col-3 max-allowed-container-navbar overflow-y-auto"
        >
          <div 
            v-for="(category,categoryIndex) in restaurantCategories"
            :key="category['uuid']+'_'+categoryIndex"
            class="flex-row justify-content-end"
          >
            <span
              class="mt-10 pr-10 text-capitalized text-bold"
            >
              {{ category['label'] }}
            </span>
          </div>
        </div>
        <div
          class="flex-col-5 ph-30 max-allowed-container-navbar overflow-y-auto"
          style="border-left:1px solid lightgray;"
        >
          <div>
            <template
              v-for="(category) in restaurantCategories"
            >
              <div
                :key="category['uuid']"
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
                      @event-emitted="handleFoodItemEvent"
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
                @event-emitted="handleFoodItemEvent"
              />
            </div>
            <div
              class="cart-sum-container mt-5"
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
    <Dialog
      v-if="isDialogActive"
      :config="activeDialogConfig"
      @action="handleDialogAction"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FoodItem from "../components/FoodItem.vue";
import CartItems from "../components/utils/CartItems.vue";
import Dialog from "../components/utils/Dialog.vue";
export default {
  name: "Restaurant",
  components: { FoodItem, Dialog, CartItems },
  props: {
    restaurantId: {
      type: [Number, String],
      default: null
    }
  },
  data: function () {
    return {
      restaurant: null,
      // DIALOG
      isDialogActive: false,
      activeDialogConfig: {},
      dialogConfigData: {},
      dialogConfigs: { 
        replaceCartItems: {
          message: "Items from another restaurant are already in cart. you want to replace the items?",
          actions: [
            {
              text: "Cancel",
              action: "cancelCartItemReplace",
              class: "text-secondary"
            },
            {
              text: "Confirm",
              action: "confirmCartItemReplace",
              class: "text-success bordered-success-2"
            }
          ]
        }
      },
      cartItemsMaxHeight: 0,
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
    this.calculateCartItemsMaxHeight();
    window.addEventListener("resize", this.calculateCartItemsMaxHeight);
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.calculateCartItemsMaxHeight);
  },
  methods: {
    ...(mapActions({
      resetCart: "cart/resetCart",
      setCartRestaurant: "cart/setCartRestaurant",
      addFoodItem: "cart/addFoodItem",
      reduceFoodItemCount: "cart/reduceFoodItemCount",
    })),
    setupRestaurant: function () {
      this.restaurant = this.availableRestaurants.find(restaurant => restaurant["uuid"] === this.restaurantId);
      if (!this.restaurant) {
        this.routeTo("Home");
      }
    },
    getFoodItemFromCartItem: function (cartItem) {
      return this.restaurant["categories"].map(category => category["items"]).flat().find(item => item["uuid"] === cartItem["item_uuid"]);
    },
    handleFoodItemEvent: function (action, payload) {
      let actionHandlers = {
        "add-item": this.handleAddFoodItem,
        "reduce-count": this.reduceFoodItemCount,
      };
      if (actionHandlers[action]) {
        actionHandlers[action](payload);
      }
    },
    handleAddFoodItem: function (foodItem) {
      if ((!this.cartRestaurant) || (this.cartRestaurant === foodItem["restaurant"])) {
        this.setCartRestaurant(foodItem["restaurant"]);
        this.addFoodItem(foodItem);
      } else {
        this.openDialog(this.dialogConfigs["replaceCartItems"], foodItem);
        // HANDLE RESTAURANT MISMATCH
      }
    },
    handleReplaceCartItems: function (foodItem) {
      this.resetCart();
      this.setCartRestaurant(foodItem["restaurant"]);
      this.addFoodItem(foodItem);
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
    // DIALOG METHODS
    openDialog: function (config, data) {
      this.activeDialogConfig = config;
      this.dialogConfigData = data;
      this.isDialogActive = true;
    },
    closeDialog: function () {
      this.isDialogActive = false;
    },
    handleDialogAction: function (option) {
      let actionHandlers = {
        confirmCartItemReplace: this.handleReplaceCartItems,
        cancelCartItemReplace: this.closeDialog,
      };
      this.closeDialog();
      if (actionHandlers[option["action"]]) {
        actionHandlers[option["action"]](this.dialogConfigData);
      }
    }
  }
};
</script>
