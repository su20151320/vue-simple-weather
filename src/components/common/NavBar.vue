<template>
    <div class="nav-bar">
        <div class="nav-icon">
            <img class="logo" src="@/assets/images/logo.png" />
        </div>
        <div class="nav-location">
            <div class="cur-location">
                <i class="el-icon-location-outline"></i>
                <span>{{location}}</span>
            </div>
            <a>[添加关注]</a>
            <div class="nav-seach">
                <el-input type="input" class="pos-input" placeholder="搜索市、区、县等">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <div class="pos-select-box font-size14"  v-show="isShow">
                    <div class="location-option-box">
                        <div class="onlyread sel-title"> <i class="el-icon-location-outline"></i>当前定位</div>
                        <label style="margin-left:4px">深圳</label>
                    </div>
                    <div class="hotcity-option-box">
                        <div class="onlyread sel-title"> <i class="el-icon-position"></i>热门城市</div>
                        <ul class="ul-flex">
                            <li>北京</li>
                            <li>上海</li>
                            <li>青海</li>
                            <li>青海</li>
                            <li>石家庄</li>
                            <li>青海</li>
                            <li>乌鲁木齐</li>
                            <li>青海</li>
                            <li>内蒙古</li>
                            <li>青海</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>
<script>
export default {
    name: 'NavBar',
    props:{
        location:String,
    },
    data(){
        return{
            isShow:false,
        }
    },
    methods:{

    },
}
</script>

<style  scoped>
.nav-bar {
    width: 1200px;
    margin: 0 auto;
    height: 70px;
    padding: 0 20px;
    color: darkorange;
}

.nav-icon {
    float: left;
    position: relative;
    top: 8px
}

.nav-icon .logo {
    width: 162px;
    height: 55px;
}

.nav-location {
    text-align: right;
    line-height: 70px;
}

.nav-location .cur-location,
.nav-seach {
    display: inline-block;
    position: relative;
}

.nav-location a {
    font-size: 12px;
    color: #A9A9A9;
    margin: 0 10px;
}

.pos-input>>>input {
    height: 35px;
    line-height: 35px;
    width: 360px;
    border: 1px solid #808080;
    box-shadow: 0 5px 5px rgba(100, 100, 100, 0.2)
}
/* 城市搜索下拉框 */
.pos-select-box{
    position:absolute;
    top:55px;
    width:340px;
    height: 400px;
    text-align: left;
    border: 1px solid #A9A9A9;
    box-shadow: 0 5px 5px rgba(100, 100, 100, 0.5);
    background-color: #fff;
    border-radius: 2px;
    padding:10px;
    line-height: 28px;
    z-index:1000;
   
    
    
}
.onlyread{
    color:#606266;
}
.sel-title{
    font-size:10px;
}
.hotcity-option-box .ul-flex{
    display: flex;
    flex-wrap:wrap;
    align-content:space-around;
    color:#000;
}
.ul-flex li{
    margin:0 4px;
    width:60px;
}
li:hover{
    color:darkorange;
    cursor:pointer;
}
 

</style>