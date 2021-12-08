<template>
<div>
    <food-item
        v-for="(cartItem,cartItemIndex) in cartItemss"
        :key="cartItem['uuid']+'_'+cartItemIndex"
        :food-item="getFoodItemFromCartItem(cartItem)"
        @event-emitted="emitEvent"
        mode="cart"
    />
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { eventMixin } from "../../mixins/utils/eventMixin";
import FoodItem from "../FoodItem.vue";

export default {
  name: "CartItems",
  mixins: [eventMixin],
  components: { FoodItem },
  computed: {
    ...(mapGetters({
      cartItemss: "cart/getCartItems",
      availableRestaurants: "restaurants/getRestaurants",
      cartRestaurant: "cart/getCartRestaurant"
    })),
    cartItems: function () {
      return [];
    }
  },
  methods: {
    getFoodItemFromCartItem: function (cartItem) {
      let restaurant = this.availableRestaurants.find(restaurant => restaurant["uuid"] === this.cartRestaurant);
      return restaurant["categories"].map(category => category["items"]).flat().find(item => item["uuid"] === cartItem["item_uuid"]);
    },
  }
};
</script>

<style scoped lang="scss">
</style>
