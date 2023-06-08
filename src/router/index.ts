import {
    createRouter,
    createWebHistory,
    RouteLocationNormalizedLoaded,
} from 'vue-router';

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
import Testes from '@/views/Testes.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import SupplierInfo from '@/views/SupplierInfo.vue';
import { store } from '@/store';
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
        meta: {
            requiresAuth: true,
            requiredProducer: true,
        },
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
        path: '/production-units/:producerId/:unitId/:unitName/products',
        name: 'ProductionUnitProducts',
        component: ProductionUnitProducts,
        requiredProducer: true,
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
        path: '/admin',
        name: 'Admin',
        component: Register,
        meta: {
            requiresAuth: true,
            // requiredPermissions:
            //     Permission.ALL_CONSUMER | Permission.ALL_PRODUCER,
        },
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
// router.beforeEach(async (to, from, next) => {
//     let isAuthenticated = !!store.state.user;
//     if (!isAuthenticated) {
//         await store.dispatch('fetchAuthUser');
//         isAuthenticated = !!store.state.user;
//     }

//     if (!isAuthenticated) await store.dispatch('fetchAuthUser');
//     console.log('isAuthenticated', isAuthenticated);
//     if (
//         (to.path === '/login' || to.path === '/registration') &&
//         isAuthenticated
//     ) {
//         // redirect to the home page if the user is already logged in
//         next(from);
//         return;
//     }

//     if (
//         to.matched.some((record) => record.meta.requiresAuth) &&
//         !isAuthenticated
//     ) {
//         // redirect to the login page if the user is not logged in
//         next('/login');
//         return;
//     }

//     if (
//         to.matched.some((record) => record.meta.requiredPermissions) &&
//         !hasPermission(store.state.user!.user, to.meta.requiredPermissions!)
//     ) {
//         // redirect back to the previous page if the user does not have the required permissions
//         createPopup(
//             `Você não tem permissão para aceder a ${
//                 to.name?.toString() || 'página'
//             }.`,
//             'error'
//         );
//         next(from);
//         return;
//     }
//     if (to.matched.some((record) => record.meta.requiredProducer)) {
//         const producerId = to.params.producerId;

//         // Perform the verification logic here
//         // Example: Check if producerId matches the user's ID
//         const userId = store.state.user!.user.id;
//         console.log('producerId', producerId);
//         console.log('userId', userId);
//         if (producerId === userId) {
//             // User is the producer, proceed to the route
//             next();
//         } else {
//             // or
//             createPopup(
//                 'Você não tem permissão para aceder a esta página.',
//                 'error'
//             ); // Show an error message
//         }
//     } else {
//         // Route does not require producer, proceed to the route
//         next();
//     }
// });

export const checkProducerMiddleware = async (
    producerId: number,
    _to: { matched: { meta: { requiredProducer: boolean } }[] },
    _next: () => void
) => {
    const store = useStore();
    const userId = store.state.user!.user.id;
    console.log('producerId', producerId);
    console.log('userId', userId);
    // console log requiredProducer before and after the loop
    _to.matched.forEach((record: { meta: { requiredProducer: boolean } }) => {
        console.log('requiredProducer1', record.meta.requiredProducer);
    });

    if (
        producerId === userId &&
        userId !== undefined &&
        producerId !== undefined
    ) {
        // User is the producer, set requiredProducer to true
        _to.matched.forEach(
            (record: { meta: { requiredProducer: boolean } }) => {
                record.meta.requiredProducer = true;
                console.log('requiredProducer2', record.meta.requiredProducer);
            }
        );
    } else {
        // User is not the producer, set requiredProducer to false
        _to.matched.forEach(
            (record: { meta: { requiredProducer: boolean } }) => {
                record.meta.requiredProducer = false;
                console.log('requiredProducer3', record.meta.requiredProducer);
            }
        );
    }

    _next();
};

// router.beforeEach(async (to, from, next) => {
//     let isAuthenticated = !!store.state.user;
//     if (!isAuthenticated) {
//         await store.dispatch('fetchAuthUser');
//         isAuthenticated = !!store.state.user;
//     }

//     if (!isAuthenticated) await store.dispatch('fetchAuthUser');
//     console.log('isAuthenticated', isAuthenticated);
//     if (
//         (to.path === '/login' || to.path === '/registration') &&
//         isAuthenticated
//     ) {
//         // redirect to the home page if the user is already logged in
//         next(from);
//         return;
//     }

//     if (
//         to.matched.some((record) => record.meta.requiresAuth) &&
//         !isAuthenticated
//     ) {
//         // redirect to the login page if the user is not logged in
//         next('/login');
//         return;
//     }

//     if (
//         to.matched.some((record) => record.meta.requiredPermissions) &&
//         !hasPermission(store.state.user!.user, to.meta.requiredPermissions!)
//     ) {
//         // redirect back to the previous page if the user does not have the required permissions
//         createPopup(
//             `Você não tem permissão para aceder a ${
//                 to.name?.toString() || 'página'
//             }.`,
//             'error'
//         );
//         next(from);
//         return;
//     }

//     next();
// });

// export const checkProducerMiddleware = async (
//     producerId: number,
//     _to: RouteLocationNormalizedLoaded & { params: { producerId: number } },
//     _next: () => void
// ) => {
//     const store = useStore();
//     const userId = store.state.user!.user.id;
//     console.log('producerId', producerId);
//     console.log('userId', userId);
//     // console log requiredProducer before and after the loop
//     _to.matched.forEach((record: { meta: { requiredProducer: boolean } }) => {
//         console.log('requiredProducer1', record.meta.requiredProducer);
//     });

//     if (
//         producerId === userId &&
//         userId !== undefined &&
//         producerId !== undefined
//     ) {
//         // User is the producer, set requiredProducer to true
//         _to.matched.forEach(
//             (record: { meta: { requiredProducer: boolean } }) => {
//                 record.meta.requiredProducer = true;
//                 console.log('requiredProducer2', record.meta.requiredProducer);
//             }
//         );
//     } else {
//         // User is not the producer, set requiredProducer to false
//         _to.matched.forEach(
//             (record: { meta: { requiredProducer: boolean } }) => {
//                 record.meta.requiredProducer = false;
//                 console.log('requiredProducer3', record.meta.requiredProducer);
//             }
//         );
//     }

//     _next();
// };
export default router;
