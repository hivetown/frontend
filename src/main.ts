import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { key, store } from '@/store';
import router from './router';

//
import BootstrapVue3, { BCarousel, BCarouselSlide } from 'bootstrap-vue-3';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(store, key);
app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);
app.use(router);

app.component('BCarousel', BCarousel);
app.component('BCarouselSlide', BCarouselSlide);

app.mount('#app');
