import Vue from 'vue'
import App from './App'

import { AjaxJson, UploadRequest} from './utils/request.js'
import { accMul, accAdd } from 'utils/common.js'

Vue.prototype.ajaxJson = AjaxJson
Vue.prototype.ajaxUpload = UploadRequest

Vue.prototype.accMul = accMul
Vue.prototype.accAdd = accAdd

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
