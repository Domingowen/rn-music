module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [["babel-plugin-module-resolver", {
    alias: {
      "src": "./src",
      "assets": "./src/assets"
    }
  }]],
  env: {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
};
