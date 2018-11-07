import Vue from "vue";
import App from "./App.vue";
import router from "./routes/router";
import store from "./store/store";
import axiosIns from "./assets/js/axiosIns";

Vue.config.productionTip = false;

// 将API方法绑定到全局
/*
 * 1 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 2 axios是封装在main.js里面的，是为了获取vue实例操作store、router
 * 3 组件里面使用this.$axios.get 或 this.$axios.post 调用  使用debugger，查看接口返回数据的走向
 */
let ajaxMethod = ["get", "post", "delete", "patch", "put"]; //patch 修改  post 添加  put 修改
let api = {};
ajaxMethod.forEach(method => {
  //数组取值的两种方式
  api[method] = (uri, data, config) => {
    return new Promise(function(resolve, reject) {
      axiosIns[method](uri, data, config).then(response => {
        //请求成功
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  };
});
Vue.prototype.$axios = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
