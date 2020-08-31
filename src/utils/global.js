import {
	MessageBox,
	Message
} from 'element-ui';

// vue 2.0全局写法

// export default{
// 	install (Vue,options){
// 		Vue.prototype.confirm = function(parmes){
// 			MessageBox.confirm(parmes.title, '提示', {
// 				confirmButtonText: '确定',
// 				cancelButtonText: '取消',
// 				type: 'warning',
// 				center: true
// 			}).then(() => {
// 				Message({
// 					type: 'success',
// 					message: '删除成功!'
// 				});
// 				parmes.fn && parmes.fn()

// 			}).catch(() => {
// 				Message({
// 					type: 'info',
// 					message: '已取消删除'
// 				});
// 			});
// 		}
// 	}
// }

// vue 3.0全局写法用法按需要引入
import {
	reactive,
	ref,
	onMounted,
	computed
} from "@vue/composition-api";

export function global(){
	var str =ref('')
		var confirm = (parmes) => {
			MessageBox.confirm(parmes.title || '删除后无法恢复!!!',  {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
			}).then(() => {
				Message({
					type: 'success',
					message: '删除成功!'
				});
				 parmes.id &&parmes.id()
				 parmes.fn && parmes.fn()
			}).catch(() => {
				Message({
					type: 'info',
					message: '已取消删除'
				});
				 parmes.fnCatch && parmes.fnCatch()
			});
		}
		
		return{
			confirm
		}
}

//格式化日期
 export function dateFormat(timestamp) {
	    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    var D = date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
	    var s = date.getSeconds();
	    return Y + M + D + h + m + s;
	}

