import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import CategoriasProdutos from "./views/CategoriasProdutos.vue";
import Testes from "./views/Testes.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/produtos",
        name: "Produtos",
        component: CategoriasProdutos,
    },
    {
        path: "/products",
        name: "Products",
        component: Testes,
    },

    {
        path: "/testes",
        name: "Testes",
        component: Testes,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
