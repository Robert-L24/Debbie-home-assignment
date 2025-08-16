// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', {jsxImportSource: "nativewind"}], "nativewind/babel"],
    plugins: [
      'expo-router/babel',          // required by expo-router
      // 'nativewind/babel',           // enables className Tailwind on RN
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};
