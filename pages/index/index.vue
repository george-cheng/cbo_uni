<template>
	<view class="home mainBox mainTop" :style="[{height: screenHeight + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		
		<!-- <uniVideo class="uniVideo" :videoSrc = 'swiper'></uniVideo> -->
		
		<view style="height: 314rpx;"></view>

		<view class="market">
			<view v-for="(item, index) in marketList" :key="index">
				<view class="displayName">{{item.displayName}}</view>
				<view class="price">{{item.price}}</view>
				<view class="chg">{{item.chg}}</view>
				<view class="rateCny">≈{{accMul(item.price, cnyRate)}}CNY</view>
			</view>
		</view>
		
		<view class="popularizeType">
			<view class="popularizeTypeLine"></view>
			<view class="popularizeTypeNavArea">
				<view class="popularizeTypeNavList" v-for="(item, index) in popularizeType" :key="index" style="color: #fff;">
					<view class="popularizeTypeNav" :class="{typeNav: index == typeOn}" @click="typeOnEvent(index)">{{item.name}}</view>
				</view>
			</view>
		</view>
		
		
		
		<swiper class="popularizeSwiper" indicator-dots circular @change="swiperChange"  interval="3000" indicator-color="rgb(140,182,253)" indicator-active-color="#999">
			<swiper-item v-for="(item, index) in popularizeNum" :key="index">
				<view class="popularizeAreaList" >
					<view class="popularizeAreaFlex" v-for="(item, index) in PopularizeTypeList" :key="index" @click="popularizeOpenLinkEvent(item)">
						
						
						<view class="popularizeLogo">
							<image :src="imgUrl + item.logo" mode="aspectFit"></image>
						</view>
						<view class="popularizeBase">
							<image src="../../static/base.png" mode="aspectFit"></image>
						</view>
						<view class="popularizeName">{{item.name}}</view>
					</view>
					<view class="addPopularize" @click="addPopularizeEvent()">
						<view class="popularizeLogo">
							<image :src="imgUrl + item.logo" mode="aspectFit"></image>
						</view>
						<view class="popularizeBase">
							<image src="../../static/base.png" mode="aspectFit"></image>
						</view>
						<view class="popularizeName">添加</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<uni-popup ref="popup" type="dialog" :mkclick="true">
			<uni-popup-dialog title="" :isBtn="false" :duration='2000' >
				<view class="popularizeRule">
					<rich-text :nodes="popularizeRule"></rich-text>
					<view class="popularizeSundry">
						<view class="serviceCheck" @click="serviceChoiceEvent()" :class="[isService?'i-checked':'i-check']"></view>
						<view class="serviceAreaInfo">
							<view>我已阅读并同意</view>
							<view class="serviceAreaTxt" @click="popularizeServiceEvent()">《上传app合同协议》</view>
						</view>
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>
		
		<unitabbar :switchOn = '0'></unitabbar>
	</view>
</template>

