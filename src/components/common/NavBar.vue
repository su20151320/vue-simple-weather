<template>
    <div class="nav-bar">
        <div class="nav-icon">
            <img class="logo" src="@/assets/images/logo.png" />
        </div>
        <div class="nav-location">
            <div class="cur-location">
                <i class="el-icon-location-outline"></i>
                <span>{{ location }}</span>
            </div>
            <a>[添加关注]</a>
            <div class="nav-seach">
                <el-input type="text" class="pos-input" placeholder="搜索市、区、县等" @focus="searchFocus" @blur="searchBlur"
                    v-model.trim="city">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <div class="pos-select-box font-size14" v-if="hotcityisShow">
                    <div class="location-option-box">
                        <div class="onlyread sel-title"> <i class="el-icon-location-outline"></i>当前定位</div>
                        <label style="margin-left:4px;color:darkorange">{{ location }}</label>
                    </div>
                    <div class="hotcity-option-box">
                        <div class="onlyread sel-title"> <i class="el-icon-position"></i>热门城市</div>
                        <ul class="ul-flex">
                            <li v-for="item in hotCityList" :key="item.id" @mousedown="getLocation(item)">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="pos-select-box font-size14" v-else-if="cityList.length">
                    <div class="city-box" v-for="item in cityList" :key="item.id"  @mousedown="getLocation(item)">
                        <span>{{ item.adm1 }} , {{ item.adm2 }} , {{ item.name }}</span>
                    </div>
                </div>
                <div class="pos-select-box font-size14" v-else-if="badInput">
                    输入有误，只能输入中文或拼音~
                </div>
                <div class="pos-select-box font-size14" v-else-if="unknowCity">
                    输入城市不存在
                </div>
            </div>
            <div class="userlogin" @click="toLogin">
                <i class="el-icon-user-solid"></i>
            </div>
            
        </div>
    </div>

</template>
<script>
export default {
    name: 'NavBar',
    props: {
        location: String,
    },
    data() {
        return {
            badInput: false,
            unknowCity: false,
            hotcityisShow: false,
            hotCityList: [],
            city: "",
            cityList: [],
            setTimeId: null,
        }
    },
    methods: {
        getHotCityHandle() {
            this.getHotCityData().then((res) => {
                let response = res.data;
                if (response.code == "200") {
                    this.hotCityList = response.topCityList;
                } else {
                    this.$message.error("获取数据失败！");
                }
            }, (e) => {
                console.error("getHotCityData:" + e);
            })
        },
        getLocation(item) {
            if (this.setTimeId) {
                clearTimeout(this.setTimeId);
            }
            if(this.city.length){
                this.city = "";
            }
            let localCoordinates = `${item.lon},${item.lat}`;//城市的经度纬度
            let localCity = item.adm1+item.name;
            // localStorage.setItem('localCity', JSON.stringify(localCoordinates));
            this.$emit('get-weather', localCoordinates,localCity);
            
        },
        searchFocus() {
            if (!this.city || this.city == "") {
                this.hotcityisShow = true;
            }
        },
        searchBlur() {
            this.badInput = false;
            this.unknowCity = false;
            this.hotcityisShow = false;
            this.cityList = [];
            this.setTimeId = null;
        },
        toLogin(){
            this.$router.push("login");
        },
    },
    watch: {
        city: function () {
            let reg = /^[A-Za-z\u4E00-\u9FA5]+$/;//包含中文或拼音
            if (this.city.length == 0) {
                this.badInput = false;
                this.unknowCity = false;
                this.hotcityisShow = true;
                this.cityList = [];
                this.setTimeId = null;
                return;
            }
            if (!reg.test(this.city)) {
                this.badInput = true;
                this.unknowCity = false;
                this.hotcityisShow = false;
                this.cityList = [];
                this.setTimeId = null;
                return;
            }
            if (this.city.length > 1) {
                if (this.setTimeId) {
                    clearTimeout(this.setTimeId);
                }
                this.setTimeId = setTimeout(() => {
                    this.getCitylist(this.city).then((res) => {
                        let response = res.data;
                        if (response.code == "404") {
                            this.unknowCity = true;
                            this.hotcityisShow = false;
                            this.cityList = [];
                        } else if (response.code == "200") {
                            this.cityList = response.location;
                            this.unknowCity = false;
                            this.hotcityisShow = false;
                        }
                    }, (error) => {
                        console.log('getCitylist', error);
                        this.setTimeId = null;
                    })
                }, 500);
            }

        }
    },
    created() {
        this.getHotCityHandle();
    },
}
</script>

<style  scoped>
.nav-bar {
    width: 1200px;
    margin: 0 auto;
    height: 70px;
    color:darkorange;
    
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
.pos-select-box {
    position: absolute;
    top: 55px;
    width: 340px;
    /* height: 400px; */
    text-align: left;
    border: 1px solid #A9A9A9;
    box-shadow: 0 5px 5px rgba(100, 100, 100, 0.5);
    background-color: #fff;
    border-radius: 2px;
    padding: 10px;
    line-height: 28px;
    z-index: 1000;
}

.onlyread {
    color: #606266;
}

.sel-title {
    font-size: 10px;
}

.hotcity-option-box .ul-flex {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    color: #000;
}

.ul-flex li {
    margin: 0 4px;
    width: 60px;
}
li:hover,.city-box:hover {
    color: darkorange;
    cursor: pointer;
    background-color: #F0F0F0;
}
.userlogin{
    display: inline-block;
    width:35px;
    height:35px;
    line-height:35px;
    vertical-align:middle;
    text-align: center;
    border:1px solid darkorange;
    border-radius: 50%;
    
}
.userlogin:hover{
    cursor:pointer;
}
</style>