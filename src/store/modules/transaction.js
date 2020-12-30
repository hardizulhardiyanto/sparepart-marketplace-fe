const namespaced = true;

const state = {
    cartList: [],
    tempCart: [],
    cartById: undefined,
};

const getters = {
    getTempCart: state => state.tempCart,
    getCartList: state => state.cartList,
    getCartById: state => state.cartById
};

const mutations = {
    SET_ADD_TEMP_CART: (state, payload) => {
        state.tempCart = payload
    },
    SET_ADD_CART_LIST: (state, payload) => {
        state.cartList.push(payload);
    },
    SET_UPDATE_CART_LIST: (state, payload) => {
        state.cartList = payload
    },
    SET_CART_BY_ID: (state, payload) => {
        state.cartById = payload;
    },
};

const actions = {
    fetchAddTempCart: ({ commit }, payload) => {
        commit('SET_ADD_TEMP_CART', payload)
        return state.tempCart
    },
    fetchAddCart: ({ commit }, payload) => {
        commit('SET_ADD_CART_LIST', payload)
        return state.cartList
    },
    fetchUpdateCart: ({ commit }, payload) => {
        commit('SET_UPDATE_CART_LIST', payload)
        return state.cartList
    },
    fetchTransactionHistoryById: ({ commit }, payload) => {
        return axios({
            method: "get",
            url: `/api/transaction/history/${payload}`
        })
            .then(response => {
                return response.data.results.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchUpdateTrasction: ({ commit }, payload) => {
        return axios({
            method: "put",
            url: `/api/transaction/${payload.id}`,
            data: payload
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchSaveTransaction: ({ commit }, payload) => {
        return axios({
            method: "post",
            url: `/api/transaction`,
            data: payload
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    
    fetchDeleteTransaction: ({ commit }, payload) => {
        return axios({
            method: "delete",
            url: `/api/transaction/${payload}`
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchTransactioById: ({ commit }, payload) => {
        return axios({
            method: "get",
            url: `/api/transaction/${payload}`
        })
            .then(response => {
                commit('SET_PRODUCT_BY_ID', response.data.results.data);
                return response.data.results.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchTransactionList: ({ commit }) => {
        return axios({
            method: "get",
            url: `/api/transaction`
        })
            .then(response => {
                commit('SET_PRODUCT_LIST', response.data);
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
}
export default { namespaced, state, getters, mutations, actions };