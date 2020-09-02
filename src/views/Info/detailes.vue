<template>
	<div v-cloak>
		<el-form ref="detailesform" :model="detailesData" label-width="80px">
			<el-form-item label="信息分类:">
				<el-select placeholder="请选分类" v-model="detailesData.categoryId">
					<el-option :key="item.id" v-for="item in categoryData.item" :label="item.category_name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="信息标题:">
				<el-input style="width: 400px;" v-model="detailesData.title"></el-input>
			</el-form-item>
			<el-form-item label="缩略图:">
				<uploadGroup :CDetailesData="detailesData"></uploadGroup>
			</el-form-item>
			<el-form-item label="发布日期:">
				<el-date-picker v-model="detailesData.updateDate" :disabled='true' type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss"
				 value-format="yyyy-MM-dd HH:mm:ss">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="编辑器:" style="height: 500px;">
				<quill-editor class="editor" v-model="detailesData.content" ref="myQuillEditor" :options="editorOption">
				</quill-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="loading" @click="handleSubmit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		quillEditor
	} from 'vue-quill-editor'
	import uploadGroup from '@/components/upload-group/index.vue'
	import {
		getList,
		editInfo
	} from "@/api/news"
	import {
		common
	} from "@/api/common"
	import {
		dateFormat
	} from '@/utils/global'
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api"

	export default {
		components: {
			uploadGroup
		},
		setup(props, context) {
			const {
				UploadImgToken,
				Arrs
			} = common()
			const loading = ref(false)
			// 分类数组
			const categoryData = reactive({
				item: {}
			})
			// 副文本系列
			const editorOption = reactive({})
			// 表单
			const detailesData = reactive({
				id: context.root.$route.id || context.root.$store.state.detailes.id,
				title: context.root.$route.title || context.root.$store.state.detailes.title,
				updateDate: '',
				content: '',
				categoryId: '',
				imgUrl: '',//由于后台接口原因，上传图片组件尚未完善
				uplaodkey: {
					token: '',
					key: ''
				}
			})


			// 保存
			const handleSubmit = () => {
				loading.value = true
				editInfo(detailesData).then(res => {
					let data = res.data
					if (data.resCode === 0) {
						context.root.$message({
							type: 'success',
							message: data.message
						});
						loading.value = false
						context.root.$router.push('infoIndex')
					}
				}).catch(err => {
					loading.value = false
				})
			}
			// 生命周期
			onMounted(() => {
				GetCategoryAll()
				GetList()
				// 获取七牛token
				UploadImgToken()

			})
			watch(() => Arrs.item, (value) => {
				detailesData.uplaodkey.token = value.token
			})

			// 获取信息列表
			const GetList = () => {
				let data = reactive({
					categoryId: '',
					startTiem: '',
					endTime: '',
					title: '',
					id: '',
					pageNumber: 1,
					pageSize: 10,
				})
				getList(data).then(res => {
					const data = res.data
					if (data.resCode === 0) {
						let filterData = data.data.data.filter(item => item.id == detailesData.id)[0]
						detailesData.updateDate = dateFormat(filterData.createDate)
						detailesData.content = filterData.content
						detailesData.categoryId = filterData.categoryId
						detailesData.imgUrl = filterData.imgUrl
					}
				}).catch(err => {})
			}
			// 获取分类
			const GetCategoryAll = () => {
				context.root.$store.dispatch('detailes/GetCategoryAll').then(response => {
					categoryData.item = response
				}).catch(error => {})
			}
			return {
				// ref
				loading,
				// 数组
				detailesData,
				categoryData,
				editorOption,

				// 函数
				handleSubmit,


			}
		}
	}
</script>

<style lang="less" scoped>
	.editor {
		height: 400px;
		width: 800px;
	}
</style>
