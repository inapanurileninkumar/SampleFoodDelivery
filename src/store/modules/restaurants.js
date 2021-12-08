export const restaurants = {
  namespaced: true,
  state: {
    restaurants: [],
  },
  getters: {
    getRestaurants: (state) => state["restaurants"],
  },
  actions: {
    addRestaurant: function (store, restaurant) {
      store.commit("ADD_RESTAURANT", restaurant);
    },
  },
  mutations: {
    ADD_RESTAURANT: function (state, restaurant) {
      state["restaurants"].push(restaurant);
    },
  },
};
