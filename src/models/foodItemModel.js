export const foodItemModel = {
  data: function () {
    return {
      // https://en.wikipedia.org/wiki/List_of_Indian_dishes
      allFoodItems: [
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
        {
          label: "Chicken Biryani",
          image: "",
          price: this.getRandomNumber(25, 250),
        },
      ],
    };
  },
  methods: {
    getRandomFoodItem: function () {
      let foodItem = this.getFoodItemModel();
      let availableRandomFoodItem =
        this.allFoodItems[Math.floor(Math.random() * this.allFoodItems.length)];
      foodItem["label"] = availableRandomFoodItem["label"];
      foodItem["image"] = availableRandomFoodItem["image"];
      foodItem["price"] = availableRandomFoodItem["price"];
      foodItem["description"] = this.getRandomString(
        this.getRandomNumber(20, 150),
        false
      ).toLowerCase();
      foodItem["isBestSeller"] = this.getRandomNumber(0, 1) === 1;
      foodItem["vegetarian"] = this.getRandomNumber(0, 1) === 1;
      return foodItem;
    },
    getFoodItemModel: function () {
      return {
        uuid: this.getUUID(),
        label: "",
        image: "",
        price: "",
        description: "",
        isBestSeller: false,
        vegetarian: false,
        restaurant: null,
      };
    },
  },
};
