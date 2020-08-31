<template>
	<div>
		<el-form ref="form" :model="formInline">
			<el-row :gutter="20">
				<el-col :span="4">
					<div class="label-wrap category">
						<label for="">分类：</label>
						<div class="wrap-content">
							<el-select clearable v-model="searchFrom.categoryId" placeholder="请选择">
								<el-option v-for="item in categroyStatus.item" :key="item.id" :label="item.category_name" :value="item.id">
								</el-option>
							</el-select>
						</div>
					</div>
				</el-col>
				<el-col :span="7">
					<div class="label-wrap date">
						<label for="">日期：</label>
						<div class="wrap-content">
							<el-date-picker style="width: 100%;" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="dateValue"
							 type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']">
							</el-date-picker>
						</div>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="label-wrap key_word">
						<label for="">关键字：</label>
						<div class="wrap-content">
							<el-select  v-model="searchFrom.categoryValueKey" placeholder="请选择" style="width: 100%;">
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
				<el-col :span="3" style="text-align: right;">
					<el-button type="danger" @click="editTypeList.item=null,editType=false,dialogInfoKey=true">新增</el-button>
				</el-col>
			</el-row>
		</el-form>
		<!-- 表格 -->
		<el-table ref="multipleTable"  @selection-change="handleCategoryChange" v-loading="loading" empty-text="暂无数据!" :data="categroyDataList.item"
		 border style="width: 100%;margin-top: 20px">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="700">
			</el-table-column>
			<el-table-column prop="categoryId" :formatter="formatCategoryId" width="120" label="类别">
			</el-table-column>
			<el-table-column prop="createDate" :formatter="formatDateFormat" label="日期" width="230">
			</el-table-column>
			<el-table-column prop="user" label="管理人" width="120">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					<el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row),editType=true,dialogInfoKey=true">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 底部分页 -->
		<el-row style="margin-top: 20px">
			<el-col :span="12">
				<el-button @click="handleDeleteAll()">批量删除</el-button>
			</el-col>
			<el-col :span="12">
				<el-pagination @size-change="changeInfoPageSize" @current-change="changeInfoPage" class="pull-right" background
				 page-size layout="total,sizes,prev, pager, next,jumper" :total="total">
				</el-pagination>
			</el-col>
		</el-row>

		<dialogInfo :categroyStatusVal="categroyStatus.item" :editType="editType" :editTypeList="editTypeList" @refresh="handleRefresh($event)" :flag.sync="dialogInfoKey"></dialogInfo>
	</div>
</template>

<script>
	import {
		getList,
		deleteInfo
	}
	from "@/api/news"
	import {
		common
	} from "@/api/common"
	import dialogInfo from '@/views/Info/dialog/info.vue'
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
			dialogInfo
		},
		setup(props, context) {
			const {
				GetCategory,
				Arrs
			} = common()
			const {
				confirm: deleteItem
			} = global()
			const {
				confirm: deleteAll
			} = global()
			const categroyID = ref('')
			const dialogInfoKey = ref(false)
			// 日期
			const dateValue = ref('')
			// 页码
			const total = ref('')
			// loading
			const loading = ref(false)
			// 页数改变数值
			const page = reactive({
				pageNumber: 1,
				pageSize: 10
			})
			// 编辑类型
			const editType = ref(false)
			
			// 搜索组
			const searchFrom = reactive({
				categoryId: '',
				startTiem:'',
				endTime: '',
				title:'',
				id: '',
				categoryValueKey:'ID',
				categoryValueKeyWord:'',
			})
			// 编辑数组
			const editTypeList =reactive({item:{}})
			// 类别
			const categroyStatus = reactive({
				item: []
			})
			// 关键字
			const categroyKeyWord = reactive([{
				name: 'ID',
				id: 'ID'
			}, {
				name: '标题',
				id: '标题'
			}])
			// 表格
			const categroyDataList = reactive({
				item: []
			})
			// 数据参数
		
			const formData =()=>{
				let data =reactive({
					categoryId: searchFrom.categoryId,
					startTiem:searchFrom.startTiem,
					endTime: searchFrom.endTime,
					title: searchFrom.title,
					id: searchFrom.id,
					pageNumber: page.pageNumber,
					pageSize: page.pageSize,
				})
				return data
			}

			// 操作编辑
			const handleEdit = (index, row) => {
				editTypeList.item = row
			}
			// 操作删除
			const handleDelete = (index, row) => {
				deleteItem({
					title: '确认删除当前信息，确认后将无法恢复！！',
					id:()=>{
						categroyID.value = [row.id]
					},
					fn: DeleteInfo,
					
				})
			}
			// 批量删除
			const handleDeleteAll = () => {
				if (!categroyID.value || categroyID.value.length == 0) {
					context.root.$message({
						type: 'error',
						message: '请选择要删除的数据'
					})
					return false
				}
				deleteAll({
					title: '确认删除选中的数据，确认后将无法恢复！！',
					fn: DeleteInfo,
				})

			}
		
			// 勾选选择项发生变化时会触发事件
			const handleCategoryChange = (val) => {
				let dataId = val.map(item => item.id)
				categroyID.value = dataId
			}
			// 删除
			const DeleteInfo = () => {
				deleteInfo({
					id: categroyID.value
				}).then(res => {
					categroyID.value = ''
					GetList()
				}).catch(err => {
					categroyID.value = ''
				})
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
				GetCategory()
			})
			watch(() => Arrs.item, (value) => {
				categroyStatus.item = value
			})
			// 内容格式化
			const formatDateFormat = (row, index) => {
				return dateFormat(row.createDate)
			}
			const formatCategoryId = (row, column, cellValue, index) => {
				var data = categroyStatus.item.filter(item => item.id == row.categoryId)[0]
				if(data){
					return data.category_name
				}
			}
		
			// 获取信息列表
			const GetList = () => {
				let data = formData()
				loading.value = true
				getList(data).then(res => {
					const data = res.data
					if (data.resCode === 0) {
						categroyDataList.item = data.data.data
						total.value = data.data.total
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
				if (searchFrom.categoryValueKey == '标题') {
					searchFrom.title = searchFrom.categoryValueKeyWord
					searchFrom.id=''
				}
				if (searchFrom.categoryValueKey == 'ID') {
					searchFrom.id = searchFrom.categoryValueKeyWord
					searchFrom.title=''
				}
				if(dateValue.value ==null){
					searchFrom.startTiem =''
					searchFrom.endTime =''
				}
				if(dateValue.value !=null){
					searchFrom.startTiem = dateValue.value[0]
					searchFrom.endTime = dateValue.value[1]
				}
				searchFrom.categoryId = searchFrom.categoryId
				page.pageNumber=1
				page.pageSize=10
				GetList()
			}
			return {
				// ref
				dialogInfoKey,
				total,
				loading,
				dateValue,
				editType,
				// reactive
				searchFrom,
				categroyDataList,
				categroyStatus,
				page,
				categroyKeyWord,
				editTypeList,
				// 函数方法名
				handleEdit,
				handleDelete,
				handleDeleteAll,
				changeInfoPageSize,
				changeInfoPage,
				formatDateFormat,
				formatCategoryId,
				handleCategoryChange,
				handleRefresh,
				hanleSearch
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

		;

		&.date {
			.labelDom(center, 93px, 40px)
		}

		&.key_word {
			.labelDom(center, 93px, 40px)
		}
	}
</style>
