// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: "light", // or 'dark' based on your preference
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#1B59D1", // Blue
            secondary: "#3B3B3B", // Dark Grey
            accent: "#15AFF1", // Light Blue
            error: "#BB3939", // Red
            info: "#000347", // Dark Blue
            success: "#45AE43", // Green
            warning: "#ffcc00", // White (or choose an appropriate warning color)
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: "#1B59D1", // Blue
            secondary: "#3B3B3B", // Dark Grey
            accent: "#15AFF1", // Light Blue
            error: "#BB3939", // Red
            info: "#000347", // Dark Blue
            success: "#45AE43", // Green
            warning: "#FFF", // White (or choose an appropriate warning color)
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
