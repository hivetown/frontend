import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import CategoriasProdutos from "./views/CategoriasProdutos.vue";
import Favourites from "./views/Favourites.vue";
import Cart from "./views/Cart.vue";
import Product from "./views/Product.vue";
import User from "./views/User.vue";

//adicionei
import OrderHistory from "./views/OrderHistory.vue";


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
        path: "/produtos",
        name: "Produtos",
        component: CategoriasProdutos,
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

    //adicionei
    {
        path: "/encomendas",
        name: "OrderHistory",
        component: OrderHistory,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
