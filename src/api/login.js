import https from "@/utils/https"
// 获取验证码
export function GetSms(data){
	return https.request({
		method:"post",
		url:"/getSms/",
		data,
		// data:data左边的data是变量名（key）后台接收的。右边的的data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（es6写法）
	})
}
// 注销
export function Logout(data){
	return https.request({
		method:"post",
		url:"/logout/",
		data,
	})
}
// 登陆
export function Login(data){
	return https.request({
		method:"post",
		url:"/login/",
		data,
	})
}
// 注册
export function Register(data){
	return https.request({
		method:"post",
		url:"/register/",
		data,
	})
}