<template>
	<div id="nav-wrap" :class="[!isCollapse?'open':'close']">
		<img :class="[!isCollapse?'bigLogo':'smallLogo']" src="@/assets/images/logo.png" alt="">
		<el-row class="tac">
			<el-col>
				<el-menu default-active="2" router class="el-menu-vertical-demo" background-color="transparent" text-color="#fff"
				 :collapse="isCollapse" active-text-color="#fff">
					<template v-for="(item,index) in routerList">
						<el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
							<template slot="title">
								<svg-icon :iconClass="item.meta.iconfont" :className="item.meta.iconfont"></svg-icon>
								<span>{{item.meta.name}}</span>
							</template>
							<template v-for="(subItem,index) in item.children">
							<el-menu-item :index="subItem.path" v-if="!subItem.hidden">{{subItem.meta.name}}</el-menu-item>
							</template>
						</el-submenu>
					</template>

				</el-menu>
			</el-col>
		</el-row>

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
			// data数据
			var routerList = reactive(context.root.$router.options.routes)
			// 函数
			const isCollapse = computed(() => context.root.$store.state.app.collapse)
			// 生命周期

			return {
				routerList,
				isCollapse
			}
		}
	}
</script>

<style lang="less" scoped>
	#nav-wrap {
		position: fixed;
		left: 0;
		top: 0;
		width: @navMenu;
		height: 100vh;
		background-color: #344a5f;

		.bigLogo {
			vertical-align: middle;
			margin: 0px auto;
			display: block;
			width: 100px;
			padding: 30px 0;
		@include webkit(transition,0.3s);
		}

		.smallLogo {
			vertical-align: middle;
			margin: 0px auto;
			display: block;
			width: 30px;
			padding: 30px 0;
			@include webkit(transition,0.3s);
		}

		svg {
			font-size: 20px;
			margin-right: 10px;

			&.console {
				height: 0.8em;
			}
		}
	}

	.open {
		width: @navMenu;
		.transitions();
	}

	.close {
		width: @navMenuMin  !important;
		.transitions();
	}
</style>
