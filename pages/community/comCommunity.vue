<template>
	<view class="comCommunity mainBox">
		<view class="communityTit">
			<view class="" v-for="(item, index) in communityTitList" :key="index">{{item.name}}</view>
		</view>
		<view class="communityArea">
			<view v-for="(item, index) in communityAreaList">
				<view class="ranking">{{item.ranking < 10 ? '0' + item.ranking : item.ranking}}</view>
				<view class="unityName">
					<view class="unityNameImg">
						<image :src="imgUrl + item.logo" mode="aspectFit"></image>
					</view>
					<view class="unityNameTxt">{{item.name}}这是</view>
				</view>
				<view class="unityNum">{{item.likes}}123456</view>
				<view class="unitycredit">{{item.gratuity}}</view>
			</view>
		</view>
		
		<view class="addComCommunity i-plus" @click="addComCommunityEvent()"></view>
		
	</view>
</template>

<script>
	import { unimixin } from '../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				communityTitList: [
					{id: '1', name: '排名'},{id: '2', name: '社区名称'},{id: '3', name: '人数'},{id: '4', name: '信誉度'},
				],
				communityAreaList: []
			}
		},
		onLoad() {
			
		},
		methods: {
			getCommunityEvent(){
				this.ajaxJson({
					url: '/summary/community/list/rank',
					call: (data)=>{
						this.communityAreaList = data.data.rows
					}
				})
			},
			addComCommunityEvent(){
				uni.reLaunch({
					url: '/pages/community/addCommunity/addComCommunity?category=1',
					success: () => {}
				})
			}
		},
		created() {
			this.getCommunityEvent()
		}
	}
</script>

<style scoped lang="scss">
	
	.addComCommunity{
		width: 70rpx;
		height: 70rpx;
		position: fixed;
		right: 30rpx;
		bottom: 150rpx;
		z-index: 9;
	}
	.addComCommunity::before{
		font-size: 80rpx;
		color: #5867e6;
	}
	
	.comCommunity{
		padding: 44rpx 66rpx 52rpx;
		.communityTit{
			display: flex;
			view{
				color: #5867e6;
				font-size: 26rpx;
			}
			
		}
		.communityTit>view:nth-of-type(1){
			margin-right: 114rpx;
		}
		.communityTit>view:nth-of-type(2){
			margin-right: 114rpx;
		}
		.communityTit>view:nth-of-type(3){
			margin-right: 114rpx;
		}
		.communityTit>view:nth-of-type(4){
		}
	}
	.communityArea{
		margin-top: 36rpx;
		
	}
	.communityArea>view{
		margin: 18rpx 0;
		display: flex;
		color: #ccdaff;
		.unityName{
			display: flex;
			.unityNameImg{
				margin-right: 10rpx;
				width: 50rpx;
				height: 50rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.ranking{
		margin-right: 88rpx;
	}
	.unityName{
		margin-right: 70rpx;
		width: 194rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		font-size: 26rpx;
	}
	.unityNum{
		margin-right: 60rpx;
		width: 120rpx;
		display: flex;
		justify-content: center;
		font-size: 26rpx;
	}
	.unitycredit{
		width: 110rpx;
		text-align: center;
	}
</style>
