<template>
    <div class="content-life-style-card">
        <div class="title-marg-top-bottom5 text-wei">生活指数</div>
        <div class="card-outside-box font-size14">
            <ul>
                <li v-for="(item,index) in lifestyleData" :key="index">
                    <el-popover placement="top-start" width="200" trigger="hover">
                        <img :src="clotheUrl(item.level,item.type)" slot="reference" />
                        <label class="card-text" slot="reference">
                            {{item?.type | typeTrans}} {{ item?.category }}
                        </label>
                        <label>{{ item?.text }}</label>
                    </el-popover>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LifeStyleCard',
    props: {
        lifestyleData: Array,
    },
    data() {
        return {

        }
    },
    filters: {
        typeTrans: function (type) {
            let res = '';
            //1：运动指数，2：洗车指数，3：穿衣指数，9：感冒指数 10:空气污染扩散条件指数 15:交通指数
            switch (type) {
                case '1':
                    res = "运动";
                    break;
                case '2':
                    res = "洗车";
                    break;
                case '3':
                    res = "穿衣";
                    break;
                case '9':
                    res = "感冒";
                    break;
                case '10':
                    res = "空气";
                    break;
                case '15':
                    res = "交通";
                    break;
            }
            return res;
        }
    },

    computed: {
        clotheUrl: function () {
            return function (level,type) {
                 //1：运动指数，2：洗车指数，3：穿衣指数，9：感冒指数 10:空气污染扩散条件指数 15:交通指数
                if(type == "1"){
                    return require('../../assets/images/yundong.png');
                }else if(type =="2"){
                    return require('../../assets/images/xiche.png');
                }else if(type == "3"){
                    return require('../../assets/images/clothes/'+ Number(level) + '.png');
                }else if(type == "9"){
                    return require('../../assets/images/yaowu.png');
                }else if(type == "10"){
                    return require('../../assets/images/kongqi.png');
                }else{
                    return require('../../assets/images/jiaotong.png');
                }
            }
        }
    },
}
</script>
<style scoped>
.content-life-style-card {
    position: relative;
    top: 10px;
    width: 292px;
    height: 464px;
    margin-left: 8px;
    margin-top: 8px;

}
.content-life-style-card .card-outside-box {
    height: 100%;
}
.card-outside-box ul{
    display: flex;
    flex-wrap:wrap;
}
.card-outside-box ul li{
    display: inline-block;
    height: 123px;
    width:110px;
    margin-left:6px;
    margin-bottom: 6px;
    padding:12px;
    cursor: pointer;
    color:#000;
    background:#fff;
    border-radius: 4px;
    text-align: center;

}
li:hover{
    background: rgba(255, 255, 255, 0.9);
}
img {
    width: 60px;
    height: 60px;
}
.card-outside-box .card-text {
    display: block;
    margin:10px 0;
}
</style>