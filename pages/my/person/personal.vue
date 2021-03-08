<template>
	<view class="personal mainBox" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="personalArea">
			<view @click="personalEvent(1)">
				<view class="areaLft">头像</view>
				<view class="areaRgt">
					<view class="areaRgtTxt areaRgtHeadPic">
						<view class="headPic">
							<image :src="imgUrl + userInfo.headPic" mode="aspectFit"></image>
						</view>
					</view>
					<view class="areaRgtArrow i-rgtArrow"></view>
				</view>
			</view>
			<view @click="personalEvent(2)">
				<view class="areaLft">昵称</view>
				<view class="areaRgt">
					<view class="areaRgtTxt">{{userInfo.nickName}}</view>
					<view class="areaRgtArrow i-rgtArrow"></view>
				</view>
			</view>
			<view>
				<view class="areaLft">ID</view>
				<view class="areaRgt">
					<view class="areaRgtTxt">{{userInfo.id}}</view>
					<view class="areaRgtArrow hideClass i-rgtArrow"></view>
				</view>
			</view>
			<view @click="personalEvent(3)">
				<view class="areaLft">性别</view>
				<view class="areaRgt">
					<view class="areaRgtTxt">{{userInfo.sex == 1 ?'男':'女'}}</view>
					<view class="areaRgtArrow i-rgtArrow"></view>
				</view>
			</view>
			<view @click="personalEvent(4)">
				<view class="areaLft">个性签名</view>
				<view class="areaRgt">
					<view class="areaRgtTxt">{{userInfo.signature}}</view>
					<view class="areaRgtArrow i-rgtArrow"></view>
				</view>
			</view>
			<view @click="personalEvent(5)">
				<view class="areaLft">地区</view>
				<view class="areaRgt">
					<view class="areaRgtTxt">{{userInfo.region}}</view>
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
				sex: '男',
				userInfo: '',
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
			personalEvent(index){
				if(index == 1){
					uni.chooseImage({
						count: 1,
						sizeType: ['original', 'compressed'],
						sourceType: ['album'],
						success: (res)=>{
							this.ajaxUpload({
								url: '/summary/userInfo/upload/headPic/image',
								method: 'POST',
								filePath: res.tempFilePaths[0],
								name: 'file',
								call: (data)=>{
									let headSrc = data.data
									if(headSrc){
										this.ajaxJson({
											url: '/summary/userInfo/setHeadPic',
											method: 'POST',
											data: { headPic: headSrc },
											formData: 'formData',
											call: (data)=>{
												uni.showToast({
													icon: 'none',
													title: data.message,
													success: () => {
														this.getUserInfo()
													}
												})
											}
										})
									}
								}
							})
						}
					})
				}else if(index == 2){
					uni.reLaunch({
						url: '/pages/my/person/changeNickName',
						success: () => {}
					})
				}else if(index == 3){
					uni.reLaunch({
						url: '/pages/my/person/changeSex',
						success: () => {}
					})
				}else if(index == 4){
					uni.reLaunch({
						url: '/pages/my/person/chengeSignature',
						success: () => {}
					})
				}else if(index == 5){
					uni.reLaunch({
						url: '/pages/my/person/changeArea',
						success: () => {}
					})
				}
			},
			initGetUserInfo(){
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						// this.userInfo = res.data
					}
				})
			},
			getUserInfo(){
				this.ajaxJson({
					url: '/summary/userInfo/refresh',
					call: (res)=>{
						this.userInfo = res.data
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
			this.getUserInfo()
		}
	}
</script>

<style scoped lang="scss">
	.areaRgtHeadPic{
		display: flex;
		justify-content: flex-end;
	}
	.personalArea{
		margin: 0 30rpx;
		padding-top: 42rpx;
	}
	.personalArea>view:nth-child(1){
		height: 130rpx;
		border-bottom: none;
	}
	.personalArea>view:last-child{
		border-bottom: 1px solid #352446;
	}
	.personalArea>view{
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
					width: 500rpx;
					text-align: right;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					.headPic{
						width: 48rpx;
						height: 48rpx;
						text-align: right;
						image{
							border-radius: 50%;
							width: 100%;
							height: 100%;
						}
					}
				}
				.areaRgtArrow:before{
					color: #ccdaff;
				}
			}
		}
</style>
