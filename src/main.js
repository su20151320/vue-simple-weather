// webpack打包入口文件，加载组件和初始化
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'


import {
    getNowData,
    getCurrentCityName,
    get10DaysData,
    getHourData,
    getLifestyle

} from '@/api/request'

import '@/assets/css/base.css'
import '@/assets/iconfonts/qweather-icons.css'

Vue.use(ElementUI);
Vue.prototype.getNowData = getNowData;
Vue.prototype.getCurrentCityName = getCurrentCityName;
Vue.prototype.get10DaysData = get10DaysData;
Vue.prototype.getHourData = getHourData;
Vue.prototype.getLifestyle = getLifestyle;
Vue.config.productionTip = false
new Vue({
    el: '#app',
    data: {
       loading:[false,false,false,false,true],

    },
    methods: {

    },
    render: (h) => h(App),
    created() {
        
    },
})