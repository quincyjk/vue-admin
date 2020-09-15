<template>
	<el-form :model="region" ref="refForm" label-width="80px">
		<el-form-item label="地区" prop="province">
			<el-row>
				<el-col :span="6" v-if="initSelectList.item.province==true">
					<el-select @change="handleObtainCity(region.province,type='省份')" v-model="region.province" placeholder="请选择省份">
						<el-option v-for="item in provinceData.item" :key="item.PROVINCE_ID" :label="item.PROVINCE_NAME" :value="item.PROVINCE_CODE"></el-option>

					</el-select>
				</el-col>
				<el-col :span="6" :offset="1" v-if="initSelectList.item.city==true">
					<el-form-item prop="city">
						<el-select @change="handleObtainArea(region.city,type='城市')" v-model="region.city" placeholder="请选择城市">
							<el-option v-for="item in cityData.item" :key="item.CITY_ID" :label="item.CITY_NAME" :value="item.CITY_CODE"></el-option>

						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6" :offset="1" v-if="initSelectList.item.area==true">
					<el-form-item prop="area">
						<el-select @change="handleObtainStreet(region.area,type='区县')" v-model="region.area" placeholder="请选择区县">
							<el-option v-for="item in areaData.item" :key="item.AREA_ID" :label="item.AREA_NAME" :value="item.AREA_CODE"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6" style="margin-top: 20px;"v-if="initSelectList.item.street==true">
					<el-form-item prop="street">
						<el-select v-model="region.street" placeholder="请选择街道">
							<el-option v-for="item in streetData.item" :key="item.STREET_ID" :label="item.STREET_NAME" :value="item.STREET_CODE"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form-item>
	</el-form>
</template>

<script>
	import {
		cityPicker
	}
	from "@/api/user"
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api";
	export default {
		props: {
			regionValue: {
				type: Object,
					default:()=>{}
			},
			editType:{
				type: Boolean,
				default:false
			},
			selectList:{
				type: Array,
				default:()=>[]
			}
		},
		setup(props, context) {
			// 省份
			const provinceData = reactive({
				item: {}
			})
			// 市份
			const cityData = reactive({
				item: {}
			})
			// 区份
			const areaData = reactive({
				item: {}
			})
			// 街道
			const streetData = reactive({
				item: {}
			})
			const region = props.regionValue
			
			const initSelectList =reactive({item:{
				province:false,
				city:false,
				area:false,
				street:false,
			}})
			props.selectList.forEach(item =>{
				initSelectList.item[item]=true
			})
			// 获取市
			const handleObtainCity = (val,type) => {
				cityPicker({
					type: "city",
					province_code: val
				}).then(res => {
					cityData.item = res.data.data.data
					selectEmpty(type)
				}).catch(err => {

				})
			}
			// 获取地区
			const handleObtainArea = (val,type) => {
				cityPicker({
					type: "area",
					city_code: val
				}).then(res => {
					areaData.item = res.data.data.data
					selectEmpty(type)
				}).catch(err => {

				})
			}
			// 获取街道
			const handleObtainStreet = (val,type) => {
				cityPicker({
					type: "street",
					area_code: val
				}).then(res => {
					streetData.item = res.data.data.data
					selectEmpty(type)
				}).catch(err => {

				})
			}
			// 生命周期
			onMounted(() => {
		CityPicker()
			})

			const selectEmpty =(val)=>{
				if(val=='省份'){
					region.city=''
					region.area=''
					region.street=''
				}
				if(val=='城市'){
					region.area=''
					region.street=''
				}
				if(val=='区县'){
					region.street=''
				}
			}
			const CityPicker = () => {
					//获取省
				cityPicker({
					type: "province"
				}).then(res => {
					provinceData.item = res.data.data.data
				}).catch(err => {
				})
				
			}
			watch(()=>{
				if(props.editType==true){
					//获取市
					if(props.regionValue.province!=''){
						cityPicker({
							type: "city",
							province_code: props.regionValue.province
						}).then(res => {
							cityData.item = res.data.data.data
						}).catch(err => {
						})
					}
					if(props.regionValue.city!=''){
					
						//获取地区
						cityPicker({
							type: "area",
							city_code: props.regionValue.city
						}).then(res => {
							areaData.item = res.data.data.data
						}).catch(err => {
						})
					}
								
							//获取县区
					if(props.regionValue.area!=''){
						cityPicker({
							type: "street",
							area_code: props.regionValue.area
						}).then(res => {
							streetData.item = res.data.data.data
						}).catch(err => {
						})
					}
				}
			
			})
			

			return {
				// reactive
				provinceData,
				cityData,
				areaData,
				streetData,
				region,
				initSelectList,
				// 函数
				handleObtainCity,
				handleObtainArea,
				handleObtainStreet
			}
		}
	}
</script>

<style>
</style>
