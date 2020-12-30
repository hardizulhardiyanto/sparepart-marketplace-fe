const namespaced = true;

const state = {
    productList: undefined,
    productById: undefined,
    searchList: "",
};

const getters = {
    getProduct: state => state.productList,
    getProductById: state => state.productById,
    getSearchlist: state => state.searchList
};

const mutations = {
    SET_PRODUCT_LIST: (state, payload) => {
        state.productList = payload;
    },
    SET_PRODUCT_BY_ID: (state, payload) => {
        state.productById = payload;
    },
    SET_SORT: (state, payload) => {
        let dataIn = state.productList
        function sort(params) {
            let input = params.toUpperCase()
            if (input == 'ASC') {
                let asc = dataIn.sort(function (a, b) {
                    return parseFloat(a.id) - parseFloat(b.id);
                });
                state.productList = asc;
            } else {
                let desc = dataIn.sort(function (a, b) {
                    return parseFloat(b.id) - parseFloat(a.id);
                });
                state.productList = desc;
            }
        }
        if (payload == 1) {
            payload = 'asc'
        } else {
            payload = 'desc'
        }
        sort(payload)
    },
    SET_SEARCH: (state, payload) => {
        let payUp = payload.toLowerCase()
        state.searchList = payUp

        // let obj = dataIn.find(o => o.productName.toUpperCase() === payUp);
        // if (payUp === "") return state.productList = dataIn;
        // return state.productList =  dataIn.filter((entry) => {
        //     return entry.productName.toLowerCase().includes(payUp.toLowerCase());
        // });
    }
};

const actions = {
    fetchSortFilter: ({ commit }, payload) => {
        commit('SET_SORT', payload);
    },
    fetchSearch: ({ commit }, payload) => {
        commit('SET_SEARCH', payload);
    },
    fetchUpdateProduct: ({ commit }, payload) => {
        return axios({
            method: "put",
            url: `/api/product/${payload.id}`,
            data: payload
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchSaveProduct: ({ commit }, payload) => {
        return axios({
            method: "post",
            url: `/api/product`,
            data: payload
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchDeleteProduct: ({ commit }, payload) => {
        return axios({
            method: "delete",
            url: `/api/product/${payload}`
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchProductById: ({ commit }, payload) => {
        return axios({
            method: "get",
            url: `/api/product/${payload}`
        })
            .then(response => {
                commit('SET_PRODUCT_BY_ID', response.data.results.data);
                return response.data.results.data;
            })
            .catch(error => {
                throw error;
            });
    },
    filterProductList: ({ commit }, getCart) => {
        return axios({
            method: "get",
            url: `/auth/product`
        })
            .then(response => {
                let results = response.data.results.data
                const found = results.filter((el) => el.status == true);
                let listAdd = found.map((el, i) => {
                    const found = getCart.find((el1) => el1.id == el.id);
                    if (typeof found == "object") {
                        if (found.id == el.id) {
                            el.cartOn = true;
                        } else {
                            el.cartOn = false;
                        }
                    }
                    return el;
                });
                commit('SET_PRODUCT_LIST', listAdd);
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
    fetchProductList: ({ commit }) => {
        return axios({
            method: "get",
            url: `/auth/product`
        })
            .then(response => {
                let results = response.data.results.data
                commit('SET_PRODUCT_LIST', results);
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    },
}
export default { namespaced, state, getters, mutations, actions };