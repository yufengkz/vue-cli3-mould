import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/store'
import axiosIns from './assets/lib/api/axiosIns'
import MuseUI from 'muse-ui' //museUI
import 'muse-ui/dist/muse-ui.css'
import Helpers from 'muse-ui/lib/Helpers' //工具类 过渡动画、四个指令、波纹效果
import Loading from 'muse-ui-loading' //muse Loading
import 'muse-ui-loading/dist/muse-ui-loading.css' // load css
import './assets/js/common'

// 如果是非线上环境，加载 VConsole
import VConsole from 'vconsole'
if (process.env.VUE_APP_ENV !== 'production') {
	new VConsole()
	//开启性能追踪
	Vue.config.performance = true
}
console.log(`当前环境：${process.env.VUE_APP_ENV}`)

Vue.use(MuseUI) //使用MuseUI框架
Vue.use(Helpers) //工具类 过渡动画、四个指令、波纹效果
Vue.use(Loading) //挂载Loading组件 let loading = this.$loading | let loading= Loading({})  loading.close()  API:https://muse-ui.org/#/zh-CN/loading

Vue.config.productionTip = false

// 将API方法绑定到全局
/*
 * 1 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 2 axios是封装在main.js里面的，是为了获取vue实例操作store、router
 * 3 组件里面使用this.$axios.get 或 this.$axios.post 调用  使用debugger，查看接口返回数据的走向
 */
let ajaxMethod = ['get', 'post', 'delete', 'patch', 'put'] //patch 修改  post 添加  put 修改
let api = {}
ajaxMethod.forEach(method => {
	//数组取值的两种方式
	api[method] = (uri, data, config) => {
		return new Promise(function (resolve, reject) {
			axiosIns[method](uri, data, config).then(response => {
				//请求成功
				if (response.status === 200) {
					resolve(response)
				} else {
					reject(response)
				}
			}).catch(response => {
				reject(response)
			})
		})
	}
})
Vue.prototype.$axios = api

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
