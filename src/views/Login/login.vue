<template>
	<div id="login">
		<div>
			<div class="tab">
				<el-button @click="handleSwitchHide(1)" :type="switchHide?'success':''">登陆</el-button>
				<el-button @click="handleSwitchHide(2)" :type="switchHide==false?'success':''">注册</el-button>
			</div>
			<el-form ref="form" :model="form" label-width="80px" v-show="switchHide">
				<p>邮箱</p>
				<el-input v-model="form.name"></el-input>
				<p>密码</p>
				<el-input v-model="form.name"></el-input>
				<p>验证码</p>
				<div class="erificationCode">
					<el-input style="width: 62%;" v-model="form.name"></el-input>
					<div class="btwrap">
						<el-button type="primary">获取验证码</el-button>
						<span>默认状态</span>
					</div>
				</div>
				<el-button style="width: 100%;margin-top: 30px;" type="danger" @click="handleSubmit">登陆</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				switchHide: true,
				form: {
					name: '',
					password: ''
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
			handleSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style scoped lang="less">
	#login {
		background-color: #00b8ff;
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

	.erificationCode {
		.display-align-justify;

		.btwrap {
			position: relative;

			span {
				position: absolute;
				left: 0;
				bottom: -22px;
				color: #ccc;
				font-size: 12px;
				text-align: center;
				width: 100%;
			}
		}
	}

	p {
		margin: 20px 0 10px;
		color: #fff;
		font-size: 15px;
	}
</style>