<script>
	import unitabbar from '../../components/uni-tabbar/tabBar.vue'
	import { unimixin } from '../../utils/unimixin.js'
	import uniVideo from '../../components/uni-video/uniVideo.vue'
	import uniSwiper from '../../components/uni-swiperpage/uniSwiperPage.vue'
	import { accAdd, accMul } from '../../utils/common.js'
	
	import uniPopup from '../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue'
	
	export default {
		mixins: [ unimixin ],
		components: { unitabbar, uniVideo, uniSwiper, uniPopup, uniPopupDialog},
		data() {
			return {
				isPlay: true,
				swiper: [],
				popularizeType: [],
				popularizeRule: '',
				PopularizeTypeList: [],
				videoSrc: '',
				isVideo: false,
				isImg: true,
				
				marketList: '',
				typeOn: 0,
				limit: 9,
				popularizeNum: '',
				itmeId: '',
				category: '',
				isService: false
			}
		},
		onLoad(options) {
			this.category = options.category
			setTimeout(()=>{
				if(this.category == 1){
					this.$refs.popup.open()
				}
			},500)
		},
		methods: {
			touchEnd(e){
				if(this.changeY > 50){
					this.paddingTop = 0
				}
			},
			/*  视频  */
			initSwiper(){
				this.ajaxJson({
					url: '/site/carousel',
					call: (data)=>{
						this.swiper = data.data.rows
					}
				})
			},
			/* 市场USDT */
			getMarket(){
				this.ajaxJson({
					url: '/site/markets',
					call: (data)=>{
						this.marketList = data.data.rows
					}
				})
			},
			/* 分类类别 */
			popularizeTypeEvent(){
				this.ajaxJson({
					url: '/summary/popularizeType',
					call: (data)=>{
						this.popularizeType = data.data.rows
					}
				})
			},
			/* 推广信息 */
			swiperChange(e){
				this.PopularizeTypeList = []
				let current = parseInt(e.detail.current) + 1
				this.getPopularizeTypeEvent(current)
			},
			getPopularizeTypeEvent(current){
				let params = {
					type: this.typeOn + 1,
					limit: this.limit,
					page: current || 1
				}
				this.ajaxJson({
					url: '/summary/popularize/type',
					data: params,
					call: (data)=>{
						if(data.code == 200){
							this.PopularizeTypeList = data.data.rows
						}
						let popularizeNum = data.data.total
						if(popularizeNum % 9 == 0){
							popularizeNum = accAdd( popularizeNum, 1 )
						}
						this.popularizeNum = Math.ceil(popularizeNum / 9) 
					}
				})
			},
			typeOnEvent(index){
				this.typeOn = index
				this.PopularizeTypeList = []
				this.getPopularizeTypeEvent()
			},
			/* 添加推广信息 */
			addPopularizeEvent(){
				this.getPopularizeRuleEvent()
				this.$refs.popup.open()
			},
			/* 打开链接 */
			popularizeOpenLinkEvent(item){
				let link = item.link
				if(link.indexOf('https' && 'http') == -1){
					link = 'https://' + link
					console.log(1)
				}
				uni.reLaunch({
					url: '/pages/index/openUrl?url=' + link,
					success: () => {}
				})
			},
			getPopularizeRuleEvent(){
				let typeId = this.typeOn + 1
				this.ajaxJson({
					url: '/summary/publishRule/' + typeId ,
					call: (data)=>{
						this.popularizeRule = data.data.synopsis
					}
				})
			},
			serviceChoiceEvent(){
				this.isService = !this.isService
				if(this.isService){
					uni.reLaunch({
						url: '/pages/upLoadPopularize/upLoadPopularize',
						success: () => {}
					})
				}
			},
			popularizeServiceEvent(){
				uni.reLaunch({
					url: '/pages/sundry/popularizeAgreement',
					success: () => {}
				})
			},
			getCity(){
				uni.getLocation({
					type: 'gcj02',
					geocode: true,//设置该参数为true可直接获取经纬度及城市信息
					success: (res)=>{
						console.log(res)
					}
				})
			}
		},
		created() {
			this.initSwiper()
			this.getMarket()
			this.popularizeTypeEvent()
			this.getPopularizeTypeEvent()
			if(this.category == 1){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style scoped lang="scss">
	.uniVideo {
		padding-top: 88rpx;
	}
	.market{
		margin: 14rpx 30rpx 0;
		padding: 25rpx 0;
		background-color: #321b4d;
		display: flex;
		justify-content: space-around;
		text-align: center;
		font-size: 26rpx;
		line-height: 26rpx;
		.displayName{
			color: #ccdaff;
			margin-top: 18rpx;
		}
		.price{
			margin-top: 18rpx;
			color: #b8393c;
		}
		.chg{
			margin-top: 18rpx;
			color: #3ba987;
		}
		.rateCny{
			margin-top: 18rpx;
			color: #999;
		}
	}
	.popularizeType{
		margin: 22rpx 30rpx 0;
		display: flex;
		align-items: center;
		.popularizeTypeLine{
			margin-right: 25rpx;
			width: 6rpx;
			height: 30rpx;
			background-color: #8375f0;
		}
		.popularizeTypeNavArea{
			display: flex;
			overflow: scroll;
			.popularizeTypeNavList{
				margin-right: 32rpx;
				.popularizeTypeNav{
					white-space: nowrap;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
				}
			}
			.typeNav{
				color: #fa2228;
				position: relative;
			}
			.typeNav::after{
				position: absolute;
				left: 0;
				bottom: -10rpx;
				content: '';
				width: 100%;
				height: 4rpx;
				background-color: #fa2228;
			}
		}
		
	}

	.popularizeSwiper{
		margin: 8rpx 50rpx 0;
		height: 534rpx;
		.popularizeAreaList{
			width: 100%;
			display:flex;
			flex-wrap: wrap;
			.popularizeAreaFlex{
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				justify-content: space-around;
				text-align: center;
				width: 96rpx;
				height: 112rpx;
				margin: 26rpx 60rpx;
				position: relative;
				
			}	
		}
	}
	.addPopularize{
		position: relative;
		height: 112rpx;
		margin: 26rpx 60rpx 0;
	}
	.popularizeLogo{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
		width: 36rpx;
		height: 36rpx;
		margin: 0 auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.popularizeBase{
		position: absolute;
		top: 22rpx;
		width: 96rpx;
		height: 93rpx;
		margin: 0 auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.popularizeName{
		position: absolute;
		top: 125rpx;
		left: 0;
		right: 0;
		width: 96rpx;
		margin: auto;
		font-size: 24rpx;
		color: #ccdaff;
		white-space: nowrap;
		text-align: center;
	}
	.popularizeSundry{
		display: flex;
		justify-content: center;
		
		margin-top: 20rpx;
		.serviceCheck{
			margin-right: 5rpx;
		}
		.serviceCheck::before{
			color: #d20e0e;
		}
		.serviceAreaInfo{
			display: flex;
			justify-content: center;
			color: #d20e0e;
			font-size: 24rpx;
			.serviceAreaTxt{
				color: #d20e0e;
			}
		}
	}
</style>
