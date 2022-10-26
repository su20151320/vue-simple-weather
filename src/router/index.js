import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/pages/login'

Vue.use(Router);

export default new Router({ //创建router实例
    routes: [
        {
            path:'/login',
            component:() => import('@/pages/login'),
        },
        {
            path:'/', //首页
            component: () => import('@/pages/yubao'),
        },
        // {
        //     path: '/user/:id', // 动态路径参数 以冒号开头
        //     component: 'componentName'
        // }

    ]
})