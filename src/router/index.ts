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
import ProductionUnitProducts from '@/views/ProductionUnitProducts.vue';
import Transports from '@/views/Transports.vue';
import Login from '@/views/Login.vue';
import Admin from '@/views/Admin.vue';
import ConsumerAdmin from '@/views/ConsumerAdmin.vue';
import ProducerAdmin from '@/views/ProducerAdmin.vue';
import Register from '@/views/Register.vue';
import ImpactConsumer from '@/views/ImpactConsumer.vue';
import ImpactProducer from '@/views/ImpactProducer.vue';
import ImpactAdmin from '@/views/ImpactAdmin.vue';
import ConsentPage from '@/views/ConsentPage.vue';
import Order from '@/views/Order.vue';
import OrderHistory from '@/views/OrderHistory.vue';
import Success from '@/views/Success.vue';
import Cancel from '@/views/Cancel.vue';
import CreateOrder from '@/views/CreateOrder.vue';
import SupplierInfo from '@/views/SupplierInfo.vue';
import Account from '@/views/Account.vue';
import Bye from '@/views/Bye.vue';
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
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {
            requiresAuth: true,
            requiredPermissions:
                Permission.ALL_CONSUMER | Permission.ALL_PRODUCER,
        },
    },
    {
        path: '/admin/producer/:id',
        name: 'ProducerAdmin',
        component: ProducerAdmin,
        meta: {
            requiresAuth: true,
            requiredPermissions: Permission.ALL_PRODUCER,
        },
    },
    {
        path: '/admin/consumer/:id',
        name: 'ConsumerAdmin',
        component: ConsumerAdmin,
        meta: {
            requiresAuth: true,
            requiredPermissions: Permission.ALL_CONSUMER,
        },
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/impactAdmin',
        name: 'ImpactAdmin',
        component: ImpactAdmin,
        meta: {
            requiresAuth: true,
            requiredPermissions:
                Permission.ALL_CONSUMER | Permission.ALL_PRODUCER,
        },
    },
    {
        path: '/produtosprodutor',
        name: 'produtosprodutor',
        component: ProductsProducer,
        meta: {
            requiresAuth: true,
            requiredProducer: true,
        },
    },
    {
        path: '/impactProducer',
        name: 'ImpactProducer',
        component: ImpactProducer,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/consent',
        name: 'ConsentManagement',
        component: ConsentPage,
    },
    {
        path: '/unidadesproducao',
        name: 'unidadesproducao',
        component: ProductionUnits,
        meta: {
            requiresAuth: true,
            requiredProducer: true,
        },
    },

    {
        path: '/production-units/:producerId/:unitId/products',
        name: 'ProductionUnitProducts',
        component: ProductionUnitProducts,
        meta: {
            requiresAuth: true,
            requiredProducer: true,
        },
    },

    {
        path: '/transportes',
        name: 'transportes',
        component: Transports,
        meta: {
            requiresAuth: true,
            requiredProducer: true,
        },
    },

    {
        path: '/impactConsumer',
        name: 'ImpactConsumer',
        component: ImpactConsumer,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/producer/:id',
        name: 'Producer',
        component: SupplierInfo,
    },
    {
        path: '/bye',
        name: 'Bye',
        component: Bye,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    let isAuthenticated = !!store.state.user;

    // Check if the user is authenticated
    if (!isAuthenticated) {
        await store.dispatch('fetchAuthUser');
        isAuthenticated = !!store.state.user;
    }

    // Check if the user is authenticated and has the correct type
    const userType = store.state.user?.user?.type;

    // Check if the user type is different from "PRODUCER" for routes that require it
    if (
        to.matched.some((record) => record.meta.requiredProducer) &&
        userType !== 'PRODUCER'
    ) {
        createPopup(
            `Você não tem permissão para aceder a ${
                to.name?.toString() || 'página'
            }.`,
            'error'
        );
        next(from);
        return;
    }

    // Check if the user is already logged in and trying to access login or registration pages
    if (
        (to.path === '/login' || to.path === '/registration') &&
        isAuthenticated
    ) {
        // Redirect to the home page if the user is already logged in
        next(from);
        return;
    }

    // Check if the route requires authentication
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !isAuthenticated
    ) {
        // Redirect to the login page if the user is not logged in
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
