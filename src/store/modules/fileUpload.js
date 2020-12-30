const namespaced = true;

const state = {
    addressImage: null
};

const getters = {
    getAddressImage: state => state.addressImage,
};

const mutations = {
    SET_ADDRESS_IMAGE: (state, payload) => {
        state.addressImage = payload;
    },
};

const actions = {
    userImage: ({ commit }, payload) => {
        let formData = new FormData();
        formData.append("addressImage", payload);
        return axios
            .post('/auth/upload/user', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(response => {
                let dataIn = response.data.file_location
                commit('SET_ADDRESS_IMAGE', dataIn);

                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    barangImage: ({ commit }, payload) => {
        let formData = new FormData();
        formData.append("addressImage", payload);
        return axios
            .post('/auth/upload/barang', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(response => {
                let dataIn = response.data.file_location
                commit('SET_ADDRESS_IMAGE', dataIn);

                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fileUploadReset: ({ commit}, payload) => {
        commit('SET_ADDRESS_IMAGE', null);
    }
}
export default { namespaced, state, getters, mutations, actions };