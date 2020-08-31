	import {
		getCategoryAll
	}
	from "@/api/news"
	import {
		reactive,
		ref,
		onMounted,
		computed,
		watch
	} from "@vue/composition-api";
export function common(){
	const Arrs =reactive({item:[]})
	 const GetCategory =()=>{
		 getCategoryAll().then(res => {
		 	const data = res.data
		 	if (data.resCode === 0) {
				Arrs.item = data.data
		 	}
		 }).catch(err=>{
		 	
		 })
		
	 }

	 return{
		 GetCategory,
		 Arrs,
	 }
}
