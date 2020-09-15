import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import login from './modules/login'
import detailes from './modules/infoDetailes'
import permit from './modules/permit'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' //在非生产环境下，使用严格模式

export default new Vuex.Store({
	modules:{
		user,
		app,
		login,
		detailes,
		permit
	},
	strict: debug,
});