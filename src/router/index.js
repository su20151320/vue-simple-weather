import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/Helloworld.vue' 

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Helloworld',
        component: HelloWorld
    }]
})