<template>
	<view class=""  :style="{height: scrollH1 + 'px'}">
	<view style="color: #fff; height: 200rpx;">社区</view>
	<view style="color: #fff; height: 200rpx;">社区</view>
	<view style="color: #fff; height: 200rpx;">社区</view>
	<view style="color: #fff; height: 200rpx;">社区</view>
	<view style="color: #fff; height: 200rpx;">社区</view>
	<view style="color: #fff; height: 200rpx;">社区</view>
	<view style="color: #fff; height: 200rpx;">社区</view>
	</view>
</template>

<script>
	import { unimixin } from '../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				scrollH1: ''
			}
		},
		onLoad() {
			this.$nextTick(function() {
				uni.getSystemInfo({
					success: res => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#scrollH').boundingClientRect(data => {
							this.scrollH1 = data.height + 48 + 108
							console.log(this.scrollH1)
						}).exec();
					}
				});
			});
		},
		methods: {

		},
		created() {

		}
	}
</script>

<style scoped lang="scss">

</style>
