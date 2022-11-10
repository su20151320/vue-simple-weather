import axios from 'axios'
import BMap from "BMap";
// import { reject, resolve } from 'core-js/fn/promise';

const weatherUrl = 'https://devapi.qweather.com/v7/weather'; //查询天气API
const tqzsUrl = 'https://devapi.qweather.com/v7/indices'; //查询天气指数API
const positionUrl = 'https://geoapi.qweather.com/v2/city'; //查询地理位置url
const lcalendarUrl = 'https://api.tianapi.com/lunar/index'; //查询农历API
const dialogueUrl = 'https://api.tianapi.com/dialogue/index'; //查询电影台词API

const fhkey = "ad7448847e594956929bf5fb6ba683ec"; //风和天气平台的key
const txkey = "787091c85f66a1710f88cad5d966d105"; //天行数据平台的key

export function request(config, url) {
    //创建axios实例
    const instance = axios.create({
        baseURL: url,
        timeout: 5000,
    })
    //拦截器
    instance.interceptors.request.use(config => {
            //在发送请求之前需要做的事情
            // config.params.key = 'ad7448847e594956929bf5fb6ba683ec';
            return config;
        }),
        err => {
            //对请求错误做些什么
            console.log("错误：",err);
        }
    return instance(config);

}

//获取定位地理位置
export function getCurrentCityName() {
    let geolocation = new BMap.Geolocation(); // 创建百度地理位置实例，代替 navigator.geolocation
    geolocation.getCurrentPosition(function (e) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // 百度 geolocation 的经纬度属性不同，此处是 point.lat 而不是 coords.latitude
            let point = new BMap.Point(e.point.lng, e.point.lat); //经度，纬度
            let gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                let city = rs.addressComponents.province + rs.addressComponents.city;
                let lng = e.point.lng; //经度
                let lat = e.point.lat; //维度
                let localCityObj = {
                    city,
                    lng,
                    lat
                };
                localStorage.setItem('localCity', JSON.stringify(localCityObj)); // 地址存入sessionStorage，再次进入页面就不需要再次请求位置了
            });
        } else {
            console.log("定位获取失败，当前失败状态码：" + this.getStatus());
        }
    });
}


//实时天气数据
export async function getNowData(pos) {
    let res = await request({
        url: '/now',
        method: 'get',
        params: {
            key: fhkey,
            location: pos //查询地区的LocationID以英文逗号分隔的经度,纬度坐标
        }
    }, weatherUrl);
    return res;
}

//10日未来天气预报
export async function get10DaysData(pos) {
    let res = await request({
        url: '/7d',
        method: 'get',
        params: {
            key: fhkey,
            location: pos
        }
    }, weatherUrl)
    return res;
}
//未来24小时的天气预报
export async function getHourData(pos) {
    let res = await request({
        url: '/24h',
        method: 'get',
        params: {
            key: fhkey,
            location: pos
        }
    }, weatherUrl)
    return res;
}

//获取当天生活指数
export async function getLifestyle(pos) {
    let res = request({
        url: '/1d',
        method: 'get',
        params: {
            key: fhkey,
            location: pos,
            type: '1,2,3,9,10,15' //1：运动指数，2：洗车指数，3：穿衣指数，9：感冒指数 10:空气污染扩散条件指数 15:交通指数
        }
    }, tqzsUrl);
    return res;
}

//城市信息搜索
export function getCitylist(pos) {
    let res =  request({
        url:'/lookup',
        params: {
            key: fhkey,
            range: 'cn',
            location: pos,
        }
    }, positionUrl);
    return res;
}
//热门城市信息查询
export async function getHotCityData() {
    let res = await request({
        url:'/top',
        params: {
            key: fhkey,
            number: 15,//返回结果的数量
            range: 'cn',
        }
    }, positionUrl);
    return res;
}

//中国农历信息查询
export async function getLunCalendar() {
    let dt= new Date();
    let y = dt.getFullYear();
    let m = dt.getMonth()+1;
    let d = dt.getDate();
    let res = await request({
        params: {
            key: txkey,
            date:`${y}-${m}-${d}`,
        }
    }, lcalendarUrl);
    return res;
}

//经典台词查询
export async function getDialogue() {
    let res = await request({
        params: {
            key: txkey,
        }
    }, dialogueUrl);
    return res;
}