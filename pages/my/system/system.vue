<template>
	<view class="system mainBox" id="scrollH" :style="[{height: screenHt + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="systemArea">
			<view  @click="clearStroageEvent()">
				<view class="areaLft">清理缓存</view>
				<view class="areaRgt">
					<view class="systemChoiceArea">{{currentSize}} KB</view>
					<view class="systemChoiceAreaIcon i-rgtArrow"></view>
				</view>
			</view>
			<view>
				<view class="areaLft">关于版本</view>
				<view class="areaRgt">
					<view class="systemChoiceArea">V {{versionCode}}</view>
					<view class="systemChoiceAreaIcon hideClass i-rgtArrow"></view>
				</view>
			</view>
		</view>
		
		<view class="layoutBtn" @click="layoutEvent()">退出登录</view>
		
	</view>
</template>

<script>
	import { unimixin } from '../../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				currentSize: '',
				versionCode: '',
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/my/my',
					success: () => {}
				})
			}
		},
		methods: {
			touchEnd(e){
				if(this.changeY > 50){
					this.paddingTop = 0
				}
			},
			clearStroageEvent(){
				uni.clearStorage();
				setTimeout(()=>{
					uni.showToast({
						icon: 'none',
						title: '缓存已清理, 请重新登录',
						success: () => {}
					})
				},500)
			},
			layoutEvent(){
				this.ajaxJson({
					url: '/summary/userInfo/logout',
					method: 'POST',
					call: (data)=>{
						uni.showToast({
							icon: 'none',
							title: data.message,
							success: () => {
								uni.clearStorage()
							}
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/loginIn/loginIn',
								success: () => {}
							})
						},500)
					}
				})
			},
			getStroageSize(){
				uni.getStorageInfo({
					success: (res) => {
						this.currentSize = res.currentSize
					}
				});
			},
			getSystemInfo(){
				plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
					this.versionCode = wgtinfo.versionCode
					console.log(this.versionCode)
				})
			},
		},
		created() {
			this.getStroageSize()
			this.getSystemInfo()
		}
	}
</script>

<style scoped lang="scss">
	.system{
		.systemArea{
			font-size: 28rpx;
			color: #ccdaff;
		}
		.systemArea>view{
			border-bottom: 1px solid #352446;
			background-color: #281d33;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			.areaRgt{
				display: flex;
				.systemChoiceArea{
					font-size: 24rpx;
					color: #999;
					margin-right: 10rpx;
				}
			}
		}
	}
	.systemChoiceAreaIcon::before{
		font-size: 24rpx;
	}
	
	.layoutBtn{
		margin-top: 30rpx;
		height: 90rpx;
		background-color: #281d33;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		color: #fa2228;
	}
</style>
