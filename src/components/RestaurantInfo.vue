<template>
  <div
    class="restaurant-container bg-white hover-bordered-secondary-lite border-radius-2 pth-20 pointer-cursor"
  >
    <div>
      <img :src="getMediaImage(restaurant['image'])" class="image" />
    </div>
    <div class="text-bold mt-10">
      <span>
        {{ restaurant["label"] }}
      </span>
    </div>
    <div class="specials mt-5 text-secondary">
      <span>
        {{ restaurant["specials"] }}
      </span>
    </div>
    <div
      class="rating-container pb-15 mt-15 flex-row align-items-center justify-content-space-between"
    >
      <span
        :class="getRestaurantRatingClass(restaurant['rating'])"
        class="ph-5 pv-3 border-radius-1 rating text-bold text-white"
      >
        <span>&#9734;</span>
        {{ restaurant["rating"] }}
      </span>
      <span class="text-bold">.</span>
      <span class="delivery-time text-secondary">
        {{ restaurant["deliveryTime"] }} MINS
      </span>
      <span class="text-bold text-secondary">.</span>
      <span class="price-range text-secondary">
        {{ restaurant["priceRange"] }}
      </span>
    </div>
    <div
      v-if="restaurant['offers'].length > 0"
      class="pv-10 offer-container text-warning text-bold"
    >
      <span>&#9832;</span>
      {{ restaurant["offers"][0]["text"] }} | use
      {{ restaurant["offers"][0]["code"] }}
    </div>
    <div
      class="quick-view-container text-info flex-row align-items-center justify-content-center pv-10 text-bold"
    >
      QUICK VIEW
    </div>
  </div>
</template>

<script>
export default {
  props: {
    restaurant: {
      type: Object,
      default: null,
    },
  },
  methods: {
    getRestaurantRatingClass: function (rating) {
      rating = Number.parseFloat(rating);
      if (rating >= 4) return "bg-success";
      else if (rating >= 3) return "bg-warning";
      else return "bg-warning-lite";
    },
  },
};
</script>

<style lang="scss" scoped>
.restaurant-container {
  border: 1px solid transparent;
  letter-spacing: 1px;

  .image {
    max-height: 200px;
    width: 100%;
    filter: opacity(90%);
  }

  .rating {
    font-size: 9pt;
  }

  .delivery-time,
  .price-range,
  .offer-container,
  .specials,
  .quick-view-container {
    font-size: 9pt;
  }

  .offer-container,
  .quick-view-container {
    border-top: 1px solid rgba(184, 181, 181, 0.3);
  }

  .quick-view-container {
    visibility: hidden;
  }

  &:hover {
    .quick-view-container {
      visibility: visible;
    }
  }
}
</style>
