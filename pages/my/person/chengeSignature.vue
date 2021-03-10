<template>
	<view class="changeSignture mainBox" id="scrollH" :style="[{height: screenHt + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="saveBtn">
			<view></view>
			<view class="saveBtnTxt" @click="saveEvent()">保存</view>
		</view>
		<view class="signatureIpt">
			<textarea type="text" maxlength="50" v-model="signature" />
		</view>
		<view class="signatureRule">昵称最长50位</view>
		<!-- <view class="signatureTip">{{signatureTip}}</view> -->
	</view>
</template>

<script>
	import { unimixin } from '../../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				signature: ''
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
			saveEvent(){
				if(!this.signature){
					uni.showToast({
						icon: 'none',
						title: '个性签名不能大于50位或不能为空',
						success: () => {}
					})
				}else{
					this.ajaxJson({
						url: '/summary/userInfo/setSignature',
						data: { signature: this.signature },
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
				}
			}
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
	.changeSignture{
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
	.signatureIpt{
		margin-top: 26rpx;
		border: 1px solid #352446;
		textarea{
			width: 100%;
			height: 120rpx;
			font-size: 30rpx;
			color: #ccdaff;
		}
	}
	.signatureRule{
		font-size: 24rpx;
		color: #f00;
		margin-top: 18rpx;
	}
	.signatureTip{
		font-size: 18rpx;
		color: #999;
		margin-top: 26rpx;
	}
</style>
