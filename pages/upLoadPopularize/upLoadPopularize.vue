<template>
	<view class="upLoadPopularize mainBox mainTop" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="upImg">
			<view class="upImgArea" @click="chooseUpLoadImg()" v-if="isUpload">上传图片</view>
			<image class="upLoadChoose" v-if="!isUpload" :src="showImg" mode="aspectFit"></image>
		</view>
		<view class="upPopularizeArea">
			<view class="appType">
				<view class="appTypeName">app类型：</view>
				<view class="appTypeSelect" @click="choiceAppType()">
					<view class="appTypeSelectName">{{appName}}</view>
					<view class="appTypeSelectArrow i-downArrow"></view>
					<view class="appTypeList" v-if="isAppType">
						<view @click.stop="choiceType(index, item)" v-for="(item, index) in popularizeType" :key="index">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="appName">
				<view class="appNname">app名称：</view>
				<view class="appNameIpt">
					<input type="text" v-model="name" />
				</view>
			</view>
			<view class="appLink">
				<view class="appLinkName">app链接：</view>
				<view class="appLinkNameIpt">
					<input type="text" v-model="link" />
				</view>
			</view>
		</view>
		
		<view class="uniBtn" @click="submitEvent()">提交数据(需要{{cost}}DPC)</view>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="请输入交易密码" @confirm="submitConfirmEvent()">
				<view class="tranPwdArea">
					<view class="tranPwdAreaTxt">交易密码：</view>
					<input type="number" maxlength="6" v-model="tranPwd" />
				</view>
			</uni-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>
	
	import { unimixin } from '../../utils/unimixin.js'
	import { accAdd, accMul } from '../../utils/common.js'
	
	import uniPopup from '../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue'
	
	export default {
		mixins: [ unimixin ],
		components: { uniPopup, uniPopupDialog },
		data(){
			return{
				upLoadImgFile: '',
				showImg: '',
				logo: '',
				type: '',
				name: '',
				link: '',
				cost: '',
				tranPwd: '',
				appName: '交易所',
				isUpload: true,
				isAppType: false,
				isValidator: false,
				popularizeType: []
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(e){
			if(e.float == 'left'){
				uni.reLaunch({
					url: '/pages/index/index',
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
			popularizeTypeEvent(){
				this.ajaxJson({
					url: '/summary/popularizeType',
					call: (data)=>{
						this.popularizeType = data.data.rows
					}
				})
			},
			chooseUpLoadImg(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res)=>{
						this.upLoadImgFile = res.tempFilePaths
						this.showImg = res.tempFilePaths[0]
						
						this.ajaxUpload({
							url: '/summary/popularize/user/upload/image',
							method: 'POST',
							filePath: res.tempFilePaths[0],
							name: 'file',
							call: (data)=>{
								this.logo = data.data
								this.isUpload = false
							}
						})
					}
				});
			},
			choiceAppType(){
				this.isAppType = !this.isAppType
			},
			choiceType(index, item){
				this.type = item.id
				this.appName = item.name
				this.isAppType = false
				this.getPopularizeRule()
			},
			getPopularizeRule(){
				let type = this.type || 1
				this.ajaxJson({
					url: '/summary/publishRule/' + type,
					call: (data)=>{
						this.cost = data.data.cost
					}
				})
			},
			submitEvent(){
				this.validator()
				if(this.isValidator){
					this.$refs.popup.open()
				}
			},
			submitConfirmEvent(){
				let params = {
					type: this.type || 1,
					name: this.name,
					link: this.link,
					logo: this.logo
				}
				this.ajaxJson({
					url: '/summary/popularize/publish/' + this.tranPwd,
					data: params,
					method: 'POST',
					call: (data)=>{
						if(data.code == 200){
							uni.showToast({
								icon: 'none',
								title: data.message,
								success: () => {}
							})
						}
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/index/index',
								success: () => {}
							})
						},500)
					}
				})
			},
			validator(){
				if(!this.logo){
					uni.showToast({
						icon: 'none',
						title: '请上传图片',
						success: () => {}
					})
				}else if(!this.name){
					uni.showToast({
						icon: 'none',
						title: '请输入app名称',
						success: () => {}
					})
				}else if(!this.link || this.link.indexOf('https' && 'http') == -1){
					uni.showToast({
						icon: 'none',
						title: '请输入app完整链接或格式不正确',
						success: () => {
							this.link = ''
						}
					})
				}
				else{
					this.isValidator = true
				}
			}
		},
		created() {
			this.popularizeTypeEvent()
			this.getPopularizeRule()
		}
	}
</script>

<style scoped lang="scss">
	.uniBtn{
		margin-top: 150rpx;
		background-color: #5867e6;
		color: #ccdaff;
	}
	.upImg{
		padding-top: 318rpx;
		display: flex;
		justify-content: center;
		.upImgArea{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 194rpx;
			height: 194rpx;
			background-color: #ccdaff;
			font-size: 24rpx;
			color: #140c1c;
		}
		.upLoadChoose{
			width: 194rpx;
			height: 194rpx;
		}
	}
	.upPopularizeArea{
		padding-top: 110rpx;
		margin: 0 170rpx;
		.appType{
			display: flex;
			.appTypeName{
				color: #ccdaff;
				font-size: 24rpx;
			}
			.appTypeSelect{
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 122rpx;
				height: 30rpx;
				padding: 0 5rpx;
				font-size: 20rpx;
				border-radius: 2rpx;
				background-color: #ccdaff;
				.appTypeList{
					position: absolute;
					width: 128rpx;
					top: 35rpx;
					left: 0;
					color: #ccdaff;
					border: 1px solid #ccdaff;
					background-color: #49a9ea;
					z-index: 9;
					view{
						padding: 2rpx 5rpx;
					}
				}
			}
		}
		.appName, .appLink{
			display: flex;
			align-items: flex-end;
			height: 30rpx;
			margin: 40rpx 0;
			.appNname, .appLinkName{
				white-space: nowrap;
				font-size: 24rpx;
				color: #ccdaff;
			}
			.appNameIpt, .appLinkNameIpt{
				input{
					width: 302rpx;
					border-bottom: 1px solid #ccdaff;
					color: #ccdaff;
					font-size: 26rpx;
				}
			}
		}
	}
	.tranPwdArea{
		display: flex;
		.tranPwdAreaTxt{
			
		}
		input{
			width: 300rpx;
			border: 1px solid #333;
			text-indent: 0.2em;
		}
	}
</style>
