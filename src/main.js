import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment';
import VueMoment from 'vue-moment';
import store from './store'

import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
moment.locale('en');
Vue.use(VueMoment, {
  moment
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')