module.exports = {
  env: {
    browser: true,
    node: false,
    jest: true,
    mongo: false,
    es6: true,
    es2021: true,
  },
  extends: ["airbnb-base", "eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "editorconfig"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-underscore-dangle": [
      "error",
      { allow: ["_id", "__filename", "__dirname", "__v"] },
    ],
  },
};
