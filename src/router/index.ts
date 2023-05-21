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
import Order from '@/views/Order.vue';
import { store } from '@/store';
import { Permission } from '@/types';
import { hasPermission } from '@/utils/permissions';
import { createPopup } from '@/utils/popup';

const routes = [
    {
        path: '/',
        name: 'Página principal',
        component: Home,
    },
    {
        // O link para a encomenda deve ter o codigo
        path: '/encomenda/id:id',
        name: 'Encomenda',
        component: Order,
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
        path: '/produto',
        name: 'Produto',
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
        path: '/admin',
        name: 'Admin',
        component: Register,
        meta: {
            requiresAuth: true,
            requiredPermissions:
                Permission.ALL_CONSUMER | Permission.ALL_PRODUCER,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    let isAuthenticated = !!store.state.user;
    if (!isAuthenticated) {
        await store.dispatch('fetchAuthUser');
        isAuthenticated = !!store.state.user;
    }

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

    if (
        to.matched.some((record) => record.meta.requiredPermissions) &&
        !hasPermission(store.state.user!.user, to.meta.requiredPermissions!)
    ) {
        // redirect back to the previous page if the user does not have the required permissions
        createPopup(
            `Você não tem permissão para aceder a ${
                to.name?.toString() || 'página'
            }.`,
            'error'
        );
        next(from);
        return;
    }

    next();
});

export default router;
