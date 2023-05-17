import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import CategoriasProdutos from './views/CategoriasProdutos.vue';
import Favourites from './views/Favourites.vue';
import Cart from './views/Cart.vue';
import Product from './views/Product.vue';
import User from './views/User.vue';
import Product from './views/Product.vue';
import Teste from './views/Teste.vue';
import SupplierInfo from './views/SupplierInfo.vue';

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

export default router;
