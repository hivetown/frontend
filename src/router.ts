import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Product from "./views/Product.vue";
import Teste from "./views/Teste.vue";

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
        path: "/produto",
        name: "Produto",
        component: Product,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
