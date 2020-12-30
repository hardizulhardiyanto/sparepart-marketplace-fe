const namespaced = true;

const state = {
  showError: null,
  message: null,
  loading: false,
  showSuccess: null
};

const getters = {
	getErrorVisibility: state => state.showError,
  getErrorMessage: state => state.message,
  getLoading: state => state.loading,
	getSuccessVisibility: state => state.showSuccess,
	getSuccessMessage: state => state.message,

};

const mutations = {
  SET_ERROR: (state, payload) => {
    state.showError = new Date();
    state.message = payload.message;
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload;
  },
  SET_SUCCESS: (state, payload) => {
    state.showSuccess = new Date();
    state.message = payload.message;
  },
};

const actions = {
  error: ({ commit }, payload) => {
		let response = {};

    if (payload.response) {
      response = payload.response.data;
    } else if (payload.request) {
      response = { message: "Server seems busy/down. Please try again in a few minutes." };
    } else {
      response = { message: payload.message };
		}
    commit('SET_ERROR', response);
  },

  loading:({ commit }, payload) => {
    commit('SET_LOADING', payload);
  },

  success: ({ commit }, payload) => {
		let response = payload;
    commit('SET_SUCCESS', response);
  },

  
};

export default { namespaced, state, getters, mutations, actions };
