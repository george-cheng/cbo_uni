<template>
	<view class="">

		<unitabbar :switchOn = '4'></unitabbar>
	</view>
</template>

<script>
	import unitabbar from '../../components/uni-tabbar/tabBar.vue'
	import { unimixin } from '../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		components: { unitabbar },
		data(){
			return{
				
			}
		},
		onLoad() {

		},
		methods: {

		},
		created() {

		}
	}
</script>

<style scoped lang="scss">

</style>
