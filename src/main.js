import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import Http from "./http/http.js";
import { Lazyload } from "vant";
import util from "./util.js";
Vue.prototype.$util = util;
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Vant);
Vue.prototype.$http = Http;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   console.log(next)
// })
