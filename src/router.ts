// import { createRouter, createWebHistory } from 'vue-router';

// import Home from './views/Home.vue';
// import About from './views/About.vue';
// import CategoriasProdutos from './views/CategoriasProdutos.vue';
// import Favourites from './views/Favourites.vue';
// import Cart from './views/Cart.vue';
// import Product from './views/Product.vue';
// import User from './views/User.vue';
// import ProductsProducer from './views/ProductsProducer.vue';
// import Testes from './views/Testes.vue';
// import Login from './views/Login.vue';
// import Registration from './views/Registration.vue';
// import AuthConsumer from './components/AuthConsumer.vue';
// import { auth } from './components/firebase';
// import Login from './views/Login.vue';
// import Registration from './views/Registration.vue';
// import AuthConsumer from './components/AuthConsumer.vue';

// import { useStore } from 'vuex';
// import { onMounted, ref, watch } from 'vue';
// import { store } from './store';

// const isAuthenticated = () => {
//     // console.log('store.state.auth', store.state.auth);
//     return store.state.user !== null;
// };
// const routes = [
//     {
//         path: '/',
//         name: 'Página principal',
//         component: Home,
//     },
//     {
//         path: '/sobre',
//         name: 'Sobre',
//         component: About,
//     },
//     {
//         path: '/produtos',
//         name: 'Produtos',
//         component: CategoriasProdutos,
//     },
//     {
//         path: '/favoritos',
//         name: 'Favoritos',
//         component: Favourites,
//         meta: {
//             requiresAuth: true,
//         },
//     },
//     {
//         path: '/carrinho',
//         name: 'Cart',
//         component: Cart,
//     },
//     // O link para o produto deveria ter o seu nome ou id
//     {
//         path: '/produto',
//         name: 'Produto',
//         component: Product,
//     },
//     {
//         path: '/conta',
//         name: 'Conta',
//         component: User,
//         meta: {
//             requiresAuth: true,
//         },
//     },
//     {
//         path: '/login',
//         name: 'Login',
//         component: Login,
//     },
//     {
//         path: '/registration',
//         name: 'Registration',
//         component: Registration,
//     },
//     {
//         path: '/authconsumer',
//         name: 'AuthConsumer',
//         component: AuthConsumer,
//     },
//     {
//         path: '/produtosprodutor',
//         name: 'produtosprodutor',
//         component: ProductsProducer,
//         meta: {
//             requiresAuth: true,
//         },
//     },
// ];

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });

// router.beforeEach(async (to, from, next) => {
//     if (!store.state.user) await store.dispatch('fetchAuthUser');

//     console.log('from', from);
//     console.log('to', to);
//     console.log('auth', store.state.user);
//     console.log('isAuthenticated', isAuthenticated());
//     if (
//         (to.path === '/login' || to.path === '/registration') &&
//         isAuthenticated()
//     ) {
//         // redirect to the home page if the user is already logged in
//         next(from);
//         return;
//     }

//     if (
//         to.matched.some((record) => record.meta.requiresAuth) &&
//         !isAuthenticated()
//     ) {
//         // redirect to the login page if the user is not logged in
//         console.log('n devia tar aqui upsi');
//         next('/login');
//         return;
//     }

//     next();
// });

// export default router;
