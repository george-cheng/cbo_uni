<template>
	<view class="changePayPwd mainBox" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<!-- <view class="changePayPwdArea">
			<view class="phoneAreaIpt">
				<input class="phoneIpt" type="text" v-model="phone" placeholder="请输入手机号">
			</view>
		</view> -->
		
		<view class="phonePwdArea">
			<view class="phonePwdAreaIpt registerIpt">
				<input :password="isOldPayPwd" type="number" v-model="oldPayPwd" placeholder="请输入旧支付密码" />
			</view>
			<view class="passwordEye i-eye" @click="oldPayPwdEvent()"></view>
		</view>
		<view class="phonePwdArea">
			<view class="phonePwdAreaIpt registerIpt">
				<input :password="isNewPayPwd" type="number" v-model="newPayPwd" placeholder="请设置新支付密码" />
			</view>
			<view class="passwordEye i-eye" @click="newPayPwdEvent()"></view>
			<view class="registerTip">提示：6位纯数字</view>
		</view>
		<view class="phonePwdArea">
			<view class="phonePwdAreaIpt registerIpt">
				<input :password="isNewComPayPwd" type="number" v-model="newConPayPwd" placeholder="请确认新支付密码" />
			</view>
			<view class="passwordEye i-eye" @click="newComPwdEvent()"></view>
		</view>
		
		<view class="changePayPwdBtn uniBtn" @click="changePwdEvent()">提交</view>
		
	</view>
</template>

<script>
	import { unimixin } from '../../../../utils/unimixin.js'
	import { checkPhone, checkPwd, checkNum } from '../../../../utils/common.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				areaCode: '86',
				phone: '',
				oldPayPwd: '',
				newPayPwd: '',
				newConPayPwd: '',
				isOldPayPwd: true,
				isNewPayPwd: true,
				isNewComPayPwd: true,
				isValidator: false
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/my/saveSetting/saveSetting',
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
			changePwdEvent(){
				let params = {
					areaCode: this.areaCode,
					phone: this.phone,
					oldPwd: this.oldPayPwd,
					newPwd: this.newPayPwd,
				}
				this.validator()
				if(this.isValidator){
					this.ajaxJson({
						url: '/summary/userInfo/editPayPwd',
						data: params,
						method: 'POST',
						call: (data)=>{
							uni.showToast({
								icon: 'none',
								title: data.message,
								success: () => {}
							})
							setTimeout(()=>{
								uni.reLaunch({
									url: '/pages/my/saveSetting/saveSetting',
									success: () => {}
								})
							}, 500)
						}
					})
				}
			},
			validator(){
				if(!checkPhone(this.phone) || !this.phone){
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确，请重新输入',
						success: () => {}
					})
				}else if(!checkNum(this.oldPayPwd) || !this.oldPayPwd){
					uni.showToast({
						icon: 'none',
						title: '旧密码格式不正确，请重新输入',
						success: () => {}
					})
				}else if(!checkNum(this.newPayPwd) || !this.newPayPwd){
					uni.showToast({
						icon: 'none',
						title: '新密码格式不正确，请重新输入',
						success: () => {}
					})
				}else if(this.newPayPwd !== this.newConPayPwd || !this.newConPayPwd){
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致，请重新输入',
						success: () => {}
					})
				}else{
					this.isValidator = true
				}
			},
			oldPayPwdEvent(){
				if(this.oldPayPwd){
					this.isOldPayPwd = !this.isOldPayPwd
				}
			},
			newPayPwdEvent(){
				if(this.newPayPwd){
					this.isNewPayPwd = !this.isNewPayPwd
				}
			},
			newComPwdEvent(){
				if(this.newConPayPwd){
					this.isNewComPayPwd = !this.isNewComPayPwd
				}
			}
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
	.registerTip{
		font-size: 26rpx;
		color: #fa2228;
		margin-top: 16rpx;
	}
	.phonePwdArea{
		padding: 20rpx 0;
	}
	.phonePwdArea, .phoneComPwdArea{
		position: relative;
	}
	.passwordEye{
		position: absolute;
		top: 48rpx;
		right: 20rpx;
	}
	.passwordEye::before{
		color: #fff;
	}
	
	.changePayPwd{
		padding: 0 48rpx 0 74rpx;
		.changePayPwdArea{
			padding-top: 48rpx;
			.phoneAreaIpt{
				
			}
		}
		input{
			border: 1px solid #f2f2f2;
			height: 85rpx;
			border-radius: 12rpx;
			color: #999;
			padding-left: 10rpx;
		}
	}
	
	.changePayPwdBtn{
		position: absolute;
		bottom: 98rpx;
	}
	
</style>
