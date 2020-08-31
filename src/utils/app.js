import cookies from "cookie_js";

const adminToken ="admin_token"
const userName ="user_name"


// 增加removeToken
export function setToken(token){
	return cookies.set(adminToken,token);
}
// 获取removeToken
export function getToken(){
	return cookies.get(adminToken);
}

// 删除removeToken
export function removeToken(){
	return cookies.remove(adminToken);
}
// 增加Username
export function setUsername(token){
	return cookies.set(userName,token);
}
// 获取Username
export function getUsername(){
	return cookies.get(userName);
}
// 删除Username
export function removeUsername(){
	return cookies.remove(userName);
}
