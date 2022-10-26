<template>
    <div class="content-nowcard">
        <div class="left">
            <div class="text-wei">当前天气</div>
            <div class="text_time">{{updateHour}}<i style="margin-left:8px" class="icon el-icon-refresh" @click="$emit('getData')"></i></div>
            <div class="temp">
                <i class="fonticon" :class="weatherIcon"></i>
                <div class="temp-left">
                    <label>{{nowData.temp}}<sup>℃</sup></label>
                </div>
                <div class="temp-right">
                    <div class="temp-mark text-wei">{{nowData.text}} </div>
                    <div class="text-opa">体感温度 <span>{{nowData.feelsLike}}</span>°</div>
                </div>
            </div>
            <div class="temp-des">
                <span> 今天大部分地区多云。最低气温20</span>°。
            </div>
            <div class="temp-other-box">
                <div>
                    <span class="text-opa font-size12">当前小时累计降水量</span>
                    <div>{{nowData.precip }} mm</div>
                </div>
                <div>
                    <span class="text-opa font-size12">风速</span>
                    <div>{{nowData.windDir}} &nbsp;{{nowData.windScale }}级</div>
                </div>
                <div>
                    <span class="text-opa font-size12">湿度</span>
                    <div>{{nowData.humidity}} %</div>
                </div>
                <div>
                    <span class="text-opa font-size12">能见度</span>
                    <div>{{nowData.vis}} 公里</div>
                </div>
                <div>
                    <span class="text-opa font-size12">气压</span>
                    <div>{{nowData.pressure}} 百帕</div>
                </div>
                <div>
                    <span class="text-opa font-size12">露点</span>
                    <div>{{nowData.dew}} °</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="calendar-box">
                <div class="text-date text-wei"> 2020年 10月 20日 星期四 </div>
                <div class="text-luner-calendar">
                    <span>20</span>
                    <div class="text-luner-calendar-right">
                        <p>【虎年】九月廿五 </p>
                        <p>壬寅年 庚戌月 丙午日</p>
                    </div>
                </div>
                <div>
                    <span>宜</span>
                    <span>嫁娶</span>
                    <span>订盟</span>
                </div>
                <div>
                    <span>忌</span>
                    <span>嫁娶</span>
                    <span>订盟</span>
                </div>
                <div>
                    <p>"我是一个幽魂，看不到任何人，也没有人看到我。"</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TodayCard',
    props: {
        nowData: Object,
        updateTime: String,
    },
    computed: {
        updateHour: function () {
            let dt = new Date(this.updateTime);
            let hh = dt.getHours().toString();
            let mm = dt.getMinutes().toString();
            return hh + ":" + mm;
        },
        weatherIcon:function(){
            let iconCode = this.nowData?.icon || '100' ;
          return  'qi-'+iconCode+'-fill';
        }
    },
}
</script>

<style scoped>
.content-nowcard {
    position: relative;
    top: 10px;
    padding: 10px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    height: 250px;
}

.content-nowcard .left {
    width: 50%;
    display: inline-block;

}
.text_time .icon:hover{
    cursor: pointer;
}
.temp {
    height: 90px;
    display: table;
    margin: 15px 0;
}
.temp .fonticon{
    font-size:70px;

}
.temp .temp-left {
    display: table-cell;
    vertical-align: middle;
    padding-left: 14px;
    font-size: 50px;
}

.temp-left sup {
    font-size: 24px;

}

.temp img {
    width: 80px;
    height: 80px;
}

.temp-right {
    display: table-cell;
    vertical-align: middle;
    padding-left: 50px;
}

.temp-right .temp-mark {
    font-size: 18px;
}

.body-temp span {
    padding-left: 10px;
}

.temp-other-box {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
}

.content-nowcard .right {
    float: right;
    padding-left: 10px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.calendar-box .text-date {
    font-size: 20px;
    text-align: center;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.text-luner-calendar span {
    font-size: 60px;
    color: darkorange;
    padding: 20px;

}

.text-luner-calendar-right {
    display: inline-block;
}
</style>

