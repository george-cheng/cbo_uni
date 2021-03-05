<template>
	<view class="" @touchstart="touchstart" @touchend="touchend">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				startTime: 0,
				startPosition: 0,
				endPosition: 0,
			}
		},
		onLoad() {

		},
		methods: {
			touchstart(event){
				this.startTime = Date.now()
				this.startPosition = event.changedTouches[0].clientX
			},
			touchend(event){
				const endTime = Date.now()
				if(endTime - this.startTime > 2000){
					return
				}
				if(Math.abs(this.endPosition - this.startPosition) > 10){
					this.endPosition = event.changedTouches[0].clientX
					var elePosition = this.endPosition - this.startPosition > 0 ? "right" : "left"
				}else{
					return
				}
				this.$emit('positionData', elePosition)
			}
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">

</style>
