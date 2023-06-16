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
import OrderHistory from '@/views/OrderHistory.vue';
import Success from '@/views/Success.vue';
import Cancel from '@/views/Cancel.vue';
import CreateOrder from '@/views/CreateOrder.vue';
import SupplierInfo from '@/views/SupplierInfo.vue';
import { store } from '@/store';
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
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/sobre',
        name: 'Sobre',
        component: About,
    },
    {
        path: '/products',
        name: 'Products',
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
        path: '/createOrder',
        name: 'CreateOrder',
        component: CreateOrder,
    },
    {
        path: '/orders/:orderId/success',
        name: 'Success',
        component: Success,
    },
    {
        path: '/orders/:orderId/cancel',
        name: 'Cancel',
        component: Cancel,
    },
    {
        path: '/carrinho',
        name: 'Cart',
        component: Cart,
    },
	
    // O link para o produto deveria ter o seu nome ou id
    {
        path: '/products/:specid',
        name: 'ProductDetails',
        component: Product,
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
        path: '/producer/:id',
        name: 'Producer',
        component: SupplierInfo,
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
