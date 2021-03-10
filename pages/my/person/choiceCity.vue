<template>
	<view class="choiceCity mainBox" id="scrollH" :style="[{height: screenHt + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="cityArea">
			<view v-for="(item, index) in citysNameList" :key="index" @click="choiceCity(item)">
				<view class="areaLft">{{item.citysName}}</view>
				<view class="areaRgt">
					<view class="choiceArea"></view>
					<view class="choiceAreaIcon i-rgtArrow"></view>
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
				cityIndex: '',
				cityList: city.data,
				citysNameList: '',
				province: '',
			}
		},
		onLoad(options) {
			this.cityIndex = options.cityIndex
		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/my/person/changeArea',
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
			choiceCity(item){
				let region = this.province + ' ' + item.citysName
				this.ajaxJson({
					url: '/summary/userInfo/setRegion',
					data: {region: region},
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
				this.citysNameList = this.cityList[this.cityIndex].citys
				this.province = this.cityList[this.cityIndex].provinceName
			}
		},
		created() {
			this.initCity()
		}
	}
</script>

<style scoped lang="scss">
	.choiceCity{
			.cityArea{
				font-size: 28rpx;
				color: #ccdaff;
			}
			.cityArea>view{
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
	.choiceAreaIcon::before{
		font-size: 24rpx;
	}
</style>
