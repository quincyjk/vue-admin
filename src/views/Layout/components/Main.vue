<template>
	<div id="main-wrap"  :class="[!isCollapse?'open':'close']">
		 <keep-alive>
		 <router-view v-if="$route.meta.keepAlive"></router-view>
		 </keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	import {
		reactive,
		ref,
		onMounted,
		computed
	} from "@vue/composition-api";
	export default {
		setup(props, context) {
			// 函数
			const isCollapse = computed(() => context.root.$store.state.app.collapse)
			
			return {
					isCollapse
			}
		}
	}
</script>

<style lang="less" scoped>
	#main-wrap{
		position: fixed;
		left: @navMenu;
		top: @headerMenu;
		right: 0;
		bottom: 0;
		-webkit-box-sizing: border-box;
		background-color: #fff;
		padding: 30px;
		border:31px solid #f7f7f7;
		overflow: auto;
	}
	.open {
		left: @navMenu;
		.transitions();
	}
	
	.close {
		left: @navMenuMin !important;
		.transitions();
	}
</style>
