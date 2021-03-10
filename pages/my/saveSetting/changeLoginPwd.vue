<template>
	<view class="changeLoginPwd mainBox" id="scrollH" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<!-- <view class="changePwd">
			<view class="phoneAreaIpt">
				<input class="phoneIpt" type="text" v-model="phone" placeholder="请输入手机号">
			</view>
		</view> -->
		<view class="phonePwdArea">
			<view class="phonePwdAreaIpt registerIpt">
				<input :password="isOldPwd" v-model="oldPwd" placeholder="请输入旧密码" />
			</view>
			<view class="passwordEye i-eye" @click="oldPwdEvent()"></view>
		</view>
		<view class="phonePwdArea">
			<view class="phonePwdAreaIpt registerIpt">
				<input :password="isNewPwd" v-model="newPwd" placeholder="请设置登录密码" />
			</view>
			<view class="passwordEye i-eye" @click="newPwdEvent()"></view>
			<view class="registerTip">提示：8位字符及以上</view>
		</view>
		<view class="phonePwdArea">
			<view class="phonePwdAreaIpt registerIpt">
				<input :password="isNewComPwd" v-model="newConPwd" placeholder="请确认登录密码" />
			</view>
			<view class="passwordEye i-eye" @click="newComPwdEvent()"></view>
		</view>
		
		<view class="changePwdBtn uniBtn" @click="changePwdEvent()">提交</view>
		
	</view>
</template>

<script>
	import { unimixin } from '../../../utils/unimixin.js'
	import { checkPhone, checkPwd, checkNum } from '../../../utils/common.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				areaCode: '86',
				phone: '',
				oldPwd: '',
				newPwd: '',
				newConPwd: '',
				isOldPwd: true,
				isNewPwd: true,
				isNewComPwd: true,
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
					phone: this.phone,
					areaCode: this.areaCode,
					oldPwd: this.oldPwd,
					newPwd: this.newPwd,
				}
				this.validator()
				if(this.isValidator){
					this.ajaxJson({
						url: '/summary/userInfo/editLoginPwd',
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
				}else if(!checkPwd(this.oldPwd) || !this.oldPwd){
					uni.showToast({
						icon: 'none',
						title: '旧密码格式不正确，请重新输入',
						success: () => {}
					})
				}else if(!checkPwd(this.newPwd) || !this.newPwd){
					uni.showToast({
						icon: 'none',
						title: '新密码格式不正确，请重新输入',
						success: () => {}
					})
				}else if(this.newPwd !== this.newConPwd || !this.newConPwd){
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致，请重新输入',
						success: () => {}
					})
				}else{
					this.isValidator = true
				}
			},
			oldPwdEvent(){
				if(this.oldPwd){
					this.isOldPwd = !this.isOldPwd
				}
			},
			newPwdEvent(){
				if(this.newPwd){
					this.isNewPwd = !this.isNewPwd
				}
			},
			newComPwdEvent(){
				if(this.newConPwd){
					this.isNewComPwd = !this.isNewComPwd
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
	
	
	.changeLoginPwd{
		padding: 98rpx 48rpx 0 74rpx;
		.changePwd{
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
	
	.changePwdBtn{
		position: absolute;
		bottom: 98rpx;
	}
</style>
