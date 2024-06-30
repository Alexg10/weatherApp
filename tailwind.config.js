module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.{vue,js}",
    "./pages/**/*.{vue,js}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "5xl": ["2.5rem", { lineHeight: "1.6" }],
        "7xl": ["4.5rem", { lineHeight: "1.6" }],
      },
      colors: {
        grey: "#edf0f2",
      },
    },
  },
  plugins: [],
};
