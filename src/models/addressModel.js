export const addressModel = {
  namespaced: true,
  methods: {
    getRandomAddress: function () {
      let address = this.getAddressModel();
      address["label"] = this.getRandomString(
        this.getRandomNumber(5, 12),
        false
      );
      address["deliveryTime"] = this.getRandomNumber(15, 45);
      address["address"] = {
        landmark: this.getRandomString(this.getRandomNumber(5, 15), false),
        building:
          "near " + this.getRandomString(this.getRandomNumber(5, 10), false),
        area: this.getRandomLocation(),
        state: "Telangana",
        pincode: "500084",
        doorNo:
          "" +
          this.getRandomNumber(1, 4) +
          this.getRandomNumber(0, 1) +
          this.getRandomNumber(1, 9),
      };
      return address;
    },
    getAddressModel: function () {
      return {
        uuid: this.getUUID(),
        label: "",
        address: {
          landmark: "",
          doorNo: "",
          building: "",
          area: "",
          state: "",
          pincode: "",
        },
        deliveryTime: 0,
      };
    },
  },
};
