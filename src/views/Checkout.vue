<template>
    <div
      class="pt-30 flex-row align-items-start justify-content-center checkout-container max-allowed-container-navbar"
    >
      <div
        v-if="cartItems.length"
        class="flex-col-10"
      >
        <div class="flex-row">
          <div class="flex-col-8">
            <p>hello world</p>
          </div>
          <div 
            class="flex-col-4"
          >
            <div 
              class="ph-30 pv-15 bg-white"
            >
              <div
                class="flex-row restaurant-header-section"
              >
                <div 
                  class="flex-col-2"
                >
                <!-- restaurant image -->
                </div>
                <div 
                  class="flex-col-10"
                >
                  <div
                    class="ellipsis-word text-bold"
                  >
                    <span>
                      {{ getCartRestaurantData["label"] }}
                    </span>
                  </div>
                  <span>
                    {{ getCartRestaurantData["location"] }}
                  </span>
                </div>
                <div>
                </div>
              </div>
              <div
                :style="{'max-height':cartItemsMaxHeight+'px'}"
                class="overflow-y-auto overflow-x-hidden"
              >
                <cart-items />
              </div>
              <div
                class="mt-20 bill-amount-section"
                style="font-size:9pt;"
              >
                <div
                  class="title-text text-bold" 
                >
                  <span>
                    Bill Details
                  </span>
                </div>
                <div
                  class="text-secondary mt-10 flex-row align-items-center justify-content-space-between"
                >
                  <span>
                    Item Total
                  </span>
                  <span>
                    <i class="fas fa-rupee" />
                    {{ getSubTotal }}
                  </span>
                </div>
                <div
                  class="text-secondary mt-10 flex-row align-items-center justify-content-space-between"
                >
                  <span>
                    Delivery Fee : {{ (getCartRestaurantData['distance']/1000).toFixed(2) }} kms
                  </span>
                  <span>
                    <i class="fas fa-rupee" />
                    {{ getDistanceFee }}
                  </span>
                </div>
                <div
                  class="text-secondary pt-15 mt-20 flex-row align-items-center justify-content-space-between"
                  style="border-top:1px solid lightgray;"
                >
                  <span>
                    Taxes & Charges
                  </span>
                  <span>
                    <i class="fas fa-rupee" />
                    {{ getRestaurantCharges }}
                  </span>
                </div>
                <div class="mt-20 bordered-secondary-dark"/>
                <div
                  class="flex-row text-bold pt-10 align-items-center justify-content-space-between"
                  style="font-size:11pt;"
                >
                  <span>
                    TO PAY
                  </span>
                  <span>
                    {{ getTotalBillAmount }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>        
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import CartItems from "../components/utils/CartItems.vue";
export default {
  components: { CartItems },
  name: "Checkout",
  data: function () {
    return {
      cartItemsMaxHeight: 0,
    };
  },
  computed: {
    ...mapGetters({
      cartItems: "cart/getCartItems",
      cartRestaurant: "cart/getCartRestaurant",
      availableRestaurants: "restaurants/getRestaurants"
    }),
    getCartRestaurantData: function () {
      return this.availableRestaurants.find(restaurant => restaurant["uuid"] === this.cartRestaurant);
    },
    getSubTotal: function () {
      return this.cartItems.map(item => item["price"] * item["count"]).reduce((a, b) => b + a);
    },
    getDistanceFee: function () {
      return (this.getCartRestaurantData["distance"] * 0.025).toFixed(2);
    },
    getRestaurantCharges: function () {
      return 10;
    },
    getTotalBillAmount: function () {
      return parseFloat(this.getSubTotal) + parseFloat(this.getDistanceFee) + parseFloat(this.getRestaurantCharges);
    },
  },
  watch: {
    cartItems: function () {
      this.calculateCartItemsMaxHeight();
    }
  },
  mounted: function () {
    this.calculateCartItemsMaxHeight();
    window.addEventListener("resize", this.calculateCartItemsMaxHeight);
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.calculateCartItemsMaxHeight);
  },
  methods: {
    calculateCartItemsMaxHeight: function () {
      let heightToSubtrack = 85 + 100;
      let elementsToRemoveHeight = [
        "bill-amount-section", "restaurant-header-section"
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
<style scoped lang="scss">
  .checkout-container{
    background:#e9ecee;
  }
</style>
