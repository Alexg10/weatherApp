// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      "no-unused-vars": ["error", { args: "after-used" }],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "vue/multi-word-component-names": "off",
    },
  }
);
