import Vue from "vue";
import VueRouter from "vue-router";

// 引入布局组件
import Layout from '@/views/Layout'

//1、系统分配。2、角色分配

// 1、默认路由
export const defaultRouterMap = [{
		path: "/",
		redirect: 'login',
		meta: {
			name: '主页'
		},
		hidden: true
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login/index.vue"),
		meta: {
			name: '登陆'
		},
		hidden: true
	},
	{
		path: "/console",
		name: "Console",
		redirect: 'Index',
		component: Layout,
		meta: {
			name: '控制台',
			iconfont: 'console'
		},
		children: [{
			path: "/index",
			name: "Index",
			component: () => import("../views/Console/index.vue"),
			meta: {
				name: '首页'
			}
		}]
	}, {
		path: "/Page404",
		component: Layout,
		hidden:true,
		meta: {
			name: '404',
			iconfont: 'console'
		},
		children: [{
			path: "/404",
			name: "404",
			component: () => import("../views/Page404/index.vue"),
			meta: {
				name: '404'
			}
		}]
	}

];
// 2、动态路由
export const anyscRouterMap = [{
	path: "/info",
	name: "Info",
	component: Layout,
	meta: {
		name: '信息管理',
		iconfont: 'info',
		system: 'infoSystem'
	},
	children: [{
			path: "/infoIndex",
			name: "infoIndex",
			component: () => import("../views/Info/index.vue"),
			meta: {
				name: '信息列表'
			}
		},
		{
			path: "/category",
			name: "Category",
			component: () => import("../views/Info/category.vue"),
			meta: {
				name: '信息分类'
			}
		},
		{
			path: "/detailes",
			name: "Detailes",
			hidden: true,
			component: () => import("../views/Info/detailes.vue"),
			meta: {
				name: '信息详情'
			}
		}
	]
}, {
	path: "/user",
	name: "User",
	component: Layout,
	meta: {
		name: '用户管理',
		iconfont: 'user',
		system: 'userSystem'
	},
	children: [{
		path: "/userIndex",
		name: "UserIndex",
		component: () => import("../views/User/index.vue"),
		meta: {
			name: '用户列表'
		}
	}]
},{
		path:"*",
		redirect:'/404',
		hidden:true,
	}]


Vue.use(VueRouter);

const routes = defaultRouterMap

const router = new VueRouter({
	routes
});

export default router;
