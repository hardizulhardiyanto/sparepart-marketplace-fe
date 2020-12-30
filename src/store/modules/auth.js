import jwt from 'jsonwebtoken';

const namespaced = true;

const state = {
  token: null
};

const getters = {
  getToken: state => state.token,
  isLoggedIn: state => !!state.token,
  getCurrentUser: state => {
    let decoded = jwt.decode(state.token, { complete: true });
    return decoded.payload;
  }
};

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload;
  }
};

const actions = {
  login: ({ commit }, payload) => {
    return axios
      .post('/auth/login', payload)
      .then(response => {
        let dataIn  = response.data.results
        commit('SET_TOKEN', dataIn.token);

        return response.data;
      })
      .catch(error => {
        throw error;
      });
  },

  register: ({ commit }, payload) => {
    return axios
      .post('/auth/register', payload)
      .then(response => {
        let dataIn  = response.data.results
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  },

  logout: ({ commit }) => {
    commit('SET_TOKEN', null);
  }
};

export default { namespaced, state, getters, mutations, actions };
