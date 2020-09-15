import router from '../index'
import store from '@/store/index'
import {getToken,removeToken,removeUsername} from '@/utils/app'

const whiteRouter = ['/login'] //indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1

router.beforeEach((to,form,next)=>{
	if(getToken()){
		
		if(to.path === '/login'){
			removeToken()
			removeUsername()
			store.commit('login/SET_TOKEN','')
			store.commit('login/SET_USERNAME','')
			 next()
		}else{
			// 获取角色
			// 动态分配路由权限
			/* 
				1、是,时候处理动态路由
				2、以什么条件处理
			 */
					
			if(store.getters['permit/roles'].length==0){
				store.dispatch('permit/GetRouls').then(res=>{
					let roles =res
					store.commit('permit/SET_BUTTON_PERM',roles.btnPerm)
					store.dispatch('permit/createRouter',roles.role).then(res=>{
						let addRouters =store.getters['permit/addRouter']
						let allRouters =store.getters['permit/allRouter']
						router.options.routes = allRouters
						router.addRoutes(addRouters)
						next({...to,replace:true})
					})
				})
			
			}else{
				next()
			}
		}
		
	}else{
		if(whiteRouter.indexOf(to.path) !=-1){
			next()
		}else{
			next('/login')
		}
		// 1、直接进入index的时候，参数to被改变成了"/index",触发了路由指向，就会跑beforeEach
		// 2、再一次next指向了login，再次发生路由指向，再跑beforeEach,参数的to为"/login"
		// 3、白名单判断存在，则直接执行next(),因为没有参数，所以不会再次跑beforeEach
	}
	
})