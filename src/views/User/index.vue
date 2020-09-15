<template>
	<div>
		<el-form ref="form" :model="formInline">
			<el-row :gutter="20">
				<el-col :span="4">
					<div class="label-wrap key_word">
						<label for="">关键字：</label>
						<div class="wrap-content">
							<el-select v-model="searchFrom.categoryValueKey" placeholder="请选择" style="width: 100%;">
								<el-option v-for="item in categroyKeyWord" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</div>
					</div>
				</el-col>
				<el-col :span="3">
					<el-input clearable v-model="searchFrom.categoryValueKeyWord" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="3">
					<el-button type="danger" @click="hanleSearch">搜素</el-button>
				</el-col>
				<el-col :span="14" style="text-align: right;">
					<el-button type="danger" @click="dialogAddKey=true">新增</el-button>
				</el-col>
			</el-row>
		</el-form>
		<!-- 表格 -->
		<generalTable :tableConfig="tableConfig" @handleDeleteAll="handleDeleteAll" @handleCategoryChange="handleCategoryChange"
		 @changeInfoPageSize="changeInfoPageSize" @changeInfoPage="changeInfoPage">
			<template v-slot:status="statData">
				<el-switch v-model="statData.data.status" active-color="#13ce66" inactive-color="#ff4949" active-value="是"
				 inactive-value="否">
				</el-switch>
			</template>
			<template v-slot:operation="statData">
				<el-button size="mini" type="danger" @click="handleDelete(statData.data)">删除</el-button>
				<el-button size="mini" type="success"@click="handleEdit(statData.data),dialogEditKey=true">编辑</el-button>
			</template>
		</generalTable>

		<dialogUserAdd :flag.sync="dialogAddKey"   @refresh="handleRefresh($event)"></dialogUserAdd>
		<dialogUserEdit :flag.sync="dialogEditKey" :editTypeList="editTypeList" @refresh="handleRefresh($event)"></dialogUserEdit>
	</div>
</template>

<script>
	import {
		getList,
		deleteUser
	}
	from "@/api/user"
	import {
		common
	} from "@/api/common"
	import dialogUserAdd from '@/views/User/dialog/add.vue'
	import dialogUserEdit from '@/views/User/dialog/edit.vue'
	import generalTable from '@/components/general-table/index.vue'
	// 引入自定义全局组件global
	import {
		global,
		dateFormat
	} from '@/utils/global'
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api";
	export default {
		components: {
			generalTable,
			dialogUserAdd,
			dialogUserEdit
		},
		setup(props, context) {

			const {
				confirm: deleteItem
			} = global()
			const {
				confirm: deleteAll
			} = global()
			const deleteID = ref('')
			// 新增修改
			const dialogAddKey = ref(false)
			const dialogEditKey = ref(false)
			// loading
			const loading = ref(false)
			// 页数改变数值
			const page = reactive({
				pageNumber: 1,
				pageSize: 10
			})
		
			// 新增
			const tableConfig = reactive({
				total: '',
				tableData: [],
				tableHeader: [{
					label: "邮箱/用户名",
					width: '300',
					feild: 'username'
				}, {
					label: "真实姓名",
					width: '180',
					feild: 'truename'
				}, {
					label: "手机号",
					width: '190',
					feild: 'phone'
				}, {
					label: "地区",
					width: '240',
					feild: 'region'
				}, {
					label: "角色",
					width: '240',
					feild: 'role'
				}, {
					label: "禁启用状态",
					width: '180',
					feild: 'status',
					existential: 'slot',
					slotName: 'status'
				}, {
					label: "操作",
					feild: 'status',
					existential: 'slot',
					slotName: 'operation'
				}]
			})
			// 搜索组
			const searchFrom = reactive({
				username: '',
				phone: '',
				categoryValueKey: '姓名',
				categoryValueKeyWord: '',
			})
			// 编辑数组
			const editTypeList = reactive({
				item: {}
			})

			// 关键字
			const categroyKeyWord = reactive([{
				name: '姓名',
				id: '姓名'
			}, {
				name: '手机号',
				id: '手机号'
			}])
			// 数据参数
			const formData = () => {
				let data = reactive({
					username: searchFrom.username,
					truename: '',
					id: '',
					phone: searchFrom.phone,
					pageNumber: page.pageNumber,
					pageSize: page.pageSize,
				})
				return data
			}

			// 操作编辑
			const handleEdit = (row) => {
				editTypeList.item = row
			}
			// 操作删除
			const handleDelete = (row) => {
				deleteItem({
					title: '确认删除当前信息，确认后将无法恢复！！',
					id: () => {
						deleteID.value = [row.id]
					},
					fn: Delete,

				})
			}
			// 批量删除
			const handleDeleteAll = () => {
				if (!deleteID.value || deleteID.value.length == 0) {
					context.root.$message({
						type: 'error',
						message: '请选择要删除的数据'
					})
					return false
				}
				deleteAll({
					title: '确认删除选中的数据，确认后将无法恢复！！',
					fn: Delete,
				})

			}
			// 删除
			const Delete = () => {
				deleteUser({
					id: deleteID.value
				}).then(res => {
					deleteID.value = ''
					GetList()
				}).catch(err => {
					deleteID.value = ''
				})
			}

			// 勾选选择项发生变化时会触发事件
			const handleCategoryChange = (val) => {
				let dataId = val.map(item => item.id)
				deleteID.value = dataId
			}
			// 页码改变
			const changeInfoPageSize = (val) => {
				page.pageSize = val
				GetList()
			}
			// 页数改变
			const changeInfoPage = (val) => {
				page.pageNumber = val
				GetList()
			}
			// 生命周期
			onMounted(() => {
				GetList()
			})

			// 获取信息列表
			const GetList = () => {
				let data = formData()
				loading.value = true
				getList(data).then(res => {
					const data = res.data
					if (data.resCode === 0) {
						tableConfig.tableData = data.data.data
						tableConfig.total = data.data.total
						loading.value = false
					}
				}).catch(err => {
					loading.value = false
				})
			}

			// 添加完刷新数据
			const handleRefresh = (val) => {
				// 第一种直接调用接口刷新--通用
				GetList()
				// 第二种是优化编辑修改无需调用接口
				// var index =categroyDataList.item.findIndex(item=>item.id==val.id)
				// categroyDataList.item[index].title=val.title
				// categroyDataList.item[index].content=val.content
				// categroyDataList.item[index].categoryId=val.categoryId
			}
			// 搜素
			const hanleSearch = () => {
				if (searchFrom.categoryValueKey == '姓名') {
					searchFrom.username = searchFrom.categoryValueKeyWord
					searchFrom.phone = ''
				}
				if (searchFrom.categoryValueKey == '手机号') {
					searchFrom.phone = searchFrom.categoryValueKeyWord
					searchFrom.username = ''
				}
				page.pageNumber = 1
				page.pageSize = 10
				GetList()
			}
			
			return {
				// ref
				dialogAddKey,
				dialogEditKey,
				loading,
				// reactive
				searchFrom,
				page,
				categroyKeyWord,
				editTypeList,
				tableConfig,
				// 函数方法名
				handleEdit,
				handleDelete,
				handleDeleteAll,
				changeInfoPageSize,
				changeInfoPage,
				handleCategoryChange,
				handleRefresh,
				hanleSearch,
			}
		}
	}
</script>
le
<style lang="less" scoped>
	.label-wrap {
		&.category {
			.labelDom(left, 60px, 40px)
		}

		&.date {
			.labelDom(center, 93px, 40px)
		}

		&.key_word {
			.labelDom(center, 93px, 40px)
		}
	}
</style>
