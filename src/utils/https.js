import axios from 'axios'
import {
	Message
} from 'element-ui';
import {getToken,getUsername} from '@/utils/app'
// 前端API，地址 http://www.web-jshtml.cn/productApi
// 创建axios,赋给变量service
var BASEURL = process.env.NODE_ENV === "production" ? process.env.VUE_APP_API : process.env.VUE_APP_API
const service = axios.create({
	baseURL: BASEURL,
	timeout: 15000,
});
// 添加请求拦截器
service.interceptors.request.use(function(config) {
	config.headers['Tokey'] = getToken()
	config.headers['UserName'] =getUsername()
	// 在发送请求之前做些什么
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function(response) {

	// 对响应数据做点什么
	var data = response.data
	if (data.resCode != 0) {
		Message.error(data.message);
		return Promise.reject(data)
	} else {
		return response;
	}
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});


// 没有使用default时,可以同时声明多个export
// 文件import需要花括号

export default service
