<template>
	<view class="">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				url: ''
			}
		},
		onLoad(options) {
			this.url = options.url
		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/index/index',
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
