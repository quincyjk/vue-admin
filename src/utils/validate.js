// 过滤所有特殊字符
export function stripscripts(s) {
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？↵\r\n]");
	var rs = "";
	for (var i = 0; i < s.length; i++) {
		rs = rs + s.substr(i, 1).replace(pattern, '');
	}
	return rs;
}
// 验证邮箱
export function validateEmails(s) {
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return !reg.test(s) ? true : false;
}
// 验证密码
export function validatepass(s) {
	let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	return !reg.test(s) ? true : false;
}

// 验证验证码
export function validateCodes(s) {
	let reg = /^[a-z0-9]{6}$/;
	return !reg.test(s) ? true : false;
}
