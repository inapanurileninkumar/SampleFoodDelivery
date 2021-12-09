<template>
  <div
    class="pt-30 flex-row align-items-start justify-content-center checkout-container max-allowed-container-navbar"
  >
    <div v-if="cartItems.length" class="flex-col-10">
      <div class="flex-row">
        <div class="flex-col-8 pr-50">
          <div
            class="max-allowed-container-checkout-billing border-radius-5 overflow-y-auto invisibleScrollbar pr-5"
          >
            <!-- Address selector -->
            <div class="checkout-billing-section bg-white p-50">
              <h2>
                <span>
                  <i class="fas fa-map-marker-alt text-success-dark" />
                </span>
                <span>
                  {{
                    selectedAddress
                      ? "Delivery Address"
                      : "Choose A Delivery Address"
                  }}
                </span>
              </h2>
              <template v-if="selectedAddress">
                <div class="flex-row">
                  <div class="flex-col-8">
                    <Address
                      :address="
                        userAddresses.find(
                          (userAddress) =>
                            userAddress['uuid'] === selectedAddress
                        )
                      "
                    />
                  </div>
                  <div class="flex-col-4">
                    <div
                      class="flex-row align-items-end justify-content-end"
                      style="height: 100%"
                    >
                      <span
                        class="ph-20 pv-10 bg-warning text-white pointer-cursor border-radius-2"
                        @click="selectedAddress = null"
                      >
                        <i class="fas fa-pencil-alt" />
                        CHANGE
                      </span>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <span class="text-secondary">Select a location to deliver</span>
                <div class="flex-row wrap justify-content-space-between">
                  <div
                    v-for="(userAddress, userAddressIndex) in userAddresses"
                    :key="userAddress['uuid'] + '_' + userAddressIndex"
                    class="flex-col-6"
                  >
                    <div class="pv-20 pr-30">
                      <Address
                        :address="userAddress"
                        class="bordered-secondary-lite pointer-cursor border-radius-3 address-container"
                        style="height: 200px"
                        mode="checkout"
                        @click.native="selectedAddress = userAddress['uuid']"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <!-- Payment Section -->
            <div class="checkout-billing-section bg-white p-50 mt-20">
              <h2>
                <span>
                  <i class="fas fa-wallet text-success-dark" />
                </span>
                Payment Method
              </h2>
              <template v-if="selectedAddress">
                <span class="text-secondary">Select a payment method</span>
                <div class="flex-row mt-20">
                  <div
                    class="flex-col-4 bg-info-lite pvl-20 paymet-type-container"
                  >
                    <div
                      v-for="(paymentType, paymentTypeIndex) in paymentTypes"
                      :key="paymentType['name'] + '_' + paymentTypeIndex"
                      :class="[
                        activePaymentType === paymentType['name']
                          ? 'bg-white text-bold'
                          : 'text-white',
                      ]"
                      class="text-title pv-20 ph-10 pointer-cursor"
                      style="font-size: 14pt; letter-spacing: 1px"
                      @click="activePaymentType = paymentType['name']"
                    >
                      <i :class="paymentType['icon']" />
                      <span class="ml-10">
                        {{ paymentType["label"] }}
                      </span>
                    </div>
                  </div>
                  <div
                    class="flex-col-8 bordered-success pvl-20 bordered-secondary-lite overflow-y-auto thinScrollbar"
                    :style="{ 'max-height': paymentModeContainerHeight + 'px' }"
                    style="border-left: none"
                  ></div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="flex-col-4">
          <div class="ph-30 pv-15 bg-white">
            <div
              class="flex-row restaurant-header-section pointer-cursor hover-text-info"
              @click="routeTo('Restaurant', { restaurantId: cartRestaurant })"
            >
              <div class="flex-col-2">
                <!-- restaurant image -->
                <img
                  style="height: 50px; width: 50px"
                  class="border-radius-5"
                  :src="getMediaImage(getCartRestaurantData['image'])"
                />
              </div>
              <div class="flex-col-10">
                <div class="ellipsis-word text-bold">
                  <span>
                    {{ getCartRestaurantData["label"] }}
                  </span>
                </div>
                <span>
                  {{ getCartRestaurantData["location"] }}
                </span>
              </div>
              <div></div>
            </div>
            <div
              :style="{ 'max-height': cartItemsMaxHeight + 'px' }"
              class="overflow-y-auto overflow-x-hidden invisibleScrollbar"
            >
              <cart-items />
            </div>
            <div class="mt-20 bill-amount-section" style="font-size: 9pt">
              <div class="text-title text-bold">
                <span> Bill Details </span>
              </div>
              <div
                class="text-secondary mt-10 flex-row align-items-center justify-content-space-between"
              >
                <span> Item Total </span>
                <span>
                  <i class="fas fa-rupee" />
                  {{ getSubTotal }}
                </span>
              </div>
              <div
                class="text-secondary mt-10 flex-row align-items-center justify-content-space-between"
              >
                <span>
                  Delivery Fee :
                  {{ (getCartRestaurantData["distance"] / 1000).toFixed(2) }}
                  kms
                </span>
                <span>
                  <i class="fas fa-rupee" />
                  {{ getDistanceFee }}
                </span>
              </div>
              <div
                class="text-secondary pt-15 mt-20 flex-row align-items-center justify-content-space-between"
                style="border-top: 1px solid lightgray"
              >
                <span> Taxes & Charges </span>
                <span>
                  <i class="fas fa-rupee" />
                  {{ getRestaurantCharges }}
                </span>
              </div>
              <div class="mt-20 bordered-secondary-dark" />
              <div
                class="flex-row text-bold pt-10 align-items-center justify-content-space-between"
                style="font-size: 11pt"
              >
                <span> TO PAY </span>
                <span>
                  {{ getTotalBillAmount }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="max-allowed-container-checkout-billing flex-row align-items-center justify-content-center"
      style="width: 100%"
    >
      <div style="text-align: center">
        <h1>Cart is empty</h1>
        <p style="font-size: 12pt">
          go to <a href="../" class="text-info">restaurants page</a> to order
          food.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Address from "../components/Address.vue";
import CartItems from "../components/utils/CartItems.vue";
export default {
  components: { CartItems, Address },
  name: "Checkout",
  data: function () {
    return {
      cartItemsMaxHeight: 0,
      selectedAddress: null,
      activePaymentType: "wallet",
      // SAMPLE PAYMENT TYPES
      paymentTypes: [
        {
          name: "wallet",
          label: "Wallets",
          icon: "fas fa-wallet",
        },
        {
          name: "card",
          label: "Credit/Debit Cards",
          icon: "far fa-credit-card",
        },
        {
          name: "upi",
          label: "UPI",
          icon: "fab fa-google-pay",
        },
        {
          name: "netbanking",
          label: "Net Banking",
          icon: "fas fa-university",
        },
        {
          name: "foodcard",
          label: "Food Cards",
          icon: "fas fa-money-check-alt",
        },
        {
          name: "cod",
          label: "Pay on Delivery",
          icon: "fas fa-money-bill-alt",
        },
      ],
      // DOM
      paymentModeContainerHeight: 0,
    };
  },
  computed: {
    ...mapGetters({
      cartItems: "cart/getCartItems",
      cartRestaurant: "cart/getCartRestaurant",
      availableRestaurants: "restaurants/getRestaurants",
      userAddresses: "user/getAddresses",
    }),
    getCartRestaurantData: function () {
      return this.availableRestaurants.find(
        (restaurant) => restaurant["uuid"] === this.cartRestaurant
      );
    },
    getSubTotal: function () {
      return this.cartItems
        .map((item) => item["price"] * item["count"])
        .reduce((a, b) => b + a);
    },
    getDistanceFee: function () {
      return (this.getCartRestaurantData["distance"] * 0.025).toFixed(2);
    },
    getRestaurantCharges: function () {
      return 10;
    },
    getTotalBillAmount: function () {
      return (
        parseFloat(this.getSubTotal) +
        parseFloat(this.getDistanceFee) +
        parseFloat(this.getRestaurantCharges)
      );
    },
  },
  watch: {
    cartItems: function () {
      this.calculateCartItemsMaxHeight();
    },
    selectedAddress: function () {
      this.$nextTick(() => {
        if (this.selectedAddress) {
          this.calculatePaymentModeMaxHeight();
        }
      });
    },
  },
  mounted: function () {
    this.calculateCartItemsMaxHeight();
    this.calculatePaymentModeMaxHeight();
    window.addEventListener("resize", this.calculateCartItemsMaxHeight);
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.calculateCartItemsMaxHeight);
  },
  methods: {
    calculatePaymentModeMaxHeight: function () {
      let paymentTypeContainer = document.getElementsByClassName(
        "paymet-type-container"
      )[0];
      if (paymentTypeContainer) {
        this.paymentModeContainerHeight =
          paymentTypeContainer.getBoundingClientRect()["height"];
      }
    },
    calculateCartItemsMaxHeight: function () {
      let heightToSubtrack = 85 + 100;
      let elementsToRemoveHeight = [
        "bill-amount-section",
        "restaurant-header-section",
      ];
      elementsToRemoveHeight.forEach((elementToRemoveHeight) => {
        let element = document.getElementsByClassName(elementToRemoveHeight);
        if (element.length > 0) element = element[0];
        heightToSubtrack += element.offsetHeight;
      });
      this.cartItemsMaxHeight = window.innerHeight - heightToSubtrack;
    },
  },
};
</script>
<style scoped lang="scss">
.checkout-container {
  background: #e9ecee;
}
.checkout-billing-section {
  min-height: 100px;
}
.address-container {
  transition: all 0.25s ease-in-out;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}
</style>
