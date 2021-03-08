<template>
	<view class="register mainBox" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="registerTit">
			<view class="phoneRetister">手机注册</view>
			<view class="registerCountry">
				<view class="country">中国</view>
				<view class="countryChoice i-downArrow"></view>
			</view>
		</view>
		<view class="registerArea">
			<view class="phoneAreaIpt">
				<!-- <input class="areaCodeIpt" type="text" v-model="areaCode" disabled> -->
				<view class="areaCodeIpt">+{{areaCode}}</view>
				<input class="phoneIpt" type="text" v-model="phone" placeholder="请输入手机号" @blur="validatorPhone()">
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
			<view class="validArea">
				<view class="validAreaLft">
					<input type="number" v-model="validCode" placeholder="请输入短信验证码">
					<view class="pasteValid" @click="pasteValidEvent()">粘贴</view>
				</view>
				<view class="validAreaRgt" @click="sendValidCountEvent()">{{validTxt}}</view>
			</view>
			<view class="superCodeArea">
				<view class="superCodeAreaIpt registerIpt">
					<input type="text" v-model="superCode" placeholder="请输入邀请码(区分大小写)" />
				</view>
			</view>
			<view class="registerWarn">
				<view class="warnIcon i-warn"></view>
				<view>国家或地区注册后不能更改</view>
			</view>
			
			<view class="registerBtn uniBtn" @click="registerEvent()">注册</view>
			
			<view class="serviceArea">
				<view class="serviceCheck" @click="serviceChoiceEvent()" :class="[isService?'i-checked':'i-check']"></view>
				<view class="serviceAreaInfo">
					<view>我已阅读并同意</view>
					<view class="serviceAreaTxt" @click="serviceEvent()">《用户注册及隐私协议》</view>
				</view>
			</view>
			
			<view class="loginBtnArea" @click="loginEvent()">
				<view class="loginBtnInfo">已有帐号，</view>
				<view class="loginBtnTxt">去登陆</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { checkPhone, checkPwd, checkNum} from '../../utils/common.js'
	import { unimixin } from '../../utils/unimixin.js'
	
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				areaCode: '86',
				phone: '',
				loginPwd: '',
				loginComPwd: '',
				validCode: '',
				superCode: '',
				isPassword: true,
				isComPassword: true,
				isService: false,
				isFlag: true,
				isValidator: false,
				validTxt: '获取验证码'
			}
		},
		onLoad() {

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
			registerEvent(){
				let params = {
					areaCode: this.areaCode,
					phone: this.phone,
					loginPwd: this.loginPwd,
					validCode: this.validCode,
					superCode: this.superCode
				}
				this.validator()
				if(this.isValidator){
					
					this.ajaxJson({
						url: '/summary/userInfo/register',
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
				}else if( this.loginPwd !== this.loginComPwd || !this.loginComPwd){
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致，请重新输入',
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
				}else if(!this.isService){
					uni.showToast({
						icon: 'none',
						title: '请阅读协议并勾选',
						success: () => {}
					})
				}else{
					this.isValidator = true
				}
			},
			validatorPhone(){
				if(!checkPhone(this.phone) || !this.phone){
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确，请重新输入',
						success: () => {}
					})
				}else{
					this.ajaxJson({
						url: '/summary/userInfo/checkPhoneExits',
						data: { areaCode: this.areaCode, phone: this.phone },
						call: (data)=>{
							if(data.code == 5002){
								uni.showToast({
									icon: 'none',
									title: data.message,
									success: () => {}
								})
								this.phone = ''
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
					url: '/summary/sendMsg/userRegister',
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
			pasteValidEvent(){
				uni.getClipboardData({
					success: (res) => {
						this.validCode = res.data
					}
				});
			},
			serviceEvent(){
				uni.reLaunch({
					url: '/pages/sundry/serviceAgreement',
					success: () => {}
				})
			},
			loginEvent(){
				uni.reLaunch({
					url: '/pages/loginIn/loginIn',
					success: () => {}
				})
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
			serviceChoiceEvent(){
				this.isService = !this.isService
			},
		},
		created() {
			
		}
	}
</script>

<style scoped lang="scss">
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
	.registerTip{
		font-size: 26rpx;
		color: #fa2228;
		margin-top: 16rpx;
	}
	.registerWarn{
		display: flex;
		color: #fa2228;
		font-size: 24rpx;
		.warnIcon{
			margin-right: 5rpx;
		}
	}
	.register{
		padding: 98rpx 48rpx 0 74rpx;
		.registerTit{
			padding-top: 48rpx;
			color: #ccdaff;
			display: flex;
			justify-content: space-between;
			.phoneRetister{
				font-size: 30rpx;
			}
			.registerCountry{
				display: flex;
				font-size: 30rpx;
				.countryChoice{
					margin-left: 5rpx;
				}
			}
		}
		.registerArea{
			.phonePwdAreaIpt{
			}
			.phoneAreaIpt{
				// margin-top: 35rpx;
				display: flex;
				align-items: center;
				.areaCodeIpt{
					width: 128rpx;
					height: 85rpx;
					margin-right: 40rpx;
					text-align: center;
					font-size: 32rpx;
					padding-left: 0;
					border-radius: 12rpx;
					border: 1px solid #f2f2f2;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.phoneIpt{
					width: 450rpx;
					font-size: 32rpx;
					input{
						
					}
				}
			}
			.registerIpt{
				// width: 600rpx;
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
		.registerBtn{
			margin-top: 30rpx;
		}
		
		.serviceArea{
			display: flex;
			justify-content: center;
			
			margin-top: 162rpx;
			.serviceCheck{
				margin-right: 5rpx;
			}
			.serviceCheck::before{
				color: #999;
			}
			.serviceAreaInfo{
				display: flex;
				justify-content: center;
				color: #ccdaff;
				font-size: 24rpx;
				.serviceAreaTxt{
					color: #fa2228;
				}
			}
		}
		.loginBtnArea{
			color: #fff;
			display: flex;
			justify-content: center;
			margin-top: 60rpx;
			.loginBtnTxt{
				color: #fa2228;
			}
		}
	}
</style>
