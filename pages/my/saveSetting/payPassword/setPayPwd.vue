<template>
	<view class="setPayPwd mainBox" :style="[{height: screenH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">

	</view>
</template>

<script>
	import { unimixin } from '../../../../utils/unimixin.js'
	import { checkPhone, checkPwd, checkNum } from '../../../../utils/common.js'
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
					url: '/pages/my/saveSetting/saveSetting',
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
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">

</style>
