const namespaced = true;

const state = {
  cartList: null
};

const getters = {
  getCart: state => state.cartList,
};

const mutations = {
  SET_CART: (state, payload) => {
    state.cartList = payload;
  }
};

const action = {

}

export default { namespaced, state, getters, mutations, actions };