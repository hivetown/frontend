import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import BootstrapVue3, { BCarousel, BCarouselSlide } from 'bootstrap-vue-3';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { key, store } from '@/store';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);
app.use(store, key);
app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);
app.use(router);

app.component('BCarousel', BCarousel);
app.component('BCarouselSlide', BCarouselSlide);

app.mount('#app');
