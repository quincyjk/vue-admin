<template>
		<el-upload
		  list-type="picture-card"
		  :show-file-list="false">
		  <img v-if="CDetailesData.imgUrl" :src="CDetailesData.imgUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
</template>

<script>
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api";
	export default{
		props:{
			CDetailesData:{
				type:Object
			}
		},
		setup(props,context){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.avatar-uploader .el-upload {
	
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		    width: 148px;
		    height: 100%;
		line-height: 146px;
		box-sizing: border-box;
		text-align: center;
	}
	
	.avatar {
		width: 148px;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
