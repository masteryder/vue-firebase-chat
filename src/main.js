import { createApp } from 'vue';


require('dotenv').config()
import App from './App.vue'
import 'bulma/bulma.sass'
import { firestorePlugin } from 'vuefire'


let app = createApp(App);
app.use(firestorePlugin)

app.config.productionTip = false;

app.mount('#app');