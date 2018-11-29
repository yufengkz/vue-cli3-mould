//
import Home from '../views/Home'
let isAuth = [
]

let otherRouter = [
	{
		path: '/',
		title: 'Home',
		redirect: '/home'
	},
	{
		name: 'home',
		title: 'Home',
		component: Home
	},
	{
		name: 'about',
		component: () => import('../views/About.vue'),
		title: 'About'
	},
]

function children(item) {
	let obj = {
		...item,
		meta: {
			title: item.title
		},
		path: item.name
	}
	item.children && item.children.length > 0 && (obj.children = item.children.map(children))
	return obj
}

isAuth = isAuth.map(item => ({
	...item,
	meta: {
		title: item.title || '',
		requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
	},
	path: item.path ? item.path : '/' + item.name,
	children: item.children && item.children.length > 0 ? item.children.map(children) : []
}))
otherRouter = otherRouter.map(item => ({
	...item,
	meta: {
		title: item.title || ''
	},
	path: item.path ? item.path : '/' + item.name,
	children: item.children && item.children.length > 0 ? item.children.map(children) : []
}))

export const routes = [
	...isAuth, ...otherRouter
]
