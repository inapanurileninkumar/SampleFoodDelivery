import { foodItemModel } from "./foodItemModel";
export const restaurantModel = {
  mixins: [foodItemModel],
  methods: {
    getRandomRestaurant: function () {
      let restaurant = this.getRestaurantItemModel();
      let categories = Array.from(Array(this.getRandomNumber(4, 8)).keys()).map(
        (categoryIndex) => ({
          label: `${this.getRandomString(6, false)} ${this.getRandomString(
            6,
            false
          )}`,
          uuid: this.getUUID(),
          items: Array.from(Array(this.getRandomNumber(4, 12)).keys()).map(
            (itemIndex) => ({
              ...this.getRandomFoodItem(),
              restaurant: restaurant["uuid"],
            })
          ),
        })
      );
      restaurant["label"] = this.getRandomString(
        this.getRandomNumber(10, 20),
        false
      );
      restaurant["open"] = this.getRandomNumber(0, 1) === 1;
      restaurant["menu"]["recommended"] = categories
        .map((category) => category["items"].filter((item) => Math.random()))
        .flat()
        .slice(0, 8);
      restaurant["categories"] = categories;
      let cost = {
        price: this.getRandomNumber(10, 50) * 10,
        personCount: this.getRandomNumber(1, 2),
      };
      restaurant["cost"] = cost;
      restaurant["priceRange"] = `${cost["price"]} for ${cost["personCount"]}`;
      restaurant["rating"] =
        Number.parseFloat(Math.random().toFixed(1)) +
        this.getRandomNumber(2, 4);
      restaurant["offers"] = Array.from(
        Array(this.getRandomNumber(4, 8)).keys()
      ).map((index) => ({
        text: `${this.getRandomNumber(1, 5) * 10} Off`,
        code: "NEWBEE",
      }));
      restaurant["deliveryTime"] = this.getRandomNumber(10, 65);
      restaurant["location"] = this.getRandomLocation();
      restaurant["distance"] = this.getRandomNumber(800, 5000);
      return restaurant;
    },
    getRestaurantItemModel: function () {
      return {
        label: "",
        uuid: this.getUUID(),
        open: false,
        image: "/restaurantImages/restaurant.jpeg",
        specials: "Sea food, North Indian, and Biryani",
        deliveryTime: 0,
        location: "",
        priceRange: "",
        rating: 0,
        menu: {
          recommended: [],
          categories: [],
        },
        offers: [],
        distance: 0,
      };
    },
  },
};
