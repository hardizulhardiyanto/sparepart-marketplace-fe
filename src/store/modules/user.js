const namespaced = true;

const state = {
    userProfile: undefined,
    role: null
};

const getters = {
    getUser: state => state.userProfile
};

const mutations = {
    SET_USER: (state, payload) => {
        state.userProfile = payload;
    },
};

const actions = {
    fetchUsersProfile: ({ commit }, params, payload) => {
        return axios
            .post('/api/refreshtoken')
            .then(response => {
                let dataIn = response.data.results
                commit('SET_USER', dataIn);
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchChangesProfile: ({ commit }, payload) => {
        console.log('store', payload);
        return axios({
            method: "put",
            url: `/api/users/${payload.id}`,
            data: payload,
        })

            .then(response => {
                let dataIn = response.data.results
                commit('SET_USER', dataIn);
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
}
export default { namespaced, state, getters, mutations, actions };