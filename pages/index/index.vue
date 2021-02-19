<template>
	<view class="home mainBox" :style="[{height: screenHeight + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		
			<view style=" color: #49a9ea;">fwe</view>
		<unitabbar :switchOn = '0'></unitabbar>
	</view>
</template>

<script>
	import unitabbar from '../../components/uni-tabbar/tabBar.vue'
	import { unimixin } from '../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		components: { unitabbar },
		data() {
			return {
				title: 'Hello',
				userInfo:{
					
				}
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
			initAjax(){
				this.ajaxJson({
					url: '/site/countryCode',
					call: (data)=>{
						console.log(data)
					}
				})
			}
		},
		created() {
			this.initAjax()
		}
	}
</script>

<style>

</style>
