import { createApp } from 'vue';
import router from './router'
import { firestorePlugin } from 'vuefire'

import App from './App.vue'

import 'bulma/bulma.sass'


let app = createApp(App);
app.use(firestorePlugin)
app.use(router);
app.config.productionTip = false;
app.mount('#app');