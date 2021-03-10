<template>
	<view class="">

	</view>
</template>

<script>
	import { unimixin } from '../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/index/index?category=1',
					success: () => {}
				})
			}
		},
		methods: {

		},
		created() {

		}
	}
</script>

<style scoped lang="scss">

</style>
