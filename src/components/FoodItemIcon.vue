<template>
    <span>
        <i
          v-if="isVegetarian"
          class="mt--2 fas fa-circle border-radius-2 ptr-2 pbl-2 text-success bordered-success-2"
          style="font-size:5pt;"
        />
        <i
            v-else
            class="far fa-caret-square-up text-danger-dark"
        />
    </span>
</template>

<script>
export default {
  name: "FoodItemIcon",
  props: {
    isVegetarian: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>

</style>
