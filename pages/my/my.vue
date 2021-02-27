<template>
	<view class="my mainBox" :style="{height: screenHeight + 'px'}">

		<unitabbar :switchOn = '4'></unitabbar>
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
		onReady() {
				
		},
		methods: {
			getUserInfo(){
				this.ajaxJson({
					url: '/summary/userInfo/refresh',
					call: (res)=>{
						console.log(res.data)
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
	.my{
		background-image: url(../../static/bg.jpg);
		background-position: 0 0;
		background-repeat: no-repeat;
	}
</style>
