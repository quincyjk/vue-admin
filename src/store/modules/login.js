import {
	Login
} from "@/api/login";
import {setToken,setUsername,getUsername,removeUsername,removeToken} from '@/utils/app'

//state
const state = {
	to_ken:'',
	username:getUsername() || '',
}
const mutations = {
	SET_TOKEN(state,value){
		state.to_ken=value
	},
	SET_USERNAME(state,value){
		state.username=value
	}
}
const actions = {
	// 登陆
	Login(context, data) {
		return new Promise((reslove, reject) => {
			// 登陆
			Login(data).then(res => {
				const data = res.data.data
				setToken('admin_token',data.token)
				setUsername('user_name',data.username)
				context.commit('SET_TOKEN',data.token)
				context.commit('SET_USERNAME',data.username)
				reslove(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 退出
	Exit(context, data){
		return new Promise((reslove,reject)=>{
			removeToken()
			removeUsername()
			context.commit('SET_TOKEN','')
			context.commit('SET_USERNAME','')
			reslove()
		})
	}
}
const getters = {

}
export default {
	 namespaced:true, //用于在全局引用此文件里的方法时标识这一个的文件名
	state,
	actions,
	getters,
	mutations
}
