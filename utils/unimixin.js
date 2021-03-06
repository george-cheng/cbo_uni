import { accMul, accAdd } from './common.js'

const unimixin = {
	data(){
		return{
			page: '',
			limit: '',
			paddingTop: 0,
			screenH: '',
			screenHeight: 0,
			scrollH: '',
			screenHt: '',
			scrollHeight: '',
			windowHeight: '',
			cnyRate: 6.5,
			windowTop: '',
			imgUrl: 'https://cbo-community.oss-cn-hongkong.aliyuncs.com/',
		}
	},
	onLoad(){
		this.$nextTick(()=> {
			this.calcHeight()
		});
	},
	onReachBottom(){
		console.log(1)
	},
	methods: {
		calcHeight(){
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight
					this.windowTop = res.windowTop || res.statusBarHeight
					this.screenH = res.screenHeight - this.windowTop
					this.windowHeight = res.windowHeight
				}
			})
			
			// screenHt 顶部状态栏 + 页面主体部分
			// scrollH 页面主体 + 底部导航栏
			uni.getSystemInfo({
				success: res => {
					const query = uni.createSelectorQuery().in(this);
					if(query){
						query.select('#scrollH').boundingClientRect(data => {
							this.scrollH = data.height + 48 + 108
							this.scrollHeight = data.height 
							if(this.scrollH < this.screenHeight){
								this.scrollH = this.screenHeight - this.windowTop
							}
							if(this.scrollHeight < this.screenHeight){
								this.screenHt = this.windowHeight
							}
						}).exec();
					}
				}
			});
		},
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