import Vue from "vue";
import store from '@/store/index'

Vue.directive('buttonPerm', {
	
	 bind: function (el, binding, vnode) {
		 
		 store.dispatch('permit/GetRouls').then(res=>{
		 	let roles =res
			if(!roles.role.includes('admin')){
				if(binding.def.hasButtonPerm(binding.value)){
					el.className=el.className+" showBtnPerm"
				}else{
					el.className=el.className+" hieddenBtnPerm"
				}		 
			}
		
		 })
		 
	
		
	  },
	  inserted: function (el) {
		// 聚焦元素
	  },
	  hasButtonPerm:function(value){
		  let type =store.getters['permit/buttonPermList']
		  return type.indexOf(value) !=-1
	  }
})