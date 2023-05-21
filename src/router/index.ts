import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import CategoriasProdutos from '@/views/CategoriasProdutos.vue';
import Favourites from '@/views/Favourites.vue';
import Cart from '@/views/Cart.vue';
import Product from '@/views/Product.vue';
import User from '@/views/User.vue';
import ProductsProducer from '@/views/ProductsProducer.vue';
import ProductionUnits from '@/views/ProductionUnits.vue';
import Transports from '@/views/Transports.vue';
import Testes from '@/views/Testes.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import { store } from '@/store';
import { Permission } from '@/types';
import { hasPermission } from '@/utils/permissions';
import { createPopup } from '@/utils/popup';

// import { store, useStore } from '@/store';
import { useStore } from '@/store';
import { onMounted, ref, watch } from 'vue';

// import { store } from '../store';

// const isAuthenticated = () => {
//     // console.log('store.state.auth', store.state.auth);
//     return store.state.user !== null;
// };
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
    // {
    //     path: '/authconsumer',
    //     name: 'AuthConsumer',
    //     component: AuthConsumer,
    // },
    {
        path: '/produtosprodutor',
        name: 'produtosprodutor',
        component: ProductsProducer,
        // meta: {
        //     requiresAuth: true,
        // },
    },
    {
        path: '/unidadesproducao',
        name: 'unidadesproducao',
        component: ProductionUnits,
        // meta: {
        //     requiresAuth: true,
        // },
    },
    {
        path: '/transportes',
        name: 'transportes',
        component: Transports,
        // meta: {
        //     requiresAuth: true,
        // },
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

    if (!isAuthenticated) await store.dispatch('fetchAuthUser');
    console.log('isAuthenticated', isAuthenticated);
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
