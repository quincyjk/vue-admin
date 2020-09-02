import Vue from "vue";
import VueRouter from "vue-router";

// 引入布局组件
import Layout from '@/views/Layout'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
	redirect:'login',
	meta:{name:'主页'},
	hidden:true
  },
  {
    path: "/login",
    name: "Login",
    component: () =>import("../views/Login/index.vue"),
	meta:{name:'登陆'},
	hidden:true
  },
  {
    path: "/console",
    name: "Console",
	redirect:'Index',
    component:Layout,
	meta:{name:'控制台',iconfont:'console'},
	children:[{
		path: "/index",
		name: "Index",
		component: () =>import("../views/Console/index.vue"),
		meta:{name:'首页'}
	}]
  },
  {
    path: "/info",
    name: "Info",
    component: Layout,
	meta:{name:'信息管理',iconfont:'info'},
	children:[{
		path: "/infoIndex",
		name: "infoIndex",
		component: () =>import("../views/Info/index.vue"),
		meta:{name:'信息列表'}
	},
	{
		path: "/category",
		name: "Category",
		component: () =>import("../views/Info/category.vue"),
		meta:{name:'信息分类'}
	},
	{
		path: "/detailes",
		name: "Detailes",
		hidden:true,
		component: () =>import("../views/Info/detailes.vue"),
		meta:{name:'信息详情'}
	}]
  },{
    path: "/user",
    name: "User",
    component: Layout,
	meta:{name:'用户管理',iconfont:'user'},
	children:[{
		path: "/userIndex",
		name: "UserIndex",
		component: () =>import("../views/User/index.vue"),
		meta:{name:'用户列表'}
	}]
  }
];

const router = new VueRouter({
  routes
});

export default router;
