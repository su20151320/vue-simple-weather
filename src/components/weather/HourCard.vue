<template>
    <div class="content-hour-card">
        <div class="radius-box">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="天气概况" name="nowdetails">
                    <div id="lineChart" :style="{ width: '100%', height: '300px' }"> </div>
                </el-tab-pane>
                <el-tab-pane label="24小时预报" name="daydetails">
                    24小时预报,待更新。。。
                    <!-- <span>{{ loading[2] }}</span> -->

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
//引入echarts核心模块，核心模块提供了echarts使用必须要的接口
import * as echarts from 'echarts/core'
//引入折线图
import { LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    GridComponent,
    ToolboxComponent,
    DatasetComponent,
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
    GridComponent,
    ToolboxComponent,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    DatasetComponent,
]);


export default {
    name: 'HourCard',
    props: {
        hourData: Array,
    },
    data() {
        return {
            activeName: 'nowdetails',
            wLinechart: null,
            loaded: false,
            // initData: [
            //     { fxTime: '08:00', temp: '23', precip: '0' },
            //     { fxTime: '09:00', temp: '24', precip: '0' },
            //     { fxTime: '10:00', temp: '25', precip: '0' },
            //     { fxTime: '11:00', temp: '26', precip: '0' },
            //     { fxTime: '12:00', temp: '27', precip: '0' },
            //     { fxTime: '13:00', temp: '27', precip: '0' },
            //     { fxTime: '14:00', temp: '23', precip: '1' },
            //     { fxTime: '15:00', temp: '27', precip: '1' },
            //     { fxTime: '16:00', temp: '23', precip: '1' },
            //     { fxTime: '17:00', temp: '23', precip: '0' },
            //     { fxTime: '18:00', temp: '23', precip: '0' },
            //     { fxTime: '19:00', temp: '23', precip: '0' },
            // ],
        }
    },
    mounted() {
        this.drawLine();

    },
    beforeUpdate() {

    },
    methods: {
        drawLine() {
            let chartDom = document.getElementById('lineChart');
            this.wLinechart = echarts.init(chartDom);
            let option;
            option = {
                color: ['#ffffff'],//调色盘颜色列表，如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色
                grid: { //坐标轴
                    left: 0,
                    right: '2%',
                    bottom: '3%',
                    width: "100%",
                    containLabel: true,
                },
                dataset: {
                    dimensions: ['fxTime', 'temp', 'precip'],
                    source: [],//初始默认数据
                },
                xAxis: [ //数据集下
                    {
                        type: 'category',
                        boundaryGap: false, //坐标两边留白策略
                        axisLabel: { //坐标轴刻度标签的相关设置
                            show: true,
                            color: "rgba(255, 255, 255, 0.8)"
                        },
                        axisLine: { //坐标轴轴线相关设置
                            show: true,
                            onZero: false,
                            lineStyle: {
                                color: "rgba(255, 255, 255, 0.8)",
                                width: 0.5,
                            }
                        },
                        axisTick: { //坐标轴刻度相关设置
                            show: false
                        }

                    },
                ],
                yAxis: [
                    {
                        show: false,//不显示y轴坐标
                        type: 'value',
                        max: 38,
                    },
                    {
                        show: false,//不显示y轴坐标
                        type: 'value',
                        max: 30,
                    },
                ],
                series: [
                    {
                        name: 'templine',
                        type: 'line',
                        encode: {
                            x: 'fxTime',// 将 "fxTime" 列映射到 X 轴。
                            y: 'temp',// 将 "temp" 列映射到 Y 轴。
                        },
                        smooth: true, //是否平滑曲线显示。
                        lineStyle: { //折线条样式
                            width: 0.5,
                            color: "rgba(255, 255, 255, 0.5)"
                        },
                        label: { //图形上的文本标签设置
                            show: true,
                            color: '#fff',
                            formatter: '{@temp}°'
                        },
                        symbolSize: 0,
                        showSymbol: true, //是否显示标记，其数值在曲线图上是否显示标记
                        areaStyle: { //区域填充样式
                            opacity: 0.5,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ //线性渐变
                                {
                                    offset: 0, //0%处的颜色
                                    color: 'rgb(240,128,128)'
                                },
                                {
                                    offset: 1, //100%处的颜色
                                    color: 'rgb(31, 96, 161)'
                                }
                            ])
                        },
                    },
                    {
                        name: 'rainfall',
                        type: 'line',
                        yAxisIndex: 1, //使用的 y 轴的 index
                         lineStyle: { //折线条样式
                            width: 0.5,
                        },
                        encode:{
                            y:'precip'
                        },
                        label: { //图形上的文本标签设置
                            show: true,
                            color: '#fff',
                            offset: [15, 16.5],
                            formatter: '{@precip}%'
                        },
                        symbol:"pin",
                        symbolSize: 10,
                        showSymbol: true,
                        symbolOffset: [-6, -3],
                    }

                ]
            };
            this.wLinechart.setOption(option);

        },
        handleClick(tab, event) {
            console.log(tab);
        },

    },
    computed: {

    },
    watch: {
        hourData: function () {
            let d = JSON.parse(JSON.stringify(this.hourData));
            let temp = [];
            for (let i = 0; i < d.length; i++) {
                temp.push({
                    fxTime: d[i].fxTime.substr(11, 5),
                    temp: d[i].temp,
                    precip : parseInt(d[i].precip),
                    icon:d[i].icon,
                })
                i++;
            }
            this.wLinechart.setOption({
                dataset: {
                    source: temp,
                }
            });
        }
    },
    beforeDestroy() {
        //销毁chart
        if (!this.wLinechart) {
            return;
        }
        this.wLinechart.dispose();
        this.wLinechart = null;//
    }
}
</script>
<style scoped>
.content-hour-card {
    position: relative;
    width: 100%;
}

.content-hour-card .radius-box {
    height: auto;
}

.radius-box>>>.el-tabs__item {
    font-size: 12px !important;
    color: #fff !important;
}

.radius-box>>>.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px !important;
}

.radius-box>>>.el-tabs__item.is-active {
    color: #fff !important;
    font-weight: 600;
}
</style>