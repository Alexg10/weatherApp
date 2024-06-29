import dotenv from "dotenv";

dotenv.config();

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Weather App",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Weather App",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
      appear: true,
    },
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: { Poppins: [200, 300, 400, 500, 600] },
      },
    ],
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
  ],
  tailwindcss: {
    configPath: "tailwind.config.js",
    cssPath: "~/assets/scss/tailwind.scss",
  },
  css: ["~/assets/scss/tailwind.scss"],
  runtimeConfig: {
    public: {
      googleApiKey: process.env.GOOGLE_API_KEY,
    },
  },
});
