<template>
	<view class="">

	</view>
</template>

<script>
	export default {
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
