import axios from "axios";
import Vue from "vue";
import { Toast } from "vant";
import Util from "../util.js";
import vuex from "../store.js";
Vue.use(Toast);
// axios 默认配置
axios.defaults.timeout = 3000; // 超时默认设置
axios.defaults.baseURL = "http://192.168.3.88:8089"; // 默认baseUR
// axios.defaults.responseType = 'json' // 默认数据相应类型
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true; // 表示跨域请求时是否需要使用凭证
// 请求拦截器
axios.interceptors.request.use(
  req => {
    if (axios.defaults.timeout > 1000) {
      vuex.commit("showLodingShow");
    }
    const token = Util.getLocalStorage("App_token");
    //请求头添加token
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);
// axios.interceptors.request.use(config => {
//   Vue.$vux.loading.show({
//     text: 'Loading'
//   })
//   return config
// }, error => {
//   setTimeout(() => {
//     Vue.$vux.loading.hide();
//     Vue.$vux.toast.text('加载超时', 'middle')
//   }, 3000)
//   return Promise.reject(error)
// })
// // http响应拦截器
// axios.interceptors.response.use(data => { // 响应成功关闭loading
//   Vue.$vux.loading.hide()
//   return data
// }, error => {
//   setTimeout(() => {
//     Vue.$vux.loading.hide()
//     Vue.$vux.toast.text('请求失败', 'middle')
//   }, 1000)
//   return Promise.reject(error)
// })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      vuex.commit("hideLodingShow");
      return Promise.resolve(response);
    } else {
      vuex.commit("hideLodingShow");
      return Promise.reject(response);
    }
  },
  error => {
    if (error || error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          this.$router.replace({
            path: "/login",
            query: {}
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true
          });
          // 清除token
          localStorage.removeItem("token");
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            this.$router.replace({
              path: "/login",
              query: {}
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Toast("网络请求不存在");
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);
export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post(url, data, config) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete(url, params, config = {}) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, params, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
