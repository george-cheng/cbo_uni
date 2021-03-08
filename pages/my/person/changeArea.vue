<template>
	<view class="changeArea mainBox" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">

	</view>
</template>

<script>
	import { unimixin } from '../../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		data(){
			return{
				
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
					this.getCity()
					
					this.paddingTop = 0
				}
			},
			getCity(){
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: (res)=>{
						console.log(res)
					}
				})
			}
		},
		created() {
			this.getCity()
		}
	}
</script>

<style scoped lang="scss">

</style>
