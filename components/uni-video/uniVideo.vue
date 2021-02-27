<template>
	<view class="videoArea">
		
			<view class="lftArrow i-lftArrow" @click="lftArrowEvent()"></view>
			<video :src="imgUrl + videoImg" @play="change()"></video>
			<view class="rgtArrow i-rgtArrow" @click="rgtArrowEvent()"></view>
	</view>
</template>

<script>
	import { unimixin } from '../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		props: [
			'videoSrc'
		],
		data(){
			return{
				videoImg: '',
				timer: null,
				index: 0
			}
		},
		onLoad() {

		},
		methods: {
			lftArrowEvent(){
				clearInterval(this.timer)
				if(this.index <= 0){
					this.index = 2
				}else{
					this.index --
				}
				this.videoImg = this.videoSrc[this.index].file
			},
			rgtArrowEvent(){
				clearInterval(this.timer)
				if(this.index >= this.videoSrc.length - 1){
					this.index = 0
				}else{
					this.index ++
				}
				this.videoImg = this.videoSrc[this.index].file
			},
			videoEvent(){
				this.timer = setInterval(()=>{
					this.index ++ 
					if(this.index >= this.videoSrc.length){
						this.index = 0
					}
					this.videoImg = this.videoSrc[this.index].file
				},2000)
			},
			change(){
				clearInterval(this.timer)
			}
		},
		created() {
			setTimeout(()=>{
				this.videoEvent()
			},500)

		}
	}
</script>

<style scoped lang="scss">
	.lftArrow, .rgtArrow{
		position: absolute;
		z-index: 99999;
		padding-top: 150rpx;
		height: 350rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		background-color: #6c6d6d;
		margin: 0 30rpx;
	}
	.lftArrow{
		left: 0rpx;
	}
	.rgtArrow{
		right: 0rpx;
	}
	.i-lftArrow::before, .i-rgtArrow::before{
		color: #fff;
		font-size: 36rpx;
	}
	.videoArea{
		width: 560rpx;
		height: 350rpx;
		padding: 0 100rpx;
		display: flex;
		flex-direction: row;
		video{
			width: 100%;
			height: 100%;
		}
	}
</style>
