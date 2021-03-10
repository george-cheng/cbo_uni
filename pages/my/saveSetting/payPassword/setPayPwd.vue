<template>
	<view class="setPayPwd mainBox" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="setPayPwdArea">
			<view class="phoneAreaIpt">
				<input class="phoneIpt" type="text" v-model="phone" placeholder="请输入手机号">
			</view>
		</view>
		
		<view class="phonePwdArea">
			<view class="phonePwdAreaIpt registerIpt">
				<input maxlength="6" :password="isPayPwd" v-model="newPwd" placeholder="请设置交易密码" />
			</view>
			<view class="passwordEye i-eye" @click="passwordEvent()"></view>
			<view class="registerTip">提示：6位纯数字</view>
		</view>
		<view class="phoneComPwdArea">
			<view class="phoneComPwdAreaIpt registerIpt">
				<input maxlength="6" :password="isPayConPwd" v-model="newComPwd" placeholder="请确认交易密码" />
			</view>
			<view class="passwordEye i-eye" @click="comPasswordEvent()"></view>
		</view>
		
		<view class="setPayPwdBtn uniBtn" @click="setPayPwdEvent()">提交</view>
		
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
				newPwd: '',
				newComPwd: '',
				isPayPwd: true,
				isPayConPwd: true,
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
			setPayPwdEvent(){
				let params = {
					areaCode: this.areaCode,
					phone: this.phone,
					newPwd: this.newPwd,
				}
				this.validator()
				if(this.isValidator){
					this.ajaxJson({
						url: '/summary/userInfo/setPayPwd',
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
				}else if(!checkNum(this.newPwd) || !this.newPwd){
					uni.showToast({
						icon: 'none',
						title: '密码格式不正确,请重新输入',
						success: () => {}
					})
				}else if(this.newPwd !== this.newComPwd || !this.newComPwd){
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致，请重新输入',
						success: () => {}
					})
				}else{
					this.isValidator = true
				}
			},
			passwordEvent(){
				if(this.newPwd){
					this.isPayPwd = !this.isPayPwd
				}
			},
			comPasswordEvent(){
				if(this.newComPwd){
					this.isPayConPwd = !this.isPayConPwd
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
	
	.phonePwdArea, .phoneComPwdArea{
		position: relative;
	}
	.passwordEye{
		position: absolute;
		top: 30rpx;
		right: 20rpx;
	}
	.passwordEye::before{
		color: #fff;
	}
	
	.setPayPwd{
		padding: 0 48rpx 0 74rpx;
		.setPayPwdArea{
			padding-top: 48rpx;
			.phoneAreaIpt{
				
			}
		}
		input{
			margin: 20rpx 0;
			border: 1px solid #f2f2f2;
			height: 85rpx;
			border-radius: 12rpx;
			color: #999;
			padding-left: 10rpx;
		}
	}
	
	.setPayPwdBtn{
		position: absolute;
		bottom: 98rpx;
	}
	
</style>
