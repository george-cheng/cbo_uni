<template>
	<view class="saveSetting mainBox" id="scrollH" :style="[{height: screenHt + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="saveSettingArea">
			<view @click="saveSettingEvent(1)">
				<view class="areaLft">修改登录密码</view>
				<view class="areaRgt">
					<view class="areaRgtTxt"></view>
					<view class="areaRgtArrow i-rgtArrow"></view>
				</view>
			</view>
			
			<view @click="saveSettingEvent(2)" v-if="userInfo.payPwdState == 1">
				<view class="areaLft">设置支付密码</view>
				<view class="areaRgt">
					<view class="areaRgtTxt"></view>
					<view class="areaRgtArrow i-rgtArrow"></view>
				</view>
			</view>
			<view @click="saveSettingEvent(3)" v-if="userInfo.payPwdState == 2">
				<view class="areaLft">修改支付密码</view>
				<view class="areaRgt">
					<view class="areaRgtTxt"></view>
					<view class="areaRgtArrow i-rgtArrow"></view>
				</view>
			</view>
			<view @click="saveSettingEvent(4)" v-if="userInfo.payPwdState == 2">
				<view class="areaLft">忘记支付密码</view>
				<view class="areaRgt">
					<view class="areaRgtTxt"></view>
					<view class="areaRgtArrow i-rgtArrow"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { unimixin } from '../../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				userInfo: ''
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
					this.getUserInfo()
					this.paddingTop = 0
				}
			},
			saveSettingEvent(index){
				if(index == 1){
					uni.reLaunch({
						url: '/pages/my/saveSetting/changeLoginPwd',
						success: () => {}
					})
				}else if(index == 2){
					uni.reLaunch({
						url: '/pages/my/saveSetting/payPassword/setPayPwd'
					})
				}else if(index == 3){
					uni.reLaunch({
						url: '/pages/my/saveSetting/payPassword/changePayPwd'
					})
				}else if(index == 4){
					uni.reLaunch({
						url: '/pages/my/saveSetting/payPassword/forgetPayPwd'
					})
				}
			},
			getUserInfo(){
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data
					}
				})
			}
		},
		created() {
			this.getUserInfo()
		}
	}
</script>

<style scoped lang="scss">
	.saveSettingArea{
		margin: 0 30rpx;
		padding-top: 42rpx;
	}
	
	.saveSettingArea>view:nth-child(1){
		border-bottom: none;
	}
	.saveSettingArea>view:last-child{
		border-bottom: 1px solid #352446;
	}
	.saveSettingArea>view{
		border-top: 1px solid #352446;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		.areaLft{
			font-size: 30rpx;
			color: #ccdaff;
			white-space: nowrap;
			margin-right: 30rpx;
		}
		.areaRgt{
			display: flex;
			justify-content: flex-end;
			.areaRgtTxt{
				font-size: 24rpx;
				color: #ccdaff;
				margin-right: 18rpx;
				white-space: nowrap;
				text-align: right;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
	
	.areaRgtArrow:before{
		color: #ccdaff;
		font-size: 24rpx;
	}
</style>
