import Vue from 'vue';
import Router from 'vue-router';
import {routes} from './routes'
import {setTitle} from "../assets/js/tools"

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})

//
router.beforeEach((to, from, next) => {
	//console.log(to);
	// console.log(from);
	// console.log(next);
	let token = ''
	if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
		if (token) { // 判断当前的token是否存在

		} else {
			next()
		}
	}
	next()
})

router.afterEach((to, from) => {
	// 更改标题
	setTitle(to.meta.title)
	//console.log(from);

})

export default router



