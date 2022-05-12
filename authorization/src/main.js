import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';


const app = createApp(App)

for (let i in ElementPlusIconsVue) {
    app.component(i, ElementPlusIconsVue[i])
}

app.use(store);
app.use(router);
app.use(Element);
app.use(BootstrapIconsPlugin);
// app.use(VueSocketio, socketio)


app.mount('#app');
