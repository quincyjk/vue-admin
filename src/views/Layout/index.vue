<template>
		<div>
			<layoutHeader></layoutHeader>
			<layoutMain></layoutMain>
			<layoutNav></layoutNav>
		</div>
</template>

<script>
	import {
		reactive,
		ref,
		onMounted,
		computed
	} from "@vue/composition-api";
	import layoutHeader from '@/views/Layout/components/Header.vue'
	import layoutMain from '@/views/Layout/components/Main.vue'
	import layoutNav from '@/views/Layout/components/Nav.vue'
	export default {
		components: {
			layoutHeader,
			layoutMain,
			layoutNav
		},
		setup() {

		}
	}
</script>

<style>
</style>
