export const cart = {
  namespaced: true,
  state: {
    restaurantId: null,
    items: [
      //   {
      //      label:'',
      //      item_uuid:'',
      //      uuid :'',
      //      count : '',
      //   }
    ],
  },
  getters: {
    getCartItems: (state) => state["items"],
    getCartRestaurant: (state) => state["restaurantId"],
  },
  actions: {
    addFoodItem: function (store, foodItem) {
      store.commit("ADD_FOOD_ITEM", foodItem);
    },
    reduceFoodItemCount: function (store, foodItem) {
      store.commit("REDUCE_FOOD_ITEM_COUNT", foodItem);
    },
    setCartRestaurant: function (store, restaurantId) {
      store.commit("SET_CART_RESTAURANT", restaurantId);
    },
    resetCart: function (store) {
      store.commit("RESET_CART");
    },
  },
  mutations: {
    SET_CART_RESTAURANT: function (state, restaurantId) {
      state["restaurantId"] = restaurantId;
    },
    ADD_FOOD_ITEM: function (state, foodItem) {
      // DON'T KNOW HOW TO ACCESS A MIXIN FROM VUEX
      let getUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, (c) => {
          let r = (Math.random() * 16) | 0;
          let v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      };
      let itemIndex = state["items"].findIndex(
        (item) => item["item_uuid"] === foodItem["uuid"]
      );
      if (itemIndex > -1) {
        state["items"][itemIndex]["count"] += 1;
      } else {
        state["items"].push({
          label: foodItem["label"],
          item_uuid: foodItem["uuid"],
          uuid: getUUID(),
          count: 1,
          price: foodItem["price"],
        });
      }
    },
    REDUCE_FOOD_ITEM_COUNT: function (state, foodItem) {
      let itemIndex = state["items"].findIndex(
        (item) => item["item_uuid"] === foodItem["uuid"]
      );
      if (itemIndex > -1) {
        state["items"][itemIndex]["count"] -= 1;
      }
      if (state["items"][itemIndex]["count"] === 0) {
        state["items"].splice(itemIndex, 1);
        if (state["items"].length === 0) {
          state["restaurantId"] = null;
        }
      }
    },
    RESET_CART: function (state) {
      state["items"] = [];
      state["restaurantId"] = null;
    },
  },
};
