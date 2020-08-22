<template>
	<div id="login">
		<div>
			<div class="tab">
				<el-button @click="handleSwitchHide(1)" :type="switchHide?'success':''">登陆</el-button>
				<el-button @click="handleSwitchHide(2)" :type="switchHide==false?'success':''">注册</el-button>
			</div>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
				<el-form-item class="item-list" prop="username">
					<label for="username">邮箱</label>
					<el-input id="username" type="text" v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item class="item-list" prop="password">
					<label for="password">密码</label>
					<el-input id="password" type="password" v-model="ruleForm.password" maxlength="20" minlength="6" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="item-list" prop="passwords" v-if="!switchHide">
					<label for="passwords">重复密码</label>
					<el-input id="passwords" type="password" v-model="ruleForm.passwords" maxlength="20" minlength="6" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="item-list" prop="code">
					<label for="code">验证码</label>
					<el-row :gutter="10">
						<el-col :span="15">
							<el-input id="code" v-model="ruleForm.code" maxlength="6" minlength="6"></el-input>
						</el-col>
						<el-col :span="9">
							<div class="btwrap">
								<el-button type="primary" @click="handleGetSms">获取验证码</el-button>
								<span>默认状态</span>
							</div>
						</el-col>
					</el-row>
				</el-form-item>
				<el-button :disabled="loginButtonStatus" style="width: 100%;margin-top: 30px;" type="danger" @click="handlesubmitForm('ruleForm')">{{switchHide?'登陆':'注册'}}</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		GetSms,
		Register,
		Login
	} from "@/api/login";
	import {
		reactive,
		ref,
		onMounted
	} from "@vue/composition-api";
	import {
		stripscripts,
		validateEmails,
		validatepass,
		validateCodes
	} from '@/utils/validate';
	export default {
		setup(props, context) {
			// 验证用户名
			var validateEmail = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else if (validateEmails(value)) {
					callback(new Error('用户名输入有误'));
				} else {
					callback();
				}
			};
			// 验证密码
			var validatePassword = (rule, value, callback) => {
				ruleForm.password = stripscripts(value)
				value = ruleForm.password
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (validatepass(value)) {
					callback(new Error('密码为6至20位数+字母'));
				} else {
					callback();
				}

			};
			// 验证重复密码
			var validatePassword2 = (rule, value, callback) => {
				ruleForm.passwords = stripscripts(value)
				value = ruleForm.passwords
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			// 验证验证码
			var validateCode = (rule, value, callback) => {
				ruleForm.code = stripscripts(value)
				value = ruleForm.code
				if (value === '') {
					callback(new Error('请输入验证码'));
				} else if (validateCodes(value)) {
					callback(new Error('验证码输入有误'));
				} else {
					callback();
				}

			};
			// 模块切换值
			const switchHide = ref(true)
			// 登陆状态
			const loginButtonStatus = ref(true)
			// 表单绑定数据
			const ruleForm = reactive({
				username: '',
				password: '',
				passwords: '',
				code: '',
			})
			// 表单验证绑定
			const rules = reactive({
				username: [{
					validator: validateEmail,
					trigger: 'blur'
				}],
				password: [{
					validator: validatePassword,
					trigger: 'blur'
				}],
				passwords: [{
					validator: validatePassword2,
					trigger: 'blur'
				}],
				code: [{
					validator: validateCode,
					trigger: 'blur'
				}]
			});
			// 获取验证码
			const handleGetSms = (()=>{
			
				if(ruleForm.username==""){
					 context.root.$message.error('邮箱不能为空');
					 return false
				}else if(validateEmails(ruleForm.username)){
					context.root.$message.error('邮箱格式有误，请重新输入！！！');
					return false
				}
				GetSms({username:ruleForm.username,module:'login'}).then(res=>{
					var data =res.data
					if(data.resCode==0){
						
					}
				}).catch(err =>{
					// console.log(err)
				})
			})
			// 切换模块
			const handleSwitchHide = (e => {
				if (e == 1) {
					switchHide.value = true
				} else if (e == 2) {
					switchHide.value = false
				}
			})
			// 提交表单
			const handlesubmitForm = (formName => {
				context.refs[formName].validate((valid) => {
					if (valid) {
						var data = {
							username:ruleForm.username,
							password:ruleForm.password,
							code:ruleForm.code
						}
						if(switchHide.value==false){
							Register(data)
						}
						if(switchHide.value==true){
							Login(data)
						}
					} else {
						return false;
					}
				});
			})
			// 生命周期
			onMounted(() => {
			})
			// 返回值
			return {
				loginButtonStatus,
				switchHide,
				ruleForm,
				rules,
				handleSwitchHide,
				handlesubmitForm,
				handleGetSms
			}
		}
	}
</script>

<style scoped lang="less">
	#login {
		background-color: #276e8a;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		.display-align-justify(1)
	}

	.tab {
		text-align: center;
	}

	.item-list {
		margin-top: 13px;

		label {
			color: #fff;
		}
	}

	.btwrap {
		position: relative;

		span {
			position: absolute;
			left: 0;
			bottom: -35px;
			color: #ccc;
			font-size: 12px;
			text-align: center;
			width: 100%;
		}
	}

	p {
		margin: 20px 0 10px;
		color: #fff;
		font-size: 15px;
	}
</style>
