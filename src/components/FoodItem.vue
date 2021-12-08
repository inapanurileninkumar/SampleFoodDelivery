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
                <food-item-icon
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
                class="mt-15"
            >
                <food-item-icon
                    v-if="mode==='cart'"
                    :isVegetarian="isVegetarian"
                />
                <span
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
                                 @click.stop="emitEvent('reduce-count',foodItem)"
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
    </div>
</template>

<script>
import { eventMixin } from "../mixins/utils/eventMixin";
import { mapGetters } from "vuex";
import FoodItemIcon from "./FoodItemIcon.vue";
export default {
  components: { FoodItemIcon },
  name: "FoodItem",
  mixins: [eventMixin],
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
    return {};
  },
  computed: {
    ...(mapGetters({
      cartItems: "cart/getCartItems"
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
    handleItemCountClick: function () {
      if (!this.itemInCart) {
        this.emitEvent("add-item", this.foodItem);
      }
    },
    increaseItemCount: function () {
      this.emitEvent("add-item", this.foodItem);
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
