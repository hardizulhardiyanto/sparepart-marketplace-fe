import Vue from 'vue';
import Vuetify from 'vuetify';
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: "fa" || "fa4",
  theme: {
    themes: {
      light: {
        primary: '#1e304b',
        secondary: '#e5c390',
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      },
    },
  }
});
