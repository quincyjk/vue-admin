<template>
	<!-- 提示框 -->
	<el-dialog title="新增" :visible.sync="dialogInfoKey" width="580px" :modal-append-to-body='false' @close="close" @open="opened">
		<el-form ref="ruleForm" :model="formData.item" label-width="80px">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="formData.item.username" clearable maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="formData.item.password" clearable maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="truename">
				<el-input v-model="formData.item.truename" clearable maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="formData.item.phone" type="" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength=11 clearable></el-input>
			</el-form-item>
			<selectAdds :selectList="['province','city','area','street']" ref="refFormClidren" :editType="editType" :regionValue="formData.item.region"></selectAdds>

			<el-form-item label="是否启用" prop="status">
				<el-switch v-model="formData.item.status" active-value="是" inactive-value="否"></el-switch>
			</el-form-item>
			<el-form-item label="角色" prop="role">
				<el-checkbox-group v-model="formData.item.role">
					<el-checkbox v-for="item in roleList.item" :label="item.role" :name="item.role">{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="按钮" prop="role">
				<template v-if="permButtonList.item.length>0">
					<div  v-for="item in permButtonList.item">
						<p>{{item.name}}</p>
						<template v-if="item.perm && item.perm.length>0">
							<el-checkbox-group v-model="formData.item.btnPerm">
								<el-checkbox v-for="subItem in item.perm" :label="subItem.value" :name="subItem.value">{{subItem.name}}</el-checkbox>
							</el-checkbox-group>
						</template>
					</div>
				</template>
			</el-form-item>
			<el-row type="flex" class="row-bg" justify="center">
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" style="width: 150px;" :loading="loading" @click="submitForm">确认</el-button>
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<el-button style="width: 150px;" @click="close">取消</el-button>
				</el-col>
			</el-row>

		</el-form>
	</el-dialog>
</template>

<script>
	import sha1 from 'js-sha1'
	import {
		add,
		getSystem,
		permButton
	}
	from "@/api/user"
	import {
		validateEmails
	} from '@/utils/validate.js'
	import {
		stripscripts
	} from '@/utils/validate.js'
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api";
	import selectAdds from '@/components/selectAdds/index.vue'
	export default {
		components: {
			selectAdds
		},
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
			const dialogInfoKey = ref(false)
			const loading = ref(false)
			// reactive
			const formData = reactive({
				item: {
					username: '',
					truename: '',
					password:'',
					phone: '',
					region: {
						province: '',
						city: '',
						area: '',
						street: '',
					},
					status: '否',
					role: [],
					btnPerm:[]
				}
			})
			
			const categroyStatus = reactive({
				item: []
			})
			// 系统分类
			const roleList =reactive({item:{}})
			const permButtonList = reactive({item:{}})
			// 打开
			const opened = ()=>{
					GetSystem()
					PermButton()
			}
			// 获取系统分配
			const PermButton = () => {
				permButton().then(res => {
					permButtonList.item=res.data.data
				}).catch(err => {
			
				})
			}
			// 获取按钮全系休闲鞋男
			const GetSystem = () => {
				getSystem().then(res => {
					roleList.item=res.data.data
				}).catch(err => {
			
				})
			}
			// 函数
			const close = () => {
				context.emit('update:flag', false)
			}
			const submitForm = () => {
		
				if (!formData.item.username) {
					context.root.$message({
						type: 'success',
						message: '用户名不能为空!'
					});
					return false
				} else if (validateEmails(formData.item.username)) {
					context.root.$message({
						type: 'success',
						message: '请输入正确的邮箱!'
					});
					return false
				}
				if (!formData.item.password) {
					context.root.$message({
						type: 'success',
						message: '密码不能为空!'
					});
					return false
				}
				if (!formData.item.truename) {
					context.root.$message({
						type: 'success',
						message: '姓名不能为空!'
					});
					return false
				}
				if (!formData.item.phone) {
					context.root.$message({
						type: 'success',
						message: '手机不能为空!'
					});
					return false
				}
				if (formData.item.role.length <= 0) {
					context.root.$message({
						type: 'success',
						message: '请选择角色!'
					});
					return false
				}
				let resquestData = formData.item
				resquestData.region = JSON.stringify(resquestData.region)
				resquestData.btnPerm = resquestData.btnPerm.join()
				resquestData.role = resquestData.role.join()
				 resquestData.password=sha1(resquestData.password)
				loading.value = true
				add(resquestData).then(res => {
					let data = res.data
					if (data.resCode === 0) {
						context.root.$message({
							type: 'success',
							message: data.message
						});
						// lodaing开关
						loading.value = false
						// 值转换类型
						resquestData.role = resquestData.role.split(',')
						resquestData.region = JSON.parse(resquestData.region)
						resquestData.btnPerm = resquestData.btnPerm.split(',')
						formData.item.btnPerm=[]
						// 重置表单
						context.refs.ruleForm.resetFields();
						context.refs.refFormClidren.$refs.refForm.resetFields()

						// 通过传值刷新用户列表
						context.emit('refresh')
					}
				}).catch(err => {
					loading.value = false
					resquestData.region = JSON.parse(resquestData.region)
					resquestData.btnPerm = resquestData.btnPerm.split(',')
					resquestData.role = resquestData.role.split(',')
					
				})

			}
			watch(() => {
				dialogInfoKey.value = props.flag
			})
			return {
				// ref
				dialogInfoKey,
				loading,
				// reactive
				formData,
				categroyStatus,
				roleList,
				permButtonList,
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
