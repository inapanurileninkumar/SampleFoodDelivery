<template>
    <div
        :class="mode==='regular'?'pv-30':'pv-5'"
        class="flex-row"
        style="border-bottom:1px solid lightgray;"
    >
        <div
            class="flex-col-9"
        >   
            <div
                v-if="mode==='regular'"
                class="flex-row align-items-center"
            >
                <FoodItemIcon
                    :isVegetarian="isVegetarian"
                />
                <template
                    v-if="foodItem['isBestSeller']"
                >
                    <i class="fas fa-star ml-10 mt--3 text-warning" style="font-size:9pt;" />
                    <span style="font-size:10pt;" class="text-warning text-bold ml-5">Bestseller</span>
                </template>
            </div>
            <div
                class="mt-15 flex-row align-items-center"
            >
                <FoodItemIcon
                    v-if="mode==='cart'"
                    :isVegetarian="isVegetarian"
                    class="mt--5"
                />
                <span
                    :class="[mode==='cart'?'ml-5':'']"
                    class="text-bold text-title"
                >
                    {{ foodItem['label'] }}
                </span>
            </div>
            <div
                class="mt-20"
            >
                <span
                    class="text-secondary-dark"
                >
                    <i class="fas fa-rupee-sign" />
                    {{ getFoodItemPrice }}
                </span>
            </div>
            <div
                v-if="mode==='regular'"
                class="mt-20"
                style="word-wrap:break-word;"
            >
                <span
                    class="text-secondary"
                    style="font-size:9pt"
                >
                    {{ foodItem['description'] }}
                </span>
            </div>
        </div>
        <div
            class="flex-col-3 flex-row align-items-center"
        >
            <div
                class="flex-row align-items-center"
            >
                <div
                    class="text-bold pointer-cursor"
                >
                    <div
                        :class="[itemInCart?'ph-10':'ph-15']"
                        class="bordered-secondary-lite flex-row align-items-center justify-content-center pv-7"
                        @click="handleItemCountClick"
                    >
                        <template
                            v-if="itemInCart"
                        >
                            <span
                                 @click.stop="reduceFoodItemCount(foodItem)"
                                 class="text-secondary"
                            >
                                <i class="fas fa-minus" />
                            </span>
                            <span
                                class="ml-10 text-success"
                            >
                                {{ itemInCart['count'] }}
                            </span>
                            <span
                                class="ml-10 text-success"
                                @click="increaseItemCount"
                            >
                                <i class="fas fa-plus" />
                            </span>
                        </template>
                        <template
                            v-else
                        >
                            <span
                                class="text-success"
                            >
                                ADD
                            </span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    <Dialog
            v-if="isDialogActive"
            :config="activeDialogConfig"
            @action="handleDialogAction"
            @close="closeDialog"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FoodItemIcon from "./FoodItemIcon.vue";
import Dialog from "./utils/Dialog.vue";
export default {
  components: { FoodItemIcon, Dialog },
  name: "FoodItem",
  props: {
    foodItem: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: "regular"
    }
  },
  data: function () {
    return {
      // DIALOG
      isDialogActive: false,
      activeDialogConfig: {},
      dialogConfigData: {},
      dialogConfigs: { 
        replaceCartItems: {
          message: "Items from another restaurant are in cart. you want to replace the items?",
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
    };
  },
  computed: {
    ...(mapGetters({
      availableRestaurants: "restaurants/getRestaurants",
      cartItems: "cart/getCartItems",
      cartRestaurant: "cart/getCartRestaurant"
    })),
    itemInCart: function () {
      return this.cartItems.find(cartItem => cartItem["item_uuid"] === this.foodItem["uuid"]);
    },
    isVegetarian: function () {
      return this.foodItem["vegetarian"];
    },
    getFoodItemPrice: function () {
      if (this.mode === "regular") {
        return this.foodItem["price"];
      } else if (this.mode === "cart") {
        return this.foodItem["price"] * this.itemInCart["count"];
      }
      return "";
    }
  },
  methods: {
    ...(mapActions({
      resetCart: "cart/resetCart",
      setCartRestaurant: "cart/setCartRestaurant",
      addFoodItem: "cart/addFoodItem",
      reduceFoodItemCount: "cart/reduceFoodItemCount",
    })),
    handleItemCountClick: function () {
      if (!this.itemInCart) {
        this.handleAddFoodItem();
      }
    },
    increaseItemCount: function () {
      this.handleAddFoodItem();
    },
    // EVENT HANDLERS
    handleAddFoodItem: function () {
      let foodItem = this.foodItem;
      if ((!this.cartRestaurant) || (this.cartRestaurant === foodItem["restaurant"])) {
        this.setCartRestaurant(foodItem["restaurant"]);
        this.addFoodItem(foodItem);
      } else {
        this.openDialog(this.dialogConfigs["replaceCartItems"], foodItem);
      }
    },
    handleReplaceCartItems: function (foodItem) {
      this.resetCart();
      this.setCartRestaurant(foodItem["restaurant"]);
      this.addFoodItem(foodItem);
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

<style lang="scss" scoped>
    .add-item{
        transition: box-shadow 0.25s ease-in-out;
        font-size:10pt;

        &:hover{
            box-shadow: 0px 5px 5px #d8d8d8;
        }
    }
</style>
