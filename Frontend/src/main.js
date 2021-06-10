import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'
import store from './store'
import axios from 'axios'
import moment from 'moment'

Vue.use(ElementUI);
Vue.config.productionTip = false;

//Vue对象添加原型，属性名是ajax
Vue.prototype.$ajax = axios;

Vue.prototype.$moment = moment;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
