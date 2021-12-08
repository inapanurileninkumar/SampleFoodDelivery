export const user = {
  namespaced: true,
  state: {
    meta: {
      id: 123,
      firstName: "James",
      lastName: "Peterson",
    },
    addresses: [],
  },
  getters: {
    getAddresses: (state) => state["addresses"],
  },
  actions: {
    addAddress: function (store, address) {
      store.commit("ADD_ADDRESS", address);
    },
  },
  mutations: {
    ADD_ADDRESS: function (state, address) {
      state["addresses"].push(address);
    },
  },
};
