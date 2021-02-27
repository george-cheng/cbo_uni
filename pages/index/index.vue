<template>
	<view class="home mainBox mainTop" :style="[{height: screenHeight + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		
		<uniVideo class="uniVideo" :videoSrc = 'swiper'></uniVideo>


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

		<unitabbar :switchOn = '0'></unitabbar>
	</view>
</template>

<script>
	import unitabbar from '../../components/uni-tabbar/tabBar.vue'
	import { unimixin } from '../../utils/unimixin.js'
	import uniVideo from '../../components/uni-video/uniVideo.vue'
	export default {
		mixins: [ unimixin ],
		components: { unitabbar, uniVideo },
		data() {
			return {
				isPlay: true,
				swiper: [],
				popularizeType: [
					// {"name": '交易所'},
					// {"name": '交易所1'},
					// {"name": '交易所2'},
					// {"name": '交易所3'},
					// {"name": '交易所4'},
					// {"name": '交易所5'},
					// {"name": '交易所6'},
					// {"name": '交易所7'},
					// {"name": '交易所8'},
					// {"name": '交易所9'},
				],
				videoSrc: '',
				isVideo: false,
				isImg: true,
				
				marketList: '',
				cnyRate: 6.5,
				typeOn: 0
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
			initSwiper(){
				this.ajaxJson({
					url: '/site/carousel',
					call: (data)=>{
						this.swiper = data.data.rows
					}
				})
			},
			getMarket(){
				this.ajaxJson({
					url: '/site/markets',
					call: (data)=>{
						this.marketList = data.data.rows
					}
				})
			},
			popularizeTypeEvent(){
				this.ajaxJson({
					url: '/summary/popularizeType',
					call: (data)=>{
						this.popularizeType = data.data.rows
						console.log(this.popularizeType)
					}
				})
			},
			typeOnEvent(index){
				this.typeOn = index
			}
		},
		created() {
			this.initSwiper()
			this.getMarket()
			this.popularizeTypeEvent()
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
</style>
