import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue';
import Profile from './views/Profile.vue';
import ProductList from './views/Product/index.vue'
import ProductCreate from './views/Product/CreateEdit.vue'
import TransactionList from './views/Transaction/index.vue'
import MemberList from './views/Member/index.vue'
import MemberCreateEdit from './views/Member/CreateEdit.vue'

Vue.use(Router);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/",
        name: "home",
        component: Dashboard,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/product",
        name: "invetoryList",
        component: ProductList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/product/create",
        name: "invetoryCreate",
        component: ProductCreate,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/product/:id",
        name: "invetoryEdit",
        component: ProductCreate,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/transaction",
        name: "transactionList",
        component: TransactionList,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/member",
        name: "memberList",
        component: MemberList,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/member/new",
        name: "memberCreate",
        component: MemberCreateEdit,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/member/:id",
        name: "memberEdit",
        component: MemberCreateEdit,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/home/:id",
        name: "homeid",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !store.state.auth.token
    ) {
        next("/login");
    } else {
        next();
    }
});

export default router;