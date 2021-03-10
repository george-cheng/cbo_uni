<template>
	<view class="changeNickName mainBox" id="scrollH" :style="[{height: screenHt + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="saveBtn">
			<view></view>
			<view class="saveBtnTxt" @click="saveEvent()">保存</view>
		</view>
		<view class="nickNameIpt">
			<input type="text" maxlength="7" v-model="nickName" />
		</view>
		<view class="nickNameRule">昵称最长7位</view>
		<view class="nickNameT50ip">{{nickNameTip}}</view>
	</view>
</template>

<script>
	import { unimixin } from '../../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				nickName: '',
				nickNameTip: '改一个好名字更快的让朋友记住你'
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
				if(!this.nickName){
					uni.showToast({
						icon: 'none',
						title: '昵称长度不能大于7位或不能为空',
						success: () => {}
					})
				}else{
					this.ajaxJson({
						url: '/summary/userInfo/setNickName',
						data: { nickName: this.nickName },
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
	.changeNickName{
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
	.nickNameIpt{
		margin-top: 26rpx;
		border-bottom: 1px solid #352446;
		input{
			font-size: 30rpx;
			color: #ccdaff;
		}
	}
	.nickNameRule{
		font-size: 24rpx;
		color: #f00;
		margin-top: 18rpx;
	}
	.nickNameTip{
		font-size: 18rpx;
		color: #999;
		margin-top: 26rpx;
	}
</style>
