<template>
	<view class="">
<view style="color: #fff;">项目</view>
<view class="addComCommunity i-plus" @click="addComCommunityEvent()"></view>
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
		methods: {
			addComCommunityEvent(){
				uni.reLaunch({
					url: '/pages/community/addCommunity/addComCommunity?category=2',
					success: () => {}
				})
			}
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
	.addComCommunity{
		width: 70rpx;
		height: 70rpx;
		position: fixed;
		right: 30rpx;
		bottom: 150rpx;
		z-index: 9;
	}
	.addComCommunity::before{
		font-size: 80rpx;
		color: #5867e6;
	}
	
</style>
