import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import * as Cookies from 'js-cookie';
import createLogger from "vuex/dist/logger"; //Dev


Vue.use(Vuex);

import moduleAuth from './modules/auth';
import moduleExceptionHandler from './modules/exceptionHandler';
import moduleFileUpload from './modules/fileUpload';
import moduleUser from './modules/user';
import moduleProduct from './modules/product';
import moduleTransaction from './modules/transaction';

const authPlugin = new VuexPersistence({
    restoreState: key => Cookies.getJSON(key),
    saveState: (key, state) =>
        Cookies.set(key, state, {
            expires: 3
        }),
    modules: ['auth']
});

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth: moduleAuth,
        exceptionHandler: moduleExceptionHandler,
        fileUpload: moduleFileUpload,
        user: moduleUser,
        product: moduleProduct,
        transaction: moduleTransaction
    },
    plugins: [createLogger(),authPlugin.plugin],
})