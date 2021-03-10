<template>
	<view class="community mainBox" :style="[{height: scrollH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		
		<view class="communityArea">
			<view class="communityAreaLft">
				<view class="communityLine"></view>
				<view class="communityName" v-for="(item, index) in nameList" :key="index">
					<view :class="{choice: choiceOn == index}" @click="choiceNameEvent(item, index)">{{item.name}}</view>
				</view>
			</view>
			<view class="communityAreaRgt">
				<view class="searchIpt">
					<view class="searchIcon i-warn"></view>
					<input type="text" v-model="search" placeholder="请输入关键字词" />
				</view>
			</view>
		</view>
		
		<view class="communityContent" >
			<comCommunity id="scrollH" v-if="choiceOn == 0"></comCommunity>
			<comProject id="scrollH" v-if="choiceOn == 1"></comProject>
			<comNews id="scrollH" v-if="choiceOn == 2"></comNews>
		</view>
		
		<unitabbar :switchOn = '2'></unitabbar>
	</view>
</template>

<script>
	import unitabbar from '../../components/uni-tabbar/tabBar.vue'
	import { unimixin } from '../../utils/unimixin.js'
	import { accAdd, accMul } from '../../utils/common.js'
	
	import comCommunity from './comCommunity.vue'
	import comProject from './comProject.vue'
	import comNews from './comNews.vue'
	
	export default {
		mixins: [ unimixin ],
		components: { unitabbar, comCommunity, comProject, comNews },
		data(){
			return{
				nameList: [
					{id:'1', name: '社区'},{id:'2', name: '项目'},{id:'3', name: '消息'},
				],
				choiceOn: '0',
				search: '',
			}
		},
		onLoad(options) {
			this.choiceOn = options.category - 1
		},
		methods: {
			touchEnd(e){
				if(this.changeY > 50){
					this.paddingTop = 0
				}
			},
			choiceNameEvent(item, index){
				this.choiceOn = index
				setTimeout(()=>{
					this.calcHeight()
				},500)
			}
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
	.communityArea{
		display: flex;
		justify-content: space-between;
		margin: 0 30rpx;
		padding-top: 88rpx;
		.communityAreaLft{
			display: flex;
			align-items: center;
			.communityLine{
				width: 6rpx;
				height: 30rpx;
				background-color: #8375f0;
				margin-right: 5rpx;
			}
			.communityName{
				display: flex;
				view{
					color: #ccdaff;
					margin-left: 30rpx;
					font-size: 30rpx;
				}
				.choice{
					color: #fa2228;
					position: relative;
				}
				.choice:after{
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
		.communityAreaRgt{
			width: 310rpx;
			height: 40rpx;
			border-radius: 20rpx;
			border: 1px solid #5867e6;
			.searchIpt{
				display: flex;
				align-items: center;
				.searchIcon{
					margin-left: 20rpx;
					margin-right: 10rpx;
				}
				.searchIcon::before{
					color: #E16531;
				}
				input{
					width: 100%;
					font-size: 22rpx;
					color: #5665e1;
				}
			}
			
			
		}
		
	}
</style>
