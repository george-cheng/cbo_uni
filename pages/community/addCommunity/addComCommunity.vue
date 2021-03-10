<template>
	<view class="">

	</view>
</template>

<script>
	export default {
		data(){
			return{
				category: ''
			}
		},
		onLoad(options) {
			this.category = options.category
		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/community/community?category=' + this.category,
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
