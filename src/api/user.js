import https from "@/utils/https"

// 获取按钮权限
export function permButton(data){
	return https.request({
		method:"post",
		url:"/permButton/",
		data,
	})
}
// 用户角色
export function getUserRole(data={}){
	return https.request({
		method:"post",
		url:"/userRole/",
		data,
	})
}
// 获取角色
export function getRole(data){
	return https.request({
		method:"post",
		url:"/role/",
		data,
	})
}
// 用户系统
export function getSystem(data){
	return https.request({
		method:"post",
		url:"/system/",
		data,
	})
}

// 用户编辑
export function edit(data){
	return https.request({
		method:"post",
		url:"/user/edit/",
		data,
	})
}
// 用户删除
export function deleteUser(data){
	return https.request({
		method:"post",
		url:"/user/delete/",
		data,
	})
}
// 获取城市列表
export function cityPicker(data){
	return https.request({
		method:"post",
		url:"/cityPicker/",
		data,
	})
}

// 获取用户信息列表
export function getList(data){
	return https.request({
		method:"post",
		url:"/user/getList/",
		data,
	})
}

// 添加信息
export function add(data){
	return https.request({
		method:"post",
		url:"/user/add/",
		data,
	})
}