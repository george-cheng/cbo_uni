import { accMul, accAdd } from './common.js'

const unimixin = {
	data(){
		return{
			page: '',
			limit: '',
			paddingTop: 0,
			screenHeight: 0,
			screenH: 0,
			scrollH: '',
			cnyRate: 6.5,
			statusBarHeight: '',
			imgUrl: 'https://cbo-community.oss-cn-hongkong.aliyuncs.com/',
		}
	},
	onLoad(){
		uni.getSystemInfo({
			success: (res) => {
				this.screenHeight = res.screenHeight
				this.screenH = res.screenHeight - 44
				this.statusBarHeight = res.statusBarHeight
			}
		})
		this.$nextTick(function() {
			uni.getSystemInfo({
				success: res => {
					const query = uni.createSelectorQuery().in(this);
					if(query){
						query.select('#scrollH').boundingClientRect(data => {
							this.scrollH = data.height + 48 + 108
							console.log(this.scrollH)
						}).exec();
					}
				}
			});
		});
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