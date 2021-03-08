import $axios from '../js_sdk/gangdiedao-uni-axios/index.js'
import qs from 'qs'

let BASE_URL
BASE_URL = 'http://192.168.2.42:14001'
// #ifndef H5
BASE_URL = 'http://192.168.2.42:14001'
// #endif

const requestInstance = $axios.create({
	withCredentials: true
})
var that = null

const AjaxJson = function(options){
	that = this;
	  var ajaxRequest = new AjaxRequest(options)
	  if(ajaxRequest.init(options)){
	    ajaxRequest.request()
	  }
}

const UploadRequest = function(options){
	that = this;
	var ajaxRequest = new AjaxRequest(options)
	if(ajaxRequest.init(options)){
		ajaxRequest.uploadrequest()
	}
}

const AjaxRequest = function(options){
  this.url =  ""
	this.filePath = ""
	this.name = ""
  this.data = ""
  this.formData = ""
  this.category = "0"
  this.successCall = null
  this.errorCall = null
  this.progressCall = null
	this.method = 'GET'
}

AjaxRequest.prototype.init = function(options){
  //请求的地址
  this.url = options && options.url || ""
	if(this.url == ''){
		uni.showToast({
			image: '../static/images/wrong.png',
			title: '请求地址不能为空'
		})
	}

	this.name = options && options.name || ""
	this.formData = options && options.formData || {}
	this.filePath = options && options.filePath || {}
  //提交的数据
  this.data = options && options.data || {}
  this.category = options && options.category || "0"
	this.method = options && options.method || 'GET'
  this.successCall = options && options.call || null;
  this.errorCall = options && options.errorCall || null;
  this.progressCall = options && options.progressCall || null;
  return true;
}

$axios.defaults.withCredentials = true;
$axios.defaults.crossDomain = true;
requestInstance.interceptors.request.use((config)=> {
    config.headers = {'Content-Type':'application/x-www-form-urlencoded'}

	// 　　　config.headers['Access-Control-Allow-Origin']="http://192.168.2.42";
	// 　　　config.headers['Access-Control-Allow-Methods']="GET, POST, PUT, DELETE, OPTIONS";
	// 　　　config.headers['Access-Control-Allow-Credentials']="true";
	// 　　　config.headers['Authorizationxxx1']="xxx";

			return config;
},function (error) {
  return false
})

requestInstance.interceptors.response.use(function (response) {
  if(response.status === 200){
		return response.data;
  }else{
  }
},function (error) {
	
})

AjaxRequest.prototype.request = function () {
  var ajaxRequest = this;
	let getAuthorization = uni.getStorageSync('Authorization')
	return new Promise((resolve, reject)=>{
		if(this.method == 'GET'){
			this.data = qs.stringify(this.data)
			let url;
			if(this.data == ''){
				url = BASE_URL + this.url
			}else{
				url = BASE_URL + this.url + '?' + this.data
			}
			uni.request({
				url: url,
				method: this.method,
				header: { Authorization: 'Bearer '+ getAuthorization },
				success: (res) => {
					if(res.statusCode == 200){
						if(res.data.code == 500){
							uni.showToast({
								icon: 'none',
								title: '错误',
								success: () => {}
							})
						}else if(res.data.code == 3002){
							uni.showToast({
								icon: 'none',
								title: '权限不足,去登录',
								success: () => {}
							})
							setTimeout(()=>{
								uni.reLaunch({
									url: '/pages/loginIn/loginIn',
									success: ()=>{}
								})
							},500)
						}else if(res.data.code == 3001){
							uni.showToast({
								icon: 'none',
								title: '重复操作',
								success: () => {}
							})
						}else{
							if(ajaxRequest.successCall){
								ajaxRequest.successCall(res.data)
							}
						}
					}else{
						uni.showToast({
							icon: 'none',
							title: '状态码为：' + JSON.stringify(res.statusCode),
							success: () => {}
						})
					}
				},
				fail: (res) => {
					reject(res)
				}
			})
		}else{
			let header
			if(this.formData == 'formData'){
				this.data = qs.stringify(this.data)
				header = {'Content-type': 'application/x-www-form-urlencoded', Authorization: 'Bearer '+ getAuthorization }
			}else{
				header = { Authorization: 'Bearer '+ getAuthorization }
			}
			$axios({
				url: BASE_URL + this.url,
				data: this.data,
				method: this.method,
				headers: header,
			}).then((res)=>{
				if(res.status == 200){
					if(res.data.code == 200){
						if(ajaxRequest.successCall){
							ajaxRequest.successCall(res.data)
						}
					}else if(res.data.code == 500){
						uni.showToast({
							icon: 'none',
							title: '错误',
							success: () => {}
						})
					}else if(res.data.code == 3002){
						uni.showToast({
							icon: 'none',
							title: '权限不足,去登录',
							success: () => {}
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/loginIn/loginIn',
								success: ()=>{}
							})
						},500)
					}else if(res.data.code == 3001){
						uni.showToast({
							icon: 'none',
							title: '重复操作',
							success: () => {}
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: res.data.message,
							success: () => {}
						})
					}
				}else{
					uni.showToast({
						icon: 'none',
						title: '状态码为：' + JSON.stringify(res.status),
						success: () => {}
					})
				}
			}).catch(err=>{
				reject(err)
			})
		}
	})
}

AjaxRequest.prototype.uploadrequest = function(){
	var ajaxRequest = this;
	let getAuthorization = uni.getStorageSync('Authorization')
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + this.url,
			filePath: this.filePath,
			name: this.name,
			formData: this.formData,
			header: { Authorization: 'Bearer '+ getAuthorization },
			success: (res) =>{
				if(res.statusCode == 200){
					let result = JSON.parse(res.data)
					if(result.code == 200){
						if(ajaxRequest.successCall){
							ajaxRequest.successCall(result)
						}
					}else if(result.code == 500){
						uni.showToast({
							icon: 'none',
							title: '错误',
							success: () => {}
						})
					}else if(result.code == 3002){
						uni.showToast({
							icon: 'none',
							title: '权限不足,去登录',
							success: () => {}
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/loginIn/loginIn',
								success: ()=>{}
							})
						},500)
					}else if(result.code == 3001){
						uni.showToast({
							icon: 'none',
							title: '重复操作',
							success: () => {}
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: result.message,
							success: () => {}
						})
					}
				}else{
					uni.showToast({
						icon: 'none',
						title: '状态码为：' + JSON.stringify(res.statusCode),
						success: () => {}
					})
				}
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
}

export { 
	AjaxJson, UploadRequest
}