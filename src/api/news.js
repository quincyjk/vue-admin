import https from "@/utils/https"


// 修改信息
export function editInfo(data){
	return https.request({
		method:"post",
		url:"/news/editInfo/",
		data,
	})
}
// 删除信息
export function deleteInfo(data){
	return https.request({
		method:"post",
		url:"/news/deleteInfo/",
		data,
	})
}
// 添加信息
export function add(data){
	return https.request({
		method:"post",
		url:"/news/add/",
		data,
	})
}
// 获取信息列表
export function getList(data){
	return https.request({
		method:"post",
		url:"/news/getList/",
		data,
	})
}
// 修改信息分类
export function editCategory(data){
	return https.request({
		method:"post",
		url:"/news/editCategory/",
		data,
	})
}
// 删除信息分类
export function deleteCategory(data){
	return https.request({
		method:"post",
		url:"/news/deleteCategory/",
		data,
	})
}
// 获取信息分类
export function getCategoryAll(){
	return https.request({
		method:"post",
		url:"/news/getCategoryAll/ ",
	})
}
//添加一级分类 
export function addFirstCategory(data){
	return https.request({
		method:"post",
		url:"/news/addFirstCategory/",
		data,
	})
}
//信息分类添加子级 
export function addChildrenCategory(data){
	return https.request({
		method:"post",
		url:"/news/addChildrenCategory/",
		data,
	})
}