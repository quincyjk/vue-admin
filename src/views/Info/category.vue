<template>
	<div class="categroyWrap">
		<el-button @click="handleAddsFirst(type='fristAdds')" type="danger">添加一级分类</el-button>
		<hr class="hr" />
		<el-row :gutter="30">
			<el-col :span="8">
				<div class="categroy" v-for="(item,index) in cateGroyData.item" :key="item.id">
					<h4>
						<svg-icon class="pull-left" iconClass="maxus"></svg-icon>
						{{item.category_name}}
						<div class="button-group pull-right">
							<el-button size="mini" type="danger" @click="handleEditfirst({data:item},index,type='editFrist')" round>编辑</el-button>
							<el-button size="mini" type="success" @click="handleaddChildren({data:item},index,type='childrenAdds')" round>增加子级</el-button>
							<el-button size="mini" round @click="handeleDeleteCategory(item.id)" :loading="btn_loading">删除</el-button>
						</div>
					</h4>
					<ul v-if="item.children">
						<li v-for="subitem in item.children" :key="subitem.id">
							{{subitem.category_name}}
							<div class="button-group pull-right">
								<el-button size="mini" type="danger"  @click="handleEditChildren({data:subitem},index,type='editChildren')" round>编辑</el-button>
								<el-button size="mini" round @click="handeleDeleteCategory(subitem.id)" :loading="btn_loading">删除</el-button>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="16">
				<div>
					<h4 class="meun-title">分类编辑</h4>
					<el-form style="margin-top: 20px;" :model="formData" ref="ruleForm" label-width="142px">
						<el-form-item label="一级分类名称" style="width: 450px" prop="category_name" v-if="cate_groy_first">
							<el-input type="text" v-model="formData.category_name" :disabled="categroy_frist_disabled"></el-input>
						</el-form-item>
						<el-form-item label="二级分类名称" style="width: 450px"  prop="category_children_name" v-if="cate_groy_two">
							<el-input type="text" v-model="formData.category_children_name" :disabled="categroy_children_disabled"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button :disabled="categroy_submit_disabled" type="danger" :loading="btn_loading" @click="handleSubmit">确定</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	// 引入自定义全局组件global
	import {
		global
	} from '@/utils/global'
	import {
		addFirstCategory,
		deleteCategory,
		editCategory,
		addChildrenCategory
	}
	from "@/api/news"
