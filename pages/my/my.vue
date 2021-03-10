<template>
	<view class="my mainBox" id="scrollH" :style="[{height: scrollH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		
		<view class="myArea">
			<view class="myPerson">
				<view class="head">
					<image :src="imgUrl + userInfo.headPic" mode="aspectFit"></image>
				</view>
				<view class="personInfo">
					<view class="infoName">昵称：{{userInfo.nickName}}</view>
					<view class="infoId">
						<view class="infoIdTxt">id：{{userInfo.id}}</view>
						<view class="infoIdCopy i-copy" @click="copyEvent(userInfo.id)"></view>
					</view>
				</view>
			</view>
			
			<swiper class="mySwiperArea" :indicator-dots="true" :interval="3000" :duration="1000"  @change="swiperChange" indicator-color="rgb(140,182,253)" indicator-active-color="#999">
				<swiper-item v-for="(item, index) in userInfoListNum" :key="index">
					<view class="mySwiper">
						<view class="mySwiperList" v-for="(item, index) in userInfoList" :key="index" @click="mySwiperEvent(item.name, item.id, item.url)">
							<view class="listIcon">
								<view class="icon" :class="item.icon"></view>
							</view>
							<view class="listBasic">
								<image src="../../static/base.png" mode="aspectFit"></image>
							</view>
							<view class="listName">{{item.name}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			
		</view>

		<unitabbar :switchOn = '4'></unitabbar>
	</view>
</template>

<script>
	import unitabbar from '../../components/uni-tabbar/tabBar.vue'
	import { unimixin } from '../../utils/unimixin.js'
	import { accAdd, accMul } from '../../utils/common.js'
	export default {
		mixins: [ unimixin ],
		components: { unitabbar },
		data(){
			return{
				userInfo: '',
				userInfoListNum: '',
				currentIndex: 0,
				qq: '2562095187',
				userInfoList: [
					{id: 1, icon: 'i-personal', name: '个人资料', url: '/pages/my/person/personal'},
					{id: 2, icon: 'i-myassets', name: '我的资产'},
					{id: 3, icon: 'i-team', name: '我的团队'},
					{id: 4, icon: 'i-shareprofit', name: '分享收益'},
					{id: 5, icon: 'i-invita', name: '邀请好友'},
					{id: 6, icon: 'i-save', name: '安全设置', url: '/pages/my/saveSetting/saveSetting'},
					{id: 7, icon: 'i-extension', name: '推广记录'},
					{id: 8, icon: 'i-service', name: '在线客服'},
					{id: 9, icon: 'i-system', name: '系统', url: '/pages/my/system/system'},
				]
			}
		},
		onReady() {
				
		},
		methods: {
			touchEnd(e){
				if(this.changeY > 50){
					this.getUserInfo()
					this.paddingTop = 0
				}
			},
			mySwiperEvent(name, id, url){
				console.log(name + '--' + id + '---' + url)
				if(id == 8){
					plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + this.qq + '&version=1&src_type=web');
				}else{
					uni.reLaunch({
						url: url,
						success: () => {}
					})
				}
			},
			swiperChange(e){
				this.currentIndex = e.detail.current + 1
				let newUserInfoList = []
				uni.getStorage({
					key: 'userInfoList',
					success: (res)=>{
						newUserInfoList = res.data
					}
				})
				let num = 9
				newUserInfoList = newUserInfoList.slice(accMul( accAdd(this.currentIndex, -1 ), num ), accMul(this.currentIndex, num))
				this.userInfoList = newUserInfoList
			},
			initUserInfo(){
				let current = this.userInfoList.length
				this.userInfoListNum = Math.ceil(current / 9)
			},
			copyEvent(data){
				uni.setClipboardData({
					data: data,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						})
					}
				})
			},
			getUserInfo(){
				this.ajaxJson({
					url: '/summary/userInfo/refresh',
					call: (res)=>{
						uni.setStorage({
							key: 'userInfo',
							data: res.data,
							success: () => {}
						})
					}
				})
			}
		},
		created() {
			this.initUserInfo()
			uni.getStorage({
				key: 'userInfo',
				success: (res)=>{
					this.userInfo = res.data
					console.log(this.userInfo)
				}
			})
			uni.setStorage({
				key: 'userInfoList',
				data: this.userInfoList,
				success: (res)=>{}
			})
		}
	}
</script>

<style scoped lang="scss">
	.my{
		background-image: url("../../static/bg.jpg");
		background-position: 0 0;
		background-repeat: no-repeat;
		position: relative;
	}
	.myArea{
		position: absolute;
		left: 0;
		right: 0;
		height: 855rpx;
		margin: 237rpx 42rpx 0;
		background-color: #140c1c;
		border-radius: 26rpx;
		.myPerson{
			height: 100rpx;
			display: flex;
			align-items: flex-end;
			margin: 24rpx 68rpx 0;
			.head{
				width: 100rpx;
				height: 100rpx;
				image{
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
			}
			.personInfo{
				margin-left: 18rpx;
				display: flex;
				flex-direction: column;
				color: #ccdaff;
				.infoName{
					font-size: 30rpx;
					line-height: 30rpx;
				}
				.infoId{
					margin-top: 15rpx;
					font-size: 24rpx;
					line-height: 24rpx;
					display: flex;
					.infoIdCopy{
						margin-left: 10rpx;
					}
				}
			}
		}
		.mySwiperArea{
			margin: 10rpx 0 0;
			height: 662rpx;
			.mySwiper{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.mySwiperList{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					text-align: center;
					width: 96rpx;
					height: 112rpx;
					margin: 55rpx 60rpx;
					position: relative;
					.listIcon{
						position: absolute;
						top: -25rpx;
						left: 0;
						right: 0;
						margin: auto;
						.icon::before{
							color: #0780b1;
							font-size: 34rpx;
						}
					}
					.listBasic{
						width: 96rpx;
						height: 96rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.listName{
						margin-top: 10rpx;
						color: #ccdaff;
						font-size: 24rpx;
					}
				}
			}
		}
	}
	
</style>
