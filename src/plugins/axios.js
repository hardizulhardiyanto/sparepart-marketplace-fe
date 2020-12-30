import Vue from 'vue';
import store from '@/store';
import axios from 'axios';

let config = {
  baseURL: process.env.VUE_APP_API
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    let token = store.state.auth.token;

    if (token) {
      config.headers = {
        'x-access-token': token
      };
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
