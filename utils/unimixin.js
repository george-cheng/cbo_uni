import { accMul, accAdd } from './common.js'

const unimixin = {
	data(){
		return{
			paddingTop: 0,
			screenHeight: 0,
		}
	},
	onLoad(){
		uni.getSystemInfo({
			success: (res) => {
				console.log(res)
				this.screenHeight = res.screenHeight
			}
		})
	},
	methods: {
		touchStart(e){
			this.startY = e.touches[0].pageY
			this.changeY = 0
		},
		touchMove(e){
			this.endyY = e.changedTouches[0].pageY
			this.changeY = accAdd(this.endyY, accMul(this.startY, -1))
			if(this.paddingTop < 200){
				if(this.changeY > 50){
					this.paddingTop += 5
				}
			}
		}
	},
	created(){
		
	}
}

export { unimixin }