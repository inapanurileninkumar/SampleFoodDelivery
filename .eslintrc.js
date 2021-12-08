module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "comma-dangle": [
      "error",
      {
        arrays: "ignore",
        objects: "ignore",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],
    "vue/valid-v-on": [
      "error",
      {
        modifiers: ["click"],
      },
    ],
    "dot-notation": 0,
    "prefer-const": 0,
    "no-trailing-spaces": [0, { skipBlankLines: true }],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
