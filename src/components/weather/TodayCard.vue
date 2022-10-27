<template>
    <div class="content-nowcard">
        <div class="left">
            <div class="text-wei">当前天气</div>
            <div class="text_time">{{ updateHour }}<i style="margin-left:8px" class="icon el-icon-refresh"
                    @click="$emit('getData')"></i></div>
            <div class="temp">
                <i class="fonticon" :class="weatherIcon"></i>
                <div class="temp-left">
                    <label>{{ nowData.temp }}<sup>℃</sup></label>
                </div>
                <div class="temp-right">
                    <div class="temp-mark text-wei">{{ nowData.text }} </div>
                    <div class="text-opa">体感温度 <span>{{ nowData.feelsLike }}</span>°</div>
                </div>
            </div>
            <div class="temp-des">
                <span> 今天大部分地区多云。最低气温20</span>°。
            </div>
            <div class="temp-other-box">
                <div>
                    <span class="text-opa font-size12">当前小时累计降水量</span>
                    <div>{{ nowData.precip }} mm</div>
                </div>
                <div>
                    <span class="text-opa font-size12">风速</span>
                    <div>{{ nowData.windDir }} &nbsp;{{ nowData.windScale }}级</div>
                </div>
                <div>
                    <span class="text-opa font-size12">湿度</span>
                    <div>{{ nowData.humidity }} %</div>
                </div>
                <div>
                    <span class="text-opa font-size12">能见度</span>
                    <div>{{ nowData.vis }} 公里</div>
                </div>
                <div>
                    <span class="text-opa font-size12">气压</span>
                    <div>{{ nowData.pressure }} 百帕</div>
                </div>
                <div>
                    <span class="text-opa font-size12">露点</span>
                    <div>{{ nowData.dew }} °</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="calendar-box">
                <div class="text-date text-wei"> {{ calendarData.gregoriandate | dateFormat }}  {{ calendarData.jieqi
                }}
                </div>
                <div class="text-luner-calendar">
                    <span class="day">{{ today }}</span>
                    <div class="text-luner-calendar-right">
                        <p>
                            【{{ calendarData.shengxiao }}年】
                            {{ calendarData.lubarmonth }}
                            {{ calendarData.lunarday }}
                        </p>
                        <p>
                            {{ calendarData.tiangandizhiyear }}年 {{ calendarData.tiangandizhimonth }}月
                            {{ calendarData.tiangandizhiday }}日
                        </p>
                    </div>
                </div>
                <div class="text-mar"><span class="green-text">宜</span>: {{ calendarData.fitness | wordFormat }}</div>
                <div class="text-mar"><span class="red-text">忌</span>: {{ calendarData.taboo | wordFormat }}</div>
                <el-tooltip class="item" effect="light" placement="top">
                    <div class="font-size14 dialogvue-text">
                        "{{ dialogData.dialogue }}"
                        <span class="font-size12 text-wei">--《{{ dialogData.source }}》</span>
                    </div>
                    <div slot="content" class="text-tip">
                        "{{ dialogData.dialogue }}" --《{{ dialogData.source }}》
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TodayCard',
    props: {
        nowData: Object,
        calendarData: Object,//农历数据
        dialogData: Object,//电影台词
        updateTime: String,
    },
    data() {
        return {
            today: 1,
        }
    },
    computed: {
        updateHour: function () {
            let dt = new Date(this.updateTime);
            let day = dt.getDate().toString().padStart(2, '0');
            let hh = dt.getHours().toString();
            let mm = dt.getMinutes().toString();
            this.today = day;
            return hh + ":" + mm;
        },
        weatherIcon: function () {
            let iconCode = this.nowData?.icon || '100';
            return 'qi-' + iconCode + '-fill';
        }
    },
    filters: {
        dateFormat: function (val) {
            let dt = new Date(val);//获取该日期所属的星期几
            let y = dt.getFullYear();
            let m = dt.getMonth() + 1;
            let d = dt.getDate();
            let arr = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            let week = dt.getDay();
            return `${y}年${m}月${d}日 ${arr[week]}`;
        },
        wordFormat:function(word){
            return word?.replace(/\./g,'    ')
        }
    }
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
    width: 100%;
}

.content-nowcard .left {
    width: 60%;
    display: inline-block;

}

.text_time .icon:hover {
    cursor: pointer;
}

.temp {
    height: 90px;
    display: table;
    margin: 15px 0;
}

.temp .fonticon {
    font-size: 70px;

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

.temp-other-box {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
}

.content-nowcard .right {
    float: right;
    width: 40%;
}

.right .calendar-box {
    margin-left: 20px;
    padding-left: 40px;
}

.calendar-box .text-date {
    font-size: 20px;
    text-align: center;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.text-luner-calendar .day {
    font-size: 60px;
    color: darkorange;
    padding: 20px;
}

.text-luner-calendar-right {
    display: inline-block;
}

.text-mar {
    margin: 10px 0;
}

.green-text {
    color: #32CD32;
    font-weight: 600;
}

.red-text {
    color: #FF6347;
    font-weight: 600;
}

.dialogvue-text {
    height: 40px;
    margin-top: 10px;
    display: -webkit-box;
    /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
    -webkit-box-orient: vertical;
    /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
    text-overflow: ellipsis;
    /* 可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.text-tip{
    color:#000;
}
</style>

