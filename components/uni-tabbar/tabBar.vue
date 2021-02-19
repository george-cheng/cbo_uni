<template>
	<view class="tarbar">
			<view @click="switchBarEvent(item, index)" class="barList" v-for="(item, index) in barList" :key="index">
				<view class="barImg">
					<image :src="switchOn == item.id ? item.selectedIconPath : item.iconPath" mode="aspectFit"></image>
				</view>
				<text class="tabTit" :class="switchOn == item.id ? 'tabTxtChoice' : 'tabTxt'">{{item.text}}</text>
			</view>
		</view>
</template>

<script>
	export default {
		props: [
			'switchOn'
		],
		data(){
			return{
				swtichOn: '0',
				barList: [
					{	
						"id": '0',
						"text": "首页",
						"pagePath": "/pages/index/index",
						"iconPath": "../../static/icon/home.png",
						"selectedIconPath": "../../static/icon/homeSelect.png"
					},
					{
						"id": '1',
						"text": "上链",
						"pagePath": "/pages/cochain/cochain",
						"iconPath": "../../static/icon/cochain.png",
						"selectedIconPath": "../../static/icon/cochainSelect.png"
					},
					{
						"id": '2',
						"text": "社区",
						"pagePath": "/pages/community/community",
						"iconPath": "../../static/icon/community.png",
						"selectedIconPath": "../../static/icon/communitySelect.png"
					},
					{
						"id": '3',
						"text": "发现",
						"pagePath": "/pages/discover/discover",
						"iconPath": "../../static/icon/discover.png",
						"selectedIconPath": "../../static/icon/discoverSelect.png"
					},
					{
						"id": '4',
						"text": "我的",
						"pagePath": "/pages/my/my",
						"iconPath": "../../static/icon/my.png",
						"selectedIconPath": "../../static/icon/mySelect.png"
					},
				]
			}
		},
		onLoad() {

		},
		methods: {
			switchBarEvent(item, index){
				this.$emit('tabEvent')
				uni.reLaunch({
					url: item.pagePath,
					success: () => {}
				})
				this.swtichOn = index
			}
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
	.tarbar{
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		background-color: #140C1C;
		border-top: 1px solid #1e112a;
		.barList{
			width: 100%;
			display: flex;
			justify-content: space-between;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			.barImg{
				width: 36rpx;
				height: 36rpx;
				margin: 0 auto;
				margin-top: 15rpx;
			}
			image{
				width: 100%;
				height: 100%;
			}
			.tabTit{
				font-size: 26rpx;
				line-height: 30rpx;
				margin: 8rpx auto 10rpx;
				margin-bottom: 15rpx;
				padding-bottom: 8rpx;
			}
			.tabTxt{
				color: #ccdaff;
			}
			.tabTxtChoice{
				color: #5867e6;
			}
		}
	}
</style>

