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

const app = createApp(App);

app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);

app.component("b-carousel", BCarousel);
app.component("b-carousel-slide", BCarouselSlide);
//

app.use(router);

app.mount("#app");
