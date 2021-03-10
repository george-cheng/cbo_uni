<template>
	<view class="changeSex mainBox" id="scrollH" :style="[{height: screenHt + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="saveBtn">
			<view></view>
			<view class="saveBtnTxt" @click="saveEvent()">保存</view>
		</view>
		
		<view class="chengeSexArea">
			<view @click="changeSexEvent(1)">
				<view class="sexAreaLft">男</view>
				<view class="sexAreaRgt" :class="sexIndex == 1 ? 'i-checksign': ''"></view>
			</view>
			<view @click="changeSexEvent(2)">
				<view class="sexAreaLft">女</view>
				<view class="sexAreaRgt" :class="sexIndex == 2 ? 'i-checksign': ''"></view>
			</view>
		</view>
		
		<view class="chenageSexRule">性别仅能修改一次</view>
		
	</view>
</template>

<script>
	import { unimixin } from '../../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				userInfo: '',
				sexIndex: '',
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/my/person/personal',
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
			changeSexEvent(index){
				this.sexIndex = index
				this.ajaxJson({
					url: '/summary/userInfo/setSex',
					data: { sex: this.sexIndex },
					formData: 'formData',
					method: 'POST',
					call: (data)=>{
						uni.showToast({
							icon: 'none',
							title: data.message,
							success: () => {}
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/my/person/personal',
								success: () => {}
							})
						},500)
					}
				})
			},
			initChangeSex(){
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data
						this.sexIndex = this.userInfo.sex
					}
				})
			}
		},
		created() {
			this.initChangeSex()
		}
	}
</script>

<style scoped lang="scss">
	.changeSex{
		padding-top: 28rpx;
		padding: 0 30rpx;
	}
	.saveBtn{
		display: flex;
		justify-content: space-between;
		view.saveBtnTxt{
			width: 96rpx;
			height: 48rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ccdaff;
			font-size: 24rpx;
			line-height: 24rpx;
			border-radius: 8rpx;
			background-color: #5867e6;
		}
	}
	.chengeSexArea{
		padding-top: 42rpx;
	}
	.chengeSexArea>view:nth-child(1){
		border-bottom: none;
	}
	.chengeSexArea>view:last-child{
		border-bottom: 1px solid #352446;
	}
	.chengeSexArea>view{
		border-top: 1px solid #352446;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		.sexAreaLft{
			font-size: 30rpx;
			color: #ccdaff;
		}
		.sexAreaRgt::before{
			color: #ccdaff;
		}
	}
	.chenageSexRule{
		font-size: 24rpx;
		color: #f00;
		margin-top: 18rpx;
	}
</style>
