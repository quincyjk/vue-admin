<template>
	<div id="heider-wrap" :class="[!isCollapse?'open':'close']">
		<div class="pull-left" @click="handleSwitch">
			<svg-icon class="padding-icon"  iconClass="meun" className="meun"></svg-icon>
		</div>
		<div class="pull-right">
			<div class="pull-left pull-info padding-icon">
				<img width="30px" style="vertical-align: middle;" src="@/assets/images/logo.png" alt="">
				{{username}}
			</div>
			<div class="pull-left padding-icon" @click="handleExit">
				<svg-icon iconClass="exit" className="exit"></svg-icon>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		reactive,
		ref,
		onMounted,
		computed
	} from "@vue/composition-api";
	import {removeUsername,removeToken} from '@/utils/app'
	export default {
		setup(props, context) {
			// 函数
			const handleSwitch = ()=>{
				context.root.$store.commit('app/SET_COLLAPSE')
			}
			const username = computed(() => context.root.$store.state.login.username)
			const isCollapse = computed(() => context.root.$store.state.app.collapse)
			const handleExit = ()=>{

				context.root.$store.dispatch('login/Exit').then(()=>{
					context.root.$router.push('/login')
				})
				
			}
			return {
				handleSwitch,
					isCollapse,
					username,
					handleExit
			}
		}
	}
</script>

<style lang="less" scoped>
	#heider-wrap {
		position: fixed;
		top: 0;
		right: 0;
		left: @navMenu;
		height: @headerMenu;
		background-color: #fff;
		-webkit-box-shadow: 0 3px 16px 0px rgba(0, 0, 0, 0.1);
		line-height: 75px;

		.meun {
			font-size: 30px;
			margin-top: 20px;
			cursor: pointer;
		}

		.exit {
			font-size: 25px;
			margin-top: 23px;
			cursor: pointer;
		}

		.padding-icon {
			padding: 0 20px;
		}

		.pull-info {
			height: 100%;
			border-right: 1px solid #ededed;
		}

	}
	.open {
		left: @navMenu;
		.transitions();
	}
	
	.close {
		left:@navMenuMin  !important;
		.transitions();
	}
</style>
