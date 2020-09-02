<template>
	<!-- 提示框 -->
	<el-dialog :title="editType==true?'修改':'新增'" :visible.sync="dialogInfoKey" width="580px" :modal-append-to-body='false'
	 @close="close" @open="opened">
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
			<el-form-item label="类别" prop="categoryId" :label-width="fromLabelWidth">
				<el-select clearable v-model="ruleForm.categoryId" placeholder="请选择">
					<el-option v-for="item in categroyStatus.item" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="分类" prop="title" :label-width="fromLabelWidth">
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="概况" prop="content" :label-width="fromLabelWidth">
				<el-input type="textarea" rows="8" v-model="ruleForm.content"></el-input>
			</el-form-item>
			<el-form-item style="text-align: center;">
				<el-button style="width: 150px;" @click="dialogInfoKey=false">取消</el-button>
				<el-button style="width: 150px;" type="danger" :loading="loading" @click="submitForm('ruleForm')">确认</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
	import {
		add,
		editInfo
	}
	from "@/api/news"
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api";
	export default {

		props: {
			flag: {
				type: Boolean,
				default: false,
			},
			categroyStatusVal: {
				type: Array,
				default: () => [],
			},
			editType: {
				type: Boolean,
				default: false
			},
			editTypeList: {
				type: Object,
				default: () => {}
			}

		},
		setup(props, context) {

			// ref
			const fromLabelWidth = ref(70 + 'px')
			const dialogInfoKey = ref(false)
			const categroyValue = ref('')
			const loading = ref(false)

			// reactive
			const ruleForm = reactive({
				categoryId: '',
				title: '',
				imgUrl: '',
				createDate: '',
				status: '',
				content: '',
			})
			const categroyStatus = reactive({
				item: []
			})
			// 函数
			const close = () => {
				context.emit('update:flag', false)
			}
			const submitForm = () => {


				if (!ruleForm.categoryId) {
					context.root.$message({
						type: 'success',
						message: '请选择类别!'
					});
					return false
				}
				if (!ruleForm.title) {
					context.root.$message({
						type: 'success',
						message: '分类不能为空!'
					});
					return false
				}

				if (!ruleForm.content) {
					context.root.$message({
						type: 'success',
						message: '概况不能为空!'
					});
					return false
				}
				loading.value = true
				// 添加
				if (props.editType == false) {
					let addData = {
						categoryId: ruleForm.categoryId,
						title: ruleForm.title,
						imgUrl: ruleForm.imgUrl,
						createDate: ruleForm.createDate,
						status: ruleForm.status,
						content: ruleForm.content,
					}
					add(addData).then(res => {
						let data = res.data
						if (data.resCode === 0) {
							context.root.$message({
								type: 'success',
								message: data.message
							});
							loading.value = false
							context.refs.ruleForm.resetFields();
							context.emit('refresh')
						}
					}).catch(err => {
						loading.value = false
					})
				}
				// 修改
				if (props.editType == true) {
					let editData = {
						categoryId: ruleForm.categoryId,
						title: ruleForm.title,
						imgUrl: ruleForm.imgUrl,
						createDate: ruleForm.createDate,
						status: ruleForm.status,
						content: ruleForm.content,
						id: props.editTypeList.item.id
					}
					editInfo(editData).then(res => {
						let data = res.data
						if (data.resCode === 0) {
							context.root.$message({
								type: 'success',
								message: data.message
							});
							loading.value = false
							context.refs.ruleForm.resetFields();
							context.emit('refresh', editData)
							dialogInfoKey.value = false
						}
					}).catch(err => {
						loading.value = false
					})
				}
			}
			const opened = () => {
				categroyStatus.item = props.categroyStatusVal
				if (props.editType == true) {
					ruleForm.categoryId = props.editTypeList.item.categoryId
					ruleForm.title = props.editTypeList.item.title
					ruleForm.content = props.editTypeList.item.content
				} else {
					ruleForm.categoryId = ''
					ruleForm.title = ''
					ruleForm.content = ''
				}
			}
			// 生命周期
			onMounted(() => {

			})
			watch(() => {
				dialogInfoKey.value = props.flag
			})

			return {
				// ref
				fromLabelWidth,
				dialogInfoKey,
				categroyValue,
				loading,
				// reactive
				ruleForm,
				categroyStatus,
				// 函数
				close,
				submitForm,
				opened


			}

		}





	}
</script>

<style>
</style>
