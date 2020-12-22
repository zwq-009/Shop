import Cookies from "js-cookie";
const TokenKey = "Authorization";
export default {
  /*
   * 设置setLocalStorage
   * */
  setLocalStorage(key, value) {
    window.localStorage.setItem(key, window.JSON.stringify(value));
  },
  /*
   * 获取getLocalStorage
   * */
  getLocalStorage(key) {
    return window.JSON.parse(window.localStorage.getItem(key) || "[]");
  },
  /*
   * 移除本地token
   * */
  removeLocal(key) {
    window.localStorage.removeItem(key);
  },
  /*
   * 设置setSessionStorage
   * */
  setSessionStorage(key, value) {
    window.sessionStorage.setItem(key, window.JSON.stringify(value));
  },
  /*
   * 获取getSessionStorage
   * */
  getSessionStorage(key) {
    return window.JSON.parse(window.sessionStorage.getItem(key) || "[]");
  },
  /*
   * 获取getToken
   * */
  getToken() {
    return Cookies.get(TokenKey);
  },
  /*
   * 设置setToken
   * */
  setToken(token) {
    return Cookies.set(TokenKey, token);
  },
  /*
   * 移除removeToken
   * */
  removeToken() {
    return Cookies.remove(TokenKey);
  }
};
