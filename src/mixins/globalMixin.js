export const globalMixin = {
  methods: {
    deepCopy: function (element) {
      try {
        return JSON.parse(JSON.stringify(element));
      } catch (e) {}
    },
    getUUID: function () {
      return "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, (c) => {
        let r = (Math.random() * 16) | 0;
        let v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    getRandomLocation: function () {
      let locations = [
        "Kondapur",
        "Madhapur",
        "Gachibowli",
        "Uppal",
        "Miyapur",
        "Kukatpally",
        "Jubilee Hills",
        "Kothaguda",
      ];
      return locations[this.getRandomNumber(0, locations.length)];
    },
    getRandomString: function (length, includeInts = true) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
      if (includeInts) {
        characters += "0123456789";
      }
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    routeTo: function (path, payload, query = null) {
      this.$router
        .replace({
          name: path,
          params: payload,
          query: query,
        })
        .catch((error) => {
          console.log("error in routing to path : ", path, error);
        });
    },
  },
};
