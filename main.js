import Vue from 'vue'
import App from './App'

import { AjaxJson } from './utils/request.js'

Vue.prototype.ajaxJson = AjaxJson

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
