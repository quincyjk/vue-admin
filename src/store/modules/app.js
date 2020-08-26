import Cookies from "cookie_js"

if(Cookies.get('collapse')=='undefined'||Cookies.get('collapse')==undefined){
	Cookies.set('collapse',true)
}

const state = {
	collapse:JSON.parse(Cookies.get('collapse')) || false
}
const mutations = {
	SET_COLLAPSE(state){
		state.collapse =!state.collapse 
		Cookies.set('collapse',state.collapse )
	}
}
const actions = {
	
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
