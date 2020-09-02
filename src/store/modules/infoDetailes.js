	import {
		getCategoryAll,
	}
	from "@/api/news"

const state = {
	id:'' || sessionStorage.getItem('infoDetailesId'),
	title:''|| sessionStorage.getItem('infoDetailesTitle'),
}
const mutations = {
	INFO_DETAILES_ID(state,value){
		for(let i in value){
			state[i]=value[i].value
			if(value[i].session){
				sessionStorage.setItem(value[i].sessionName,value[i].value);
			}
		}
	}
}
const actions = {
	GetCategoryAll(context){
		return new Promise((resolve,reject)=>{
			getCategoryAll().then(res=>{
				let data =res.data.data
				resolve(data)
			}).catch(err=>{
				reject(err)
			})
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
	mutations,
}
