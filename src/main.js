// webpack打包入口文件，加载组件和初始化
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
// import router from './router/index'

import '@/assets/css/base.css'



Vue.config.productionTip = false
new Vue({
    el: '#app',
    // router,
    // components: {
    //     App
    // },
    // template: '<App />'
    render:(h) => h(App)
})
 
