import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import CategoriasProdutos from './views/CategoriasProdutos.vue';
import Favourites from './views/Favourites.vue';
import Cart from './views/Cart.vue';
import Product from './views/Product.vue';
import User from './views/User.vue';
import Login from './views/Login.vue';
import Registration from './views/Registration.vue';
import AuthConsumer from './components/AuthConsumer.vue';
import { auth } from './components/firebase';
import OrderHistory from './views/OrderHistory.vue';

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
        meta: {
            requiresAuth: true,
        },
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
        path: '/encomendas',
        name: 'OrderHistory',
        component: OrderHistory,
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
        component: Registration,
    },
    {
        path: '/authconsumer',
        name: 'AuthConsumer',
        component: AuthConsumer,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login' && auth.currentUser) {
        next('/');
        return;
    }

    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !auth.currentUser
    ) {
        next('/login');
        return;
    }

    next();
});

export default router;
