<template>
    <div
      class="pt-30 flex-row align-items-start justify-content-center"
      style="background:#e9ecee;"
    >
      <div
        class="flex-col-10"
      >
        <div class="flex-row">
          <div class="flex-col-9">
          </div>
          <div 
            class="flex-col-3 ph-15"
          >
            <div 
              class="ph-20 pv-15 bg-white"
              style="height:200px;width:100%;"
            >
              <div
                class="flex-row"
              >
                <div 
                  class="flex-col-2"
                >

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
            </div>
          </div>
        </div>
      </div>        
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Checkout",
  data: function () {
    return {

    };
  },
  computed: {
    ...mapGetters({
      cartRestaurant: "cart/getCartRestaurant",
      availableRestaurants: "restaurants/getRestaurants"
    }),
    getCartRestaurantData: function () {
      return this.availableRestaurants.find(restaurant => restaurant["uuid"] === this.cartRestaurant);
    }
  }
};
</script>
<style scoped lang="scss">

</style>
