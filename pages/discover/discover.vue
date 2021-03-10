<template>
	<view class="discover mainBox" id="scrollH" :style="[{height: scrollH + 'px'},{ paddingTop: paddingTop + 'rpx'}]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		
		<unitabbar :switchOn = '3'></unitabbar>
	</view>
</template>

<script>
	import unitabbar from '../../components/uni-tabbar/tabBar.vue'
	import { unimixin } from '../../utils/unimixin.js'
	export default {
		mixins: [ unimixin ],
		components: { unitabbar },
		data(){
			return{
				
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

		},
		created() {

		}
	}
</script>

<style scoped lang="scss">

</style>
