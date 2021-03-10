<template>
	<view class="forgetPwd mainBox" id="scrollH" :style="[{height: screenHt + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="forgetPwdArea">
			<view class="phoneAreaIpt">
				<input class="phoneIpt" type="text" v-model="phone" placeholder="请输入手机号">
			</view>
		</view>
		<view class="validArea">
			<view class="validAreaLft">
				<input type="number" maxlength="6" v-model="validCode" placeholder="请输入短信验证码">
				<view class="pasteValid" @click="pasteValidEvent()">粘贴</view>
			</view>
			<view class="validAreaRgt" @click="sendValidCountEvent()">{{validTxt}}</view>
		</view>
		<view class="phonePwdArea">
			<view class="phonePwdAreaIpt registerIpt">
				<input :password="isPassword" v-model="loginPwd" placeholder="请设置登录密码" />
			</view>
			<view class="passwordEye i-eye" @click="passwordEvent()"></view>
			<view class="registerTip">提示：8位字符及以上</view>
		</view>
		<view class="phoneComPwdArea">
			<view class="phoneComPwdAreaIpt registerIpt">
				<input :password="isComPassword" v-model="loginComPwd" placeholder="请确认登录密码" />
			</view>
			<view class="passwordEye i-eye" @click="comPasswordEvent()"></view>
		</view>
		
		<view class="forgetPwdBtn uniBtn" @click="forgetPwdEvent()">提交</view>
		
	</view>
</template>

<script>
	import { unimixin } from '../../utils/unimixin.js'
	import { checkPhone, checkPwd, checkNum } from '../../utils/common.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				areaCode: '86',
				phone: '',
				validCode: '',
				validTxt: '获取验证码',
				loginPwd: '',
				loginComPwd: '',
				isPassword: true,
				isComPassword: true,
				isFlag: true,
				isValidator: false,
				
			}
		},
		onLoad(options) {
			
		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/loginIn/loginIn',
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
			forgetPwdEvent(){
				let params = {
					areaCode: this.areaCode,
					phone: this.phone,
					newPwd: this.loginPwd,
					validCode: this.validCode,
				}
				this.validator()
				if(this.isValidator){
					this.ajaxJson({
						url: '/summary/userInfo/resetLoginPwd',
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
									url: '/pages/loginIn/loginIn',
									success: () => {}
								})
							}, 500)
						}
					})
				}
			},
			sendValidCountEvent(){
				if(!checkPhone(this.phone) || !this.phone){
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确，请重新输入',
						success: () => {}
					})
				}else{
					let count = 60
					let timer
					clearInterval(timer)
					if(this.isFlag){
						timer = setInterval(()=>{
							count--;
							this.isFlag = false
							if(count < 10){
								count = '0' + count
							}
							this.validTxt = count + 's 后获取'
							if(count == 0){
								clearInterval(timer)
								this.validTxt = '获取验证码'
								this.isFlag = true
							}
						}, 1000)
						this.sendValidEvent()
					}
				}
			},
			sendValidEvent(){
				this.ajaxJson({
					url: '/summary/sendMsg/forgetLoginPwd',
					data: { areaCode: this.areaCode, phone: this.phone},
					method: 'POST',
					call: (data)=>{
						if(data.code == 200){
							uni.showToast({
								icon: 'none',
								title: '验证码发送成功',
								success: () => {}
							})
						}else{
							uni.showToast({
								icon: 'none',
								title: '发送失败',
								success: () => {}
							})
						}
					}
				})
			},
			validator(){
				if(!checkPhone(this.phone) || !this.phone){
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确，请重新输入',
						success: () => {}
					})
				}else if(!checkNum(this.validCode) || !this.validCode){
					uni.showToast({
						icon: 'none',
						title: '验证码错误，请重新输入',
						success: () => {
							this.validCode = ''
						}
					})
				}else if(!checkPwd(this.loginPwd) || !this.loginPwd){
					uni.showToast({
						icon: 'none',
						title: '密码格式不正确，请重新输入',
						success: () => {}
					})
				}else if( this.loginPwd !== this.loginComPwd || !this.loginComPwd){
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致，请重新输入',
						success: () => {}
					})
				}else{
					this.isValidator = true
				}
			},
			pasteValidEvent(){
				uni.getClipboardData({
					success: (res) => {
						this.validCode = res.data
					}
				});
			},
			passwordEvent(){
				if(this.loginPwd){
					this.isPassword = !this.isPassword
				}
			},
			comPasswordEvent(){
				if(this.loginComPwd){
					this.isComPassword = !this.isComPassword
				}
			},
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
	
	.forgetPwd{
		padding: 98rpx 48rpx 0 74rpx;
		.forgetPwdArea{
			padding-top: 48rpx;
			.phoneAreaIpt{
				
			}
		}
		.validArea{
			display: flex;
			align-items: center;
			justify-content: space-between;
			input{
				width: 410rpx;
			}
			.validAreaLft{
				position: relative;
				.pasteValid{
					position: absolute;
					top: 50rpx;
					right: 20rpx;
					font-size: 24rpx;
					color: #fa2228;
				}
			}
			.validAreaRgt{
				background-color: #FA2228;
				color: #fff;
				border-radius: 12rpx;
				font-size: 26rpx;
				line-height: 26rpx;
				padding: 30rpx 20rpx;
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
	.forgetPwdBtn{
		position: absolute;
		bottom: 98rpx;
	}

	
</style>
