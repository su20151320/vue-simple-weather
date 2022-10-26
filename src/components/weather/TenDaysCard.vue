<template>
    <div class="content-tenday-card">
        <div class="title-marg-top-bottom5 text-wei">7天预报</div>
        <div class="icon pre-icon" @click="preClick" ref="preBtn">
            <img src="@/assets/images/left-circle.png" />
        </div>
        <ul>
            <li class="today-card" :class="{ active: index == 0 }" v-for="(day, index) in tenData" :key="index"
                ref="liBox">
                <div class="box-padd15 font-size14">
                    <label class="text-wei label-date text-wei">{{ day.fxDate | fxDateFormat }}</label>
                    <div class="flex-card" :class="{ 'card-center': index > 0 }">
                        <i class="fonticon" :class="weatherIcon(index)"></i>
                        <div class="text-line">
                            <div class="text-wei">{{ day.tempMax }}°</div>
                            <div>{{ day.tempMin }}°</div>
                        </div>
                        <div class="text-opa text-line" v-if="index == 0">
                            <div>{{ day.textDay }}</div>
                            <div class="font-size12">{{ day.precip }}毫米</div>
                        </div>
                    </div>
                </div>
            </li>

        </ul>
        <div class="icon next-icon" @click="nextClick" ref="nextBtn">
            <img src="@/assets/images/right-circle.png" />
        </div>
    </div>
</template>
<script>

export default {
    name: 'TenDaysCard',
    props: {
        tenData: Array,
    },
    data() {
        return {
        }
    },
    methods: {
        preClick() {
            this.animal('0');
            this.$refs.preBtn.style.display = 'none';
            this.$refs.nextBtn.style.display = 'block';
        },
        nextClick() {
            this.animal('-324px')
            this.$refs.preBtn.style.display = 'block';
            this.$refs.nextBtn.style.display = 'none';
        },
        animal(offset) {
            let lists = this.$refs.liBox;
            for (let i = 0; i < lists.length; i++) {
                lists[i].style.left = offset;
            }
        }
    },
    computed: {
        //计算属性里传参数时要闭包
        weatherIcon: function () {
            return function (index) {
                let iconCode = this.tenData[index]?.iconDay || '100';
                return 'qi-' + iconCode + '-fill';
            }
        },

    },
    filters: {
        fxDateFormat: function (fxDate) {
            let today = new Date().getDate();
            let dt = new Date(fxDate);//获取该日期所属的星期几
            let arr = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
            let week = dt.getDay();
            let date = Number(fxDate.substr(8, 2));//获取日期中的天
            return today === date ? "今天" : date + '日' + arr[week];
        }
    }
}
</script>
<style scoped>
.content-tenday-card {
    position: relative;
    top: 10px;
    /*因为上一个box已经用相对定位往下移10，所以这里也往下移，以便能够让元素不占对方的高度*/
    margin-bottom: 10px;
    height: 137px;
}

.content-tenday-card ul {
    width: 900px;
    height: 100px;
    position: absolute;
    left: 0;
    overflow: hidden;
    white-space: nowrap;
}

.content-tenday-card ul li {
    display: inline-block;
    position: relative;
    left: 0;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    width: 158px;
    height: 100px;
    margin-right: 6px;
    transition: left 1s;
}

ul li:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
}

li.active {
    width: 240px !important;
}

.active .flex-card {
    display: flex;
    flex: 1 auto 1 !important;
    justify-content: space-between !important;
}

.card-center {
    display: flex;
    justify-content: center;
}

.card-center .fonticon {
    display: inline-block;
    margin-right: 10px;
}

/* .flex-card img {
    width: 40px;
    height: 40px;
} */

.today-card .label-date {
    display: inline-block;
    margin-bottom: 10px;
}

.text-line {
    height: 20px;
    line-height: 20px;
}

.icon {
    position: absolute;
    top: 64px;
    z-index: 100;
}

.pre-icon {
    left: -16px;
    display: none;
}

.icon img {
    width: 30px;
    height: 30px;
    opacity: 0.6;
}

.icon img:hover {
    cursor: pointer;
}

.next-icon {
    right: -14px;
}
</style>