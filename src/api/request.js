import axios from 'axios'
import BMap from "BMap";
// import { reject, resolve } from 'core-js/fn/promise';

export function request(config) {
    //创建axios实例
    const instance = axios.create({
        baseURL: 'https://devapi.qweather.com/v7/weather',
        timeout: 5000,
    })

    //拦截器
    instance.interceptors.request.use(config => {
            //在发送请求之前需要做的事情
            config.params.key = 'ad7448847e594956929bf5fb6ba683ec';
            return config;
        }),
        err => {
            //对请求错误做些什么
            console.log(err);
        }
    return instance(config);

}
//天气指数信息搜索
export function requestIndices(config) {
    const instance = axios.create({
        baseURL: 'https://devapi.qweather.com/v7/indices',
        timeout: 5000,
    })

    //拦截器
    instance.interceptors.request.use(config => {
            //在发送请求之前需要做的事情
            config.params.key = 'ad7448847e594956929bf5fb6ba683ec';
            return config;
        }),
        err => {
            //对请求错误做些什么
            console.log(err);
        }
    return instance(config);

}
//城市地理信息搜索
export function citylookup(config) {
    const instance = axios.create({
        baseURL: 'https://geoapi.qweather.com/v2/city/lookup',
        timeout: 5000
    })
    instance.interceptors.request.use(config => {
        config.params.mode = 'fuzzy';
        config.params.range = 'cn';
        config.params.key = 'ad7448847e594956929bf5fb6ba683ec';
        return config;

    }), err => {
        console.log(err);
        return instance(config)
    }
}
//获取定位地理位置
export function getCurrentCityName(){
    let geolocation = new BMap.Geolocation();  // 创建百度地理位置实例，代替 navigator.geolocation
      geolocation.getCurrentPosition(function(e) {
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
              // 百度 geolocation 的经纬度属性不同，此处是 point.lat 而不是 coords.latitude
              let point = new BMap.Point(e.point.lng, e.point.lat);//经度，纬度
              let gc = new BMap.Geocoder();
              gc.getLocation(point, function(rs){
                  let city =rs.addressComponents.province + rs.addressComponents.city;  
                  let lng = e.point.lng; //经度
                  let lat = e.point.lat; //维度
                  let localCityObj = {city,lng,lat};
                  localStorage.setItem('localCity',JSON.stringify(localCityObj));// 地址存入sessionStorage，再次进入页面就不需要再次请求位置了
              });
          } else {
              console.log("定位获取失败，当前失败状态码："+this.getStatus());
          }
      });
}


//实时天气数据
export async function getNowData(pos) {
   let res = await request({
            url:'/now',
            method:'get',
            params: {
                location: pos //查询地区的LocationID以英文逗号分隔的经度,纬度坐标
            }
        });
    return res;
}

//10日未来天气预报
export async function get10DaysData(pos) {
    let res =  await request({
        url: '/7d',
        method:'get',
        params: {
            location: pos
        }
    })
    return res;
}
//未来24小时的天气预报
export async function getHourData(pos) {
    let res =  await request({
        url: '/24h',
        method:'get',
        params: {
            location: pos
        }
    })
    return res;
}

//获取当天生活指数
export async function getLifestyle(pos) {
    let res =  requestIndices({
        url: '/1d',
        method:'get',
        params: {
            location: pos,
            type: '1,2,3'
        }
    })
    return res;
}

//城市信息搜索
export function getCitylist(pos) {
    return citylookup({
        params: {
            location: pos,
        }
    })
}