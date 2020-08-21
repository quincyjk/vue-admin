<template>
	<div id="login">
		<div>
			<div class="tab">
				<el-button @click="handleSwitchHide(1)" :type="switchHide?'success':''">登陆</el-button>
				<el-button @click="handleSwitchHide(2)" :type="switchHide==false?'success':''">注册</el-button>
			</div>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" >
				<el-form-item class="item-list" prop="username">
					<label>邮箱</label>
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item class="item-list" prop="password">
					<label>密码</label>
					<el-input type="password" v-model="ruleForm.password" maxlength="20" minlength="6" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="item-list" prop="passwords" v-if="!switchHide">
					<label>重复密码</label>
					<el-input type="password" v-model="ruleForm.passwords" maxlength="20" minlength="6" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="item-list" prop="code">
					<label>验证码</label>
					<el-row :gutter="10">
						<el-col :span="15">
							<el-input v-model="ruleForm.code" maxlength="6" minlength="6"></el-input>
						</el-col>
						<el-col :span="9">
							<div class="btwrap">
								<el-button type="primary">获取验证码</el-button>
								<span>默认状态</span>
							</div>
						</el-col>
					</el-row>
				</el-form-item>
				<el-button style="width: 100%;margin-top: 30px;" type="danger" @click="handlesubmitForm('ruleForm')">登陆</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		stripscripts,
		validateEmails,
		validatepass,
		validateCodes
	} from '@/utils/validate';
	export default {
		data() {
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
				this.ruleForm.password = stripscripts(value)
				value = this.ruleForm.password
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
				this.ruleForm.passwords = stripscripts(value)
				value = this.ruleForm.passwords
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			// 验证验证码
			var validateCode = (rule, value, callback) => {
				this.ruleForm.code = stripscripts(value)
				value = this.ruleForm.code
				if (value === '') {
					callback(new Error('请输入验证码'));
				} else if (validateCodes(value)) {
					callback(new Error('验证码输入有误'));
				} else {
					callback();
				}

			};
			return {
				switchHide: true,
				ruleForm: {
					username: '',
					password: '',
					passwords: '',
					code: '',
				},
				rules: {
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
				}
			}
		},
		methods: {
			handleSwitchHide(e) {
				if (e == 1) {
					this.switchHide = true
				} else if (e == 2) {
					this.switchHide = false
				}
			},
			 handlesubmitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			            console.log(valid)
			          } else {
			           
			            return false;
			          }
			        });
			      },
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
