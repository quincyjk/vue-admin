<template>
	<div>
		<el-table :data="tableConfig.tableData" @selection-change="handleCategoryChange" border style="width: 100%;margin-top: 20px"
		 empty-text="暂无数据!">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<template v-for="item in tableConfig.tableHeader">
				<el-table-column :label="item.label" :prop="item.feild" :width="item.width" v-if="item.existential=='slot'">
					<template slot-scope="scope">
						<slot :name="item.slotName" :data="scope.row">
						</slot>
					</template>
				</el-table-column>
				<el-table-column :label="item.label" :prop="item.feild" :formatter="formatDateFormat" :width="item.width" v-else-if="item.feild=='createDate'">
				</el-table-column>
				<el-table-column :label="item.label" :prop="item.feild" :formatter="formatCategoryId" :width="item.width" v-else-if="item.feild=='categoryId'">
				</el-table-column>
				<el-table-column :label="item.label" :prop="item.feild" :width="item.width" v-else>
				</el-table-column>
				
				<!-- <el-table-column :label="item.label" :prop="item.feild" :width="item.width" v-if="item.existential=='slot'">
					<template slot-scope="scope">
						<!-- 父子组件对应名字即可 -->
						<!-- <slot name="aaa" :data="scope.row"> -->
						<!-- </slot> -->
					<!-- </template> -->
				<!-- </el-table-column> --> 
			</template>
		</el-table>
		<!-- 底部分页 -->
		<el-row style="margin-top: 20px">
			<el-col :span="12">
				<el-button v-buttonPerm="'info:batchDel'" @click="handleDeleteAll">批量删除</el-button>
			</el-col>
			<el-col :span="12">
				<el-pagination @size-change="changeInfoPageSize" @current-change="changeInfoPage" class="pull-right" background
				 page-size layout="total,sizes,prev, pager, next,jumper" :total="tableConfig.total">
				</el-pagination>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api"
	import {
		dateFormat
	} from '@/utils/global'
	export default {
		props: {
			tableConfig: {
				type: Array,
				default: () => {}
			},
			// 类别数组
			categroyStatus:{
				type: Array,
				default: () => {}
			}
		},
		setup(props, context) {
			const handleCategoryChange = (value) => {
				context.emit('handleCategoryChange', value)
			}
			const changeInfoPageSize = (value) => {
				context.emit('changeInfoPageSize', value)
			}
			const changeInfoPage = (value) => {
				context.emit('changeInfoPage', value)
			}
			const handleDeleteAll = (value) => {
				context.emit('handleDeleteAll', value)
			}
			// 格式化类别
			const formatCategoryId = (row, column, cellValue, index) => {
				var data = props.categroyStatus.filter(item => item.id == row.categoryId)[0]
				if (data) {
					return data.category_name
				}
			}
			// 格式化日历
			const formatDateFormat = (row, column, cellValue, index) => {
					return 	dateFormat(row.createDate)
			}
			return {
				handleCategoryChange,
				changeInfoPageSize,
				changeInfoPage,
				handleDeleteAll,
				formatCategoryId,
				formatDateFormat
			}
		}
	}
</script>
