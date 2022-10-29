import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import PrimeVue from "primevue/config";

const app = createApp(App);
app.use(PrimeVue);

app.mount("#app");
