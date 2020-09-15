import {getUserRole} from '@/api/user.js'
import {defaultRouterMap,anyscRouterMap} from '@/router/index.js'

//state
const state = {
	roles:[],
	allRouter:defaultRouterMap,
	addRouter:[],
	buttonPermList:[]
}
const mutations = {
	SETROLE(state,value){
		state.roles=value
	},
	SET_ASYNC_ROUTER(state,router){
		state.addRouter=router
		state.allRouter=defaultRouterMap.concat(router)
	},
	SET_BUTTON_PERM(state,vlaue){
		state.buttonPermList=vlaue
	}
}
const actions = {
	GetRouls(context,repuesData){
		return new Promise((resolve,reject)=>{
			getUserRole().then(res=>{
				context.commit('SETROLE',res.data.data.role)
				resolve(res.data.data)
			})
		})
	},
	createRouter(context,repuesData){
		return new Promise((resolve,reject)=>{
			let role =repuesData
			let addRouter
				if(role.includes('admin')){
					addRouter =anyscRouterMap
				}else{
					addRouter=anyscRouterMap.filter(item=>{
						if(role.includes(item.meta.system)){
							return item
						}
					})
					addRouter.push(anyscRouterMap[anyscRouterMap.length-1]);
				}
			context.commit('SET_ASYNC_ROUTER',addRouter)
			resolve()
		})
	}
}
const getters = {
	roles:state=>state.roles,
	allRouter:state=>state.allRouter,
	addRouter:state=>state.addRouter,
	buttonPermList:state=>state.buttonPermList
}
export default {
	 namespaced:true, //用于在全局引用此文件里的方法时标识这一个的文件名
	state,
	actions,
	getters,
	mutations
}
