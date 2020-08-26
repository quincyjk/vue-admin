import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import login from './modules/login'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' //在非生产环境下，使用严格模式

export default new Vuex.Store({
	modules:{
		user,
		app,
		login
	},
	strict: debug,
});