<template>
		<svg :class="svgClass">
		    <use :xlink:href="iconName" />
		  </svg>
</template>

<script>
	import {
		reactive,
		ref,
		onMounted,
		computed
	} from "@vue/composition-api";
	export default {
		props: {
		    iconClass: { type: String, required: true }, //用户传的svg图片名字
		    className: { type: String } //用户svg图片自定义样式
		  },
		setup(props,context) {
			const iconName=computed(()=> `#icon-${props.iconClass}`) 
			const svgClass =computed(()=>{
				return props.className ? `svg-icon ${props.className}` : "svg-icon"; //用户如果传了就保留两者
			})
			return {
				iconName,
				svgClass
			}
		}
	}
</script>

<style lang="less" scoped>
	.svg-icon {
	  width: 1em;
	  height: 1em;
	  fill: currentColor;
	}
</style>
