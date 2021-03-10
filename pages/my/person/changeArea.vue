<template>
	<view class="changeArea mainBox" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="getLocation">
			<view class="locationTit">当前位置</view>
			<view class="locationArea" v-if="!location">
				<view class="locationAreaIcon i-warn"></view>
				<view class="locationAreaTxt">{{locationName}}</view>
			</view>
			
			<view @click="choiceNowCity()" class="locationCity" v-if="location">{{location}}</view>
			
		</view>
		
		
		<view class="allLocation">
			<view class="allLocationTit">全部地区</view>
			<view class="allLocationArea">
				<view v-for="(item, index) in cityList" @click="choiceCity(index)">
					<view class="areaLft">{{item.provinceName}}</view>
					<view class="areaRgt">
						<view class="choiceArea"></view>
						<view class="choiceAreaIcon i-rgtArrow"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { unimixin } from '../../../utils/unimixin.js'
	import city from '../../../utils/city.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				locationName: '无法获取你的位置信息',
				location: '',
				countryList: [],
				cityList: city.data
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/my/person/personal',
					success: () => {}
				})
			}
		},
		methods: {
			touchEnd(e){
				if(this.changeY > 50){
					this.initCity()
					this.paddingTop = 0
				}
			},
			choiceCity(index){
				uni.reLaunch({
					url: '/pages/my/person/choiceCity?cityIndex=' + index,
					success: () => {}
				})
			},
			choiceNowCity(){
				this.ajaxJson({
					url: '/summary/userInfo/setRegion',
					data: {region: this.location},
					formData: 'formData',
					method: 'POST',
					call: (data)=>{
						uni.showToast({
							icon: 'none',
							title: data.message,
							success: () => {}
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/my/person/personal',
								success: () => {}
							})
						}, 500)
					}
				})
			},
			initCity(){
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: (res)=>{
						let address = res.address
						this.location = address.province + ' ' + address.city
					}
				})
			},
		},
		created() {
			this.initCity()
		}
	}
</script>

<style scoped lang="scss">
	.choiceAreaIcon::before{
		font-size: 24rpx;
	}
	.locationCity{
		font-size: 28rpx;
		color: #999;
		background-color: #281d33;
		padding: 26rpx 30rpx;
		margin-top: 15rpx;
	}
	.getLocation, .allLocation{
		.locationTit, .allLocationTit{
			padding: 48rpx 30rpx 0;
			font-size: 24rpx;
			color: #999;
		}
		.allLocationTit{
			padding: 15rpx 30rpx 15rpx;
		}
		.locationArea{
			background-color: #281d33;
			padding: 26rpx 30rpx;
			margin-top: 15rpx;
			display: flex;
			.locationAreaIcon{
				margin-right: 10rpx;
			}
			.locationAreaIcon::before{
				color: #b8393c;
			}
			.locationAreaTxt{
				font-size: 28rpx;
				color: #999;
			}
		}
		.allLocationArea{
		
			font-size: 28rpx;
			color: #ccdaff;
		}
		.allLocationArea>view{
			border-bottom: 1px solid #352446;
			background-color: #281d33;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			.areaRgt{
				display: flex;
				.choiceArea{
					font-size: 24rpx;
					color: #999;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
