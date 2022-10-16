<!-- vue入口页面 -->
<template>
    <div class="app">
        <h1>hello world !,here is App.vue</h1>
        <!-- <p><img :src="imgSrc"/></p> -->
        <div v-for="(item,index) in count" :key="index">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
import imgSrc from '@/assets/images/R-C.png'

    export default{
         data(){
            return{
                imgSrc,
                count:10
            }
         }
    }
</script>

<style>

 body{
    color:darkorange
 }

</style>