import {
		common
	} from "@/api/common"
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api";
	export default {
		setup(props, context) {
			const {
				confirm: categroyDeteleConfirm
			} = global()
			const {
				GetCategory:GetCategory,
				Arrs
			} = common()
			// ref
			const cate_groy_first = ref(true)
			const cate_groy_two = ref(true)
			const btn_loading = ref(false)
			const categroy_frist_disabled = ref(true)
			const categroy_children_disabled = ref(true)
			
			const categroy_submit_disabled = ref(true)
			// 分类ID
			const categroyID = ref('')
			// 分类类型
			const categroytype = ref('')
			
			// reactive
			const formData = reactive({
				category_name: '',
				category_children_name: '',
				id: ''
			})

			// 获取信息分类
			const cateGroyData = reactive({
				item: [],
				current: []
			})

			//函数
			// 提交--修改
			const handleSubmit = () => {
			
				if(categroytype.value === 'fristAdds'||categroytype.value === 'editFrist'){
					if (!formData.category_name) {
						context.root.$message({
							message: '分类名称不能为空！！',
							type: 'warning'
						})
						return false
					}
				}
				if(categroytype.value === 'childrenAdds'){
					if (!formData.category_children_name) {
						context.root.$message({
							message: '分类名称不能为空！！',
							type: 'warning'
						})
						return false
					}
				}
				btn_loading.value = true
				// 提交一级
				if (categroytype.value === 'fristAdds') {
					addFirstCategory({
						categoryName: formData.category_name
					}).then(res => {
						const data = res.data
						if (data.resCode === 0) {
							context.root.$message({
								message: data.message,
								type: 'success'
							})
							GetCategory()
						}
						btn_loading.value = false
						context.refs.ruleForm.resetFields();
					}).catch(err => {
						context.refs.ruleForm.resetFields();
						btn_loading.value = false
					})
				}
				// 修改一级
				if (categroytype.value === 'editFrist') {

					editCategory({
						categoryName: formData.category_name,
						id: cateGroyData.current.id,
					}).then(res => {
						const data = res.data
						if (data.resCode === 0) {
							context.root.$message({
								message: data.message,
								type: 'success'
							})
							GetCategory()
						}


						context.refs.ruleForm.resetFields();
						btn_loading.value = false
					}).catch(err => {
						context.refs.ruleForm.resetFields();
						btn_loading.value = false
					})
				}
			
				// 提交子级
				if (categroytype.value === 'childrenAdds') {
					addChildrenCategory({
						categoryName: formData.category_children_name,
						parentId:cateGroyData.current.id,
					}).then(res => {
							const data = res.data
						if (data.resCode === 0) {
							context.root.$message({
								message: data.message,
								type: 'success'
							})
							GetCategory()
						}
						context.refs.ruleForm.resetFields();
						btn_loading.value = false
					}).catch(err => {
						context.refs.ruleForm.resetFields();
						btn_loading.value = false
					})
				}
				// 修改子级
				if (categroytype.value === 'editChildren') {
				
					editCategory({
						categoryName: formData.category_children_name,
						id:cateGroyData.current.id,
					}).then(res => {
						const data = res.data
						if (data.resCode === 0) {
							context.root.$message({
								message: data.message,
								type: 'success'
							})
							GetCategory()
						}
				
				
						context.refs.ruleForm.resetFields();
						btn_loading.value = false
					}).catch(err => {
						context.refs.ruleForm.resetFields();
						btn_loading.value = false
					})
				}
				
			}


			//添加一级分类
			const handleAddsFirst = (type) => {
				cate_groy_first.value = true
				cate_groy_two.value = false
				categroy_frist_disabled.value = false
				categroy_submit_disabled.value = false
				categroytype.value = type
				formData.category_name=''
			}
			//添加子级分类
			const handleaddChildren = (params,index,type) => {
				cate_groy_first.value = true
				categroy_frist_disabled.value = true
				cate_groy_two.value = true
				categroy_children_disabled.value = false
				categroy_submit_disabled.value = false
				categroytype.value = type
				cateGroyData.current = params.data
				formData.category_children_name=''
				formData.category_name=params.data.category_name
			}
			// 修改编辑一级分类
			const handleEditfirst = (params, index, type) => {
				handleAddsFirst()
				formData.category_name = params.data.category_name
				cateGroyData.current = params.data
				categroytype.value = type
			}
			// 修改编辑子级级分类
			const handleEditChildren = (params, index, type) => {
				cate_groy_first.value = true
				categroy_frist_disabled.value = true
				cate_groy_two.value = true
				categroy_children_disabled.value = false
				categroy_submit_disabled.value = false
				categroytype.value = type
				formData.category_children_name = params.data.category_name
				cateGroyData.current = params.data
				let data =cateGroyData.item.filter(item=>item.id==params.data.parent_id)[0]
				formData.category_name=data.category_name
			}
			
			// 删除信息一级信息分类
			const handeleDeleteCategory = (valueId) => {
				categroyID.value = valueId
				categroyDeteleConfirm({
					fn: DeleteCategory
				})

			}
			// 删除信息一级信息分类方法调用
			const DeleteCategory = () => {
				deleteCategory({
					categoryId: categroyID.value
				}).then(res => {
					GetCategory()
				}).catch(err => {

				})
			}

			// 生命周期
			onMounted(() => {
				GetCategory()
			})
			
			// 获取一级信息分类
			watch(() => Arrs.item, (value) => {
				cateGroyData.item = value
			})
			return {
				// ref
				cate_groy_first,
				cate_groy_two,
				btn_loading,
				categroy_frist_disabled,
				categroy_children_disabled,
				categroy_submit_disabled,
				// reactive
				formData,
				cateGroyData,
				// 函数
				handleSubmit,
				handleAddsFirst,
				handeleDeleteCategory,
				handleEditfirst,
				handleaddChildren,
				handleEditChildren
			}
		}
	}
</script>

<style lang="less" scoped>
	.categroyWrap {
		.button-group {
			padding-right: 10px;
			line-height: 40px;
			display: none;
		}

		.categroy:first-child {
			&:before {
				top: 20px;
			}
		}

		.categroy:last-child {
			&:before {
				bottom: 20px;
			}
		}

		.meun-title {
			line-height: 44px;
			padding-left: 22px;
			background-color: #f4f4f4;
		}

		.categroy {
			position: relative;
			line-height: 44px;

			&:before {
				content: '';
				position: absolute;
				left: 22px;
				top: 0;
				bottom: 0;
				width: 32px;
				border-left: 1px dotted #000;
			}

			h4 {
				padding-left: 40px;
				position: relative;
			}

			svg {
				position: absolute;
				left: 14px;
				top: 13px;
				font-size: 17px;
				background-color: #fff;

			}

			li {
				position: relative;
				padding-left: 36px;
				margin-left: 24px;

				&:before {
					content: '';
					position: absolute;
					left: 0;
					top: 22px;
					width: 32px;
					border-bottom: 1px dotted #000;
				}
			}

			li,
			h4 {
				&:hover {
					background-color: #f4f4f4;
					cursor: pointer;
					.transitions;
				}

				&:hover .button-group {
					display: block;
				}
			}
		}

		.hr {
			margin: 30px 0px;
			border-top: none;
			border-right: none;
			border-bottom: 1px solid rgb(233, 233, 233);
			border-left: none;
			border-image: initial;
			margin-left: -30px;
			margin-right: -30px;
		}
	}
</style>
