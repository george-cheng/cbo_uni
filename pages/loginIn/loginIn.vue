<template>
	<view class="loginIn mainBox" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="loginLogo">
			<image src="../../static/logo.jpg" mode="aspectFit"></image>
		</view>
		<view class="loginArea">
			<view class="loginTit">手机登录</view>
			<view class="loginIpt">
				<view class="phoneIpt">
					<input type="number" v-model="phone" placeholder="请输入手机号">
				</view>
				<view class="pwdIpt">
					<input :password="isPassword" v-model="loginPwd" placeholder="请输入密码">
					<view class="passwordEye i-eye" @click="passwordEvent()"></view>
				</view>
			</view>
		</view>
		<view class="loginBtn uniBtn" @click="loginEvent()">登录</view>
		
		<view class="forgetPwd" @click="forgetPwdEvent()">忘记密码？</view>
		<view class="register" @click="registerEvent()">还没有账号，去注册</view>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="请输入短信验证码" :duration='2000' @confirm="loginComfirm()">
				<view class="validArea">
					<view class="validCodeIpt">
						<input type="number" maxlength="6" v-model="validCode">
					</view>
					<view class="varTxt" @click="sendValidCountEvent()">{{verTxt}}</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>
	
	import { checkPhone, checkPwd, checkNum} from '../../utils/common.js'
	import { unimixin } from '../../utils/unimixin.js'
	import  uniPopup  from '../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue'
	
	export default {
		mixins: [ unimixin ],
		components: { uniPopup, uniPopupDialog },
		data(){
			return{
				areaCode: '86',
				phone: '17621722875',
				loginPwd: '123456789a',
				validCode: '',
				Authorization: '',
				isPassword: true,
				
				isValidator: false,
				flag: true,
				verTxt: '重新发送验证码',
			}
		},
		onLoad() {

		},
		
		methods: {
			touchEnd(e){
				if(this.changeY > 50){
					this.paddingTop = 0
				}
			},
			loginEvent(){
				let params = {
					areaCode: this.areaCode,
					phone: this.phone,
					loginPwd: this.loginPwd,
					validCode: this.validCode,
				}
				
				this.validator()
				if(this.isValidator){
					this.ajaxJson({
						url: '/summary/userInfo/login',
						method: 'POST',
						data: params,
						call: (data)=>{
							if(data.code == 5006){
								this.$refs.popup.open()
								this.sendValidCountEvent()
							}else if(data.code == 200){
								this.Authorization = data.data.token
								uni.setStorageSync('Authorization', this.Authorization)
								uni.showToast({
									icon: 'none',
									title: '登陆成功',
									success: () => {}
								})
								
								uni.setStorage({
									key: 'userInfo',
									data: data.data.userInfo,
									success: () => {}
								})
								
								uni.setStorageSync('phone', this.phone)
								setTimeout(()=>{
									uni.reLaunch({
										url: '/pages/my/my',
										success: ()=>{}
									})
								},500)
								this.$refs.popup.close()
							}
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
					if(this.flag){
						timer = setInterval(()=>{
							count--;
							this.flag = false;
							if(count < 10){
								count = '0' + count
							}
							this.verTxt = count + 's后重新发送'
							if(count == 0){
								clearInterval(timer)
								this.verTxt = '重新获取验证码'
								this.flag = true
							}
						},1000)
						this.sendValidEvent()
					}
				}
			},
			registerEvent(){
				uni.reLaunch({
					url: '/pages/loginIn/register',
					success: () => {}
				})
			},
			sendValidEvent(){
				this.ajaxJson({
					url: '/summary/sendMsg/userLogin',
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
			loginComfirm(){
				if(!checkNum(this.validCode) || !this.validCode){
					uni.showToast({
						icon: 'none',
						title: '验证码错误，请重新输入',
						success: () => {
							this.validCode = ''
						}
					})
				}else{
					this.loginEvent()
				}
				
			},
			validator(){
				if(!checkPhone(this.phone) || !this.phone){
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确，请重新输入',
						success: () => {}
					})
					
				}else if(!checkPwd(this.loginPwd) || !this.loginPwd){
					uni.showToast({
						icon: 'none',
						title: '密码格式不正确，请重新输入',
						success: () => {}
					})
				}else{
					this.isValidator = true
				}
			},
			passwordEvent(){
				if(this.loginPwd){
					this.isPassword = !this.isPassword
				}
			},
			forgetPwdEvent(){
				uni.reLaunch({
					url: '/pages/loginIn/forgetPwd',
					success: () => {}
				})
			}
		},
		created() {
			this.phone = uni.getStorageSync('phone')
		}
	}
</script>

<style scoped lang="scss">
	.pwdIpt{
		position: relative;
	}
	.passwordEye{
		position: absolute;
		top: 25rpx;
		right: 20rpx;
	}
	.validArea{
		display: flex;
		align-items: center;
		.validCodeIpt{
			border: 1px solid #999;
			width: 180rpx;
			margin-right: 20rpx;
				border-radius: 6rpx;
			input{
				padding-left: 5rpx;
				height: 60rpx;
				text-align: center;
				font-size: 26rpx;
			}
		}
		.varTxt{
			white-space: nowrap;
			background-color: #b8393c;
			font-size: 30rpx;
			line-height: 30rpx;
			padding: 18rpx 10rpx;
			color: #fff;
			border-radius: 6rpx;
		}
	}
	.loginIn{
		.loginLogo{
			width: 130rpx;
			height: 130rpx;
			margin: 0 auto;
			image{
				margin-top: 150rpx;
				width: 100%;
				height: 100%;
			}
		}
		.loginArea{
			margin: 0 74rpx 0;
			position: absolute;
			top: 170rpx;
			.loginTit{
				margin-top: 170rpx;
				font-size: 30rpx;
				color: #ccdaff;
			}
			.phoneIpt, .pwdIpt{
				display: flex;
				align-items: center;
				padding-left: 18rpx;
				margin: 28rpx 0;
				width: 604rpx;
				height: 80rpx;
				border: 1px solid #fff;
				border-radius: 6rpx;
				font-size: 32rpx;
				color: #999;
			}
			.pwdIpt{
				margin-top: 48rpx;
			}
		}
		.loginBtn{
			top: 706rpx;
		}
		.forgetPwd{
			position: absolute;
			left: 50%;
			right: 50%;
			bottom: 260rpx;
			margin: auto;
			display: flex;
			justify-content: center;
			color: #ccdaff;
			font-size: 32rpx;
			white-space: nowrap;
		}
		.register{
			position: absolute;
			left: 50%;
			right: 50%;
			bottom: 78rpx;
			margin: auto;
			display: flex;
			justify-content: center;
			color: #ccdaff;
			font-size: 32rpx;
			white-space: nowrap;
		}
	}
	
</style>
