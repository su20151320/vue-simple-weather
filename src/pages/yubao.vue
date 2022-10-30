<template>
    <div class="container_weather">
        <nav-bar :location="location" @get-weather="getWeather"></nav-bar>
        <div class="content_bg">
            <div class="content_center">
                <today-card :nowData="nowData" :calendarData="calendarData" :updateTime="updateTime"
                    :dialogData="dialogData" @getData="getNowDataHandle">
                </today-card>
                <div class="content-flex">
                    <div class="content-flex-left">
                        <ten-days-card :tenData="tenData"></ten-days-card>
                        <hour-card :hourData="hourData"></hour-card>
                    </div>
                    <div class="content-flex-right">
                        <life-style-card :lifestyleData="lifestyleData">
                        </life-style-card>
                    </div>
                </div>
            </div>
        </div>
        <page-footer></page-footer>
    </div>
</template>
<script>
import NavBar from '../components/common/NavBar'
import PageFooter from '../components/common/PageFooter'
import TodayCard from '../components/weather/TodayCard'
import TenDaysCard from '../components/weather/TenDaysCard'
import LifeStyleCard from '../components/weather/LifeStyleCard'
import HourCard from '../components/weather/HourCard'

export default {
    name: 'Yubao',
    components: {
        NavBar,
        TodayCard,
        TenDaysCard,
        LifeStyleCard,
        HourCard,
        PageFooter,
    },
    data() {
        return {
            nowData: {},//实时天气数据
            tenData: [], //未来10天的天气预报
            hourData: [],//24小时内的天气预报
            lifestyleData: [],//当天生活指数
            calendarData: {},//农历数据
            dialogData: {},//电影台词
            location: '',
            updateTime: '',
            localCoordinates: '',//当前定位坐标

        }
    },
    created() {
        this.getCurrentCityName();
        let stroageLocation = JSON.parse(localStorage.getItem('localCity'));
        this.localCoordinates = stroageLocation ? `${stroageLocation.lng},${stroageLocation.lat}` : '116.41,39.92';//如果没有获取到定位就默认为北京。
        this.location = stroageLocation ? stroageLocation.city : '北京市';
        this.getNowDataHandle();
        this.getTenDaysDataHadle();
        this.getHourDataHadle();
        this.getLifeStyleHadle();
        this.getcalendarHadle();
        this.getdialogueHadle();

    },
    methods: {
        //获取实时天气情况
        getNowDataHandle() {
            this.getNowData(this.localCoordinates).then((res) => {
                let response = res.data;
                console.log(response)
                if (response.code == "200") {
                    this.$message.success('请求成功');
                    this.nowData = response.now;
                    this.updateTime = response.updateTime;//当前获取的数据最近一次更新的时间
                    this.$root.loading[0] = true;
                }
            }, (e) => {
                console.error("getNowDataHandle:" + e);
            })
        },
        //获取未来10天的天气情况
        getTenDaysDataHadle() {
            this.get10DaysData(this.localCoordinates).then((res) => {
                let response = res.data;
                console.log(response)
                if (response.code == "200") {
                    this.tenData = response.daily;
                    this.$root.loading[1] = true;
                }
            }, (e) => {
                console.error("getTenDaysDataHadle:" + e);
            })
        },
        //获取每小时的天气情况
        getHourDataHadle() {
            this.getHourData(this.localCoordinates).then((res) => {
                let response = res.data;
                if (response.code == "200") {
                    this.hourData = response.hourly;
                    this.$root.loading[2] = true;
                }
            }, (e) => {
                console.error("getHourDataHadle:" + e);
            })
        },
        //获取当天生活指数
        getLifeStyleHadle() {
            this.getLifestyle(this.localCoordinates).then((res) => {
                let response = res.data;
                if (response.code == "200") {
                    let data = response.daily;
                    if (data.length > 0) {
                        data.sort((a, b) => {
                            return a.type - b.type;
                        })
                    }
                    this.lifestyleData = data;
                    this.$root.loading[3] = true;
                }
            }, (e) => {
                console.error("getLifeStyleHadle:" + e);
            })
        },
        getcalendarHadle() {
            this.getLunCalendar().then((res) => {
                let response = res.data;
                if (response.code == 200) {
                    this.calendarData = response.newslist[0];
                    this.$root.loading[4] = true;
                }
            }, (e) => {
                console.error("getcalendarHadle:" + e);
            })
        },
        getdialogueHadle() {
            this.getDialogue().then((res) => {
                let response = res.data;
                if (response.code == 200) {
                    this.dialogData = response.newslist[0];
                    this.$root.loading[5] = true;
                }
            }, (e) => {
                console.error("getcalendarHadle:" + e);
            })
        },
        getWeather(localCoordinates, localCity) {
            // let loading=JSON.parse(JSON.stringify(this.$root.loading))
            // loading.map(()=>false);
            // this.$root.loading = loading;
          
            this.localCoordinates = localCoordinates;
            this.location = localCity;
            this.getNowDataHandle();
            this.getTenDaysDataHadle();
            this.getHourDataHadle();
            this.getLifeStyleHadle();
        },
    }
}
</script>
<style scoped>
.container_weather {
    position: relative;
}

.content_bg {
    background-color: rgb(31, 96, 161);
}

.content_center {
    width: 1200px;
    margin: 0 auto;
    height: 800px;
}

.content-flex {
    display: flex;
    /* height: 483px; */
}

.content-flex .content-flex-left {
    width: 75%;
}

.content-flex .content-flex-right {
    width: 25%;
}
</style>