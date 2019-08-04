const pkg = require("./package");

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/element-ui"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // Port変更用に追加
  server: {
    port: 8330, // デフォルト: 3000
    host: "0.0.0.0" // デフォルト: localhost
  },

  serverMiddleware: [
    "~/api/upload_json.js",
    "~/api/upload_image.js",
    "~/api/term_mng.js",
    "~/api/meter_cloud.js",
    "~/api/vehicle-log.js",
    "~/api/net_pay.js",
    "~/api/logwatch.js"
  ],

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
