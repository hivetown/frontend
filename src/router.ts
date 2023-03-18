import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import CategoriasProdutos from "./views/CategoriasProdutos.vue";
import Favourites from "./views/Favourites.vue";
import Cart from "./views/Cart.vue";
import Product from "./views/Product.vue";
import User from "./views/User.vue";

const routes = [
    {
        path: "/",
        name: "Página principal",
        component: Home,
    },
    {
        path: "/sobre",
        name: "Sobre",
        component: About,
    },
    {
        path: "/products",
        name: "Produtos",
        component: CategoriasProdutos,
        // props: (route) => ({
        //     page: parseInt(route.query.page) || 1,
        //     pageSize: parseInt(route.query.pageSize) || 24,
        //     sort: route.query.sort || "name:asc"
        // }),
    },
    {
        path: "/favoritos",
        name: "Favoritos",
        component: Favourites,
    },
    {
        path: "/carrinho",
        name: "Cart",
        component: Cart,
    },
    // O link para o produto deveria ter o seu nome ou id
    {
        path: "/produto",
        name: "Produto",
        component: Product,
    },
    {
        path: "/conta",
        name: "Conta",
        component: User,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
