import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import SupplierInfo from "./views/SupplierInfo.vue";

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
        path: "/producer/:id",
        name: "Producer",
        component: SupplierInfo,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
