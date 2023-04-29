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
import store from './store';
import { useStore } from 'vuex';
import { onMounted, ref, watch } from 'vue';
// import { auth } from './components/firebase';
const auth = ref(null);
async function fetchUser() {
    try {
        await store.dispatch('fetchAuthUser'); // call the fetchUser action in the store
        // console.log('User data fetched');
    } catch (error) {
        console.error(error);
    }
}
onMounted(async () => {
    // console.log('Navbar mounted');
    await fetchUser(); // call fetchUser when the component is mounted
});
watch(
    () => store.state.auth,
    (newValue) => {
        auth.value = newValue;
    }
);

const isAuthenticated = () => {
    console.log('store.state.auth', store.state.auth);
    return store.state.auth !== null;
};
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

router.beforeEach(async (to, from, next) => {
    console.log('isAuthenticated', isAuthenticated());
    if (to.path === '/login' && isAuthenticated()) {
        // redirect to the home page if the user is already logged in
        next('/');
        return;
    }

    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !isAuthenticated()
    ) {
        // redirect to the login page if the user is not logged in
        console.log('n devia tar aqui upsi');
        next('/login');
        return;
    }

    next();
});

export default router;
