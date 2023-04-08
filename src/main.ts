import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";

//
import BootstrapVue3, { BCarousel, BCarouselSlide } from "bootstrap-vue-3";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);
import store from './store'

app.use(store);


app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);

app.component("b-carousel", BCarousel);
app.component("b-carousel-slide", BCarouselSlide);
//

app.use(router);

app.mount("#app");



