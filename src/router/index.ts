import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import CategoriasProdutos from '@/views/CategoriasProdutos.vue';
import Favourites from '@/views/Favourites.vue';
import Cart from '@/views/Cart.vue';
import Product from '@/views/Product.vue';
import User from '@/views/User.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import SupplierInfo from "./views/SupplierInfo.vue";
import { store } from '@/store';

const routes = [
    {
        path: '/',
        name: 'Página principal',
        component: Home,
    },
    {
        path: '/sobre',
        name: 'Sobre',
        component: About,
    },
    {
        path: '/produtos',
        name: 'Produtos',
        component: CategoriasProdutos,
    },
    {
        path: '/favoritos',
        name: 'Favoritos',
        component: Favourites,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/carrinho',
        name: 'Cart',
        component: Cart,
    },
    // O link para o produto deveria ter o seu nome ou id
    {
		path: "/products/:specid",
		name: "ProductDetails",
		component: Product,
    },
    {
        path: '/conta',
        name: 'Conta',
        component: User,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Register,
    },
	{
		path: "/producer/:id",
		name: "Producer",
		component: SupplierInfo,
	},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const isAuthenticated = !!store.state.user;
    if (!isAuthenticated) await store.dispatch('fetchAuthUser');

    if (
        (to.path === '/login' || to.path === '/registration') &&
        isAuthenticated
    ) {
        // redirect to the home page if the user is already logged in
        next(from);
        return;
    }

    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !isAuthenticated
    ) {
        // redirect to the login page if the user is not logged in
        next('/login');
        return;
    }

    next();
});

export default router;
