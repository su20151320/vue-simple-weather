<template>
    <div class="content">
        <div class="left">
            <section class="background-image">
                <div class="log"> WEATHER_TEST.COM</div>
            </section>
        </div>
        <div class="right">
            <div class="login-layout-inner">
                <div class="login_layout-inner_title_sel">
                    <a href="#" :class="{ active: loginActive }" @click.prevent="loginTitleClick">登录</a>
                    <a href="#" :class="{ active: registerActive }" @click.prevent="registerTitleClick">注册</a>
                </div>
                <transition name="form-fade" mode="in-out">
                    <section v-show="showLogin">
                        <el-form :model="loginForm" :rules="rules" ref="loginForm">
                            <el-form-item prop="username">
                                <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class="check-body">
                                    <!-- 图形校验区 -->
                                    <div class="check" v-if="checkVisible">
                                        <div class="check-child" ref="checkBox"></div>
                                    </div>
                                    <!-- 拖动条 -->
                                    <div class="drag">
                                        <div class="drag-tips">
                                            <span>向右拖动滑块填充拼图</span>
                                        </div>
                                        <!-- 可拖动的盒子 -->
                                        <div class="drag-child" ref="dragBox"
                                            v-on="{ mouseover: dragMouseOver, mousedown: dragMouseDown,mouseup:drangMouseUp }">
                                        </div>
                                    </div>
                                </div>
                                <el-button type="primary" style="width:100%"
                                    @click="submitForm('loginForm')">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </section>
                </transition>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loginActive: true,
            registerActive: false,
            loginForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            showLogin: false,
            checkVisible: false,
        }
    },
    mounted() {
        this.showLogin = true;
    },
    methods: {
        async submitForm(formName) {
            // this.$refs[formName].validate(async (valid) => {
            //     if (valid) {
            //         // const res = await login({ user_name: this.loginForm.username, password: this.loginForm.password });
            //         this.$message({
            //             type: 'success',
            //             message: '用户名是：' + this.loginForm.username + '密码是：' + this.loginForm.password
            //         });
            //     } else {
            //         this.$message({
            //             type: 'error',
            //             message: '请输入正确的用户名密码'
            //         });
            //     }
            // });
        },
        loginTitleClick() {
            this.loginActive = true;
            this.registerActive = false;

        },
        registerTitleClick() {
            this.loginActive = false;
            this.registerActive = true;
        },
        dragMouseOver(){
            this.checkVisible = true;
        },
        dragMouseDown() {
            document.addEventListener("mousemove", this.dragMouseMove);
        },
        dragMouseMove(event) {
            console.log(event);
            // 获取当前x的坐标
            const { layerX } = event;
            //超出该盒子范围即return
            if (layerX < 0 || layerX > 260.2) {
                return;
            }
            //修改可移动盒子的x坐标
            this.$refs.dragBox.style.transform = `translateX(${layerX}px)`;
            //修改被校验区域坐标
            this.$refs.checkBox.style.transform = `translateX(${layerX}px)`;
            if (layerX >= 248 && layerX <= 255) {
                console.log("通过校验")
            }


        },
        drangMouseUp(event) {
            document.removeEventListener("mousemove", this.dragMouseMove)
            const { layerX } = event;
            if (layerX < 248 || layerX > 255) { //不符合校验区域
                console.log("鼠标松开", this.$refs.dragBox.style);
                //修改可移动盒子的x坐标
                // this.$refs.dragBox.style.webkitAnimation = "move 0.5s ease-in-out";
                this.$refs.dragBox.style.animation = "move 0.5s ease-in-out";
                //修改被校验区域坐标
                // this.$refs.checkBox.style.webkitAnimation = "move 0.5s ease-in-out";
                this.$refs.checkBox.style.animation = "move 0.5s ease-in-out";

                const animationEnd = () => {
                    //修改可移动盒子的x坐标
                    this.$refs.dragBox.style.transform = `translateX(${0})`;
                    //修改被校验区域坐标
                    this.$refs.checkBox.style.transform = `translateX(${0})`;
                    // 清除动画属性
                    this.$refs.dragBox.style.animation = '';
                    this.$refs.checkBox.style.animation = '';

                    document.removeEventListener("webkitAnimationEnd", animationEnd)
                    document.removeEventListener("transitionend", animationEnd)
                }
                document.addEventListener("webkitAnimationEnd", animationEnd)
                document.addEventListener("transitionend", animationEnd)

            }
        },

    }
}

</script>

<style scoped>
.content {
    height: 100%;
    min-height: 100%;
    display: flex;
    align-items: stretch;
    position: absolute;
    width: 100%;
}

.left {
    position: relative;
    flex: 1 1 auto;
    /**让其左两边都自适应 */
}

.background-image {
    background-image: url(../assets/images/login_bg.png);
    background-position: 50%;
    /* 让图片居中 */
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: relative;
}

.log {
    position: absolute;
    top: 3rem;
    left: 50%;
    /* 让其文字居中显示 */
    transform: translate(-50%, -50%);
    font-size: 1.4rem;
}

@media screen and (min-width:768px) {
    .right {
        height: 100%;
        overflow-y: auto;
    }
}

.right {
    flex: 1 1 auto;
    /**让其右两边都自适应 */
    max-width: 415px;
    background: #fff;
    margin-left: auto;
    margin-right: auto;
}

@media screen and (max-width:767px) {
    .left {
        display: none
    }
}

.login-layout-inner {
    position: relative;
    padding: 3.5rem 2.75rem 4rem;
    min-height: 100%;
    text-align: center;
}

.login_layout-inner_title_sel {
    margin: 1.8rem 0;

}

.login_layout-inner_title_sel a {
    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 8px 0;
}

.login_layout-inner_title_sel a:first-child {
    margin-right: 5rem;
}

.login_layout-inner_title_sel .active {
    border-bottom: 2px solid darkorange;
}

/* 校验的弹窗样式 */
@media screen and (max-width:767px) {
    .check {
        width: 327px;
    }
}

@media screen and (min-width:768px) {
    .check {
        width: 310.2px;

    }
}

.check {
    height: 160px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* 伸展背景图像完全填充内容区域 */
    background-image: url("../assets/images/login_checkout.jpg");
    position: absolute;
    top: -170px;
}


.check::before {
    content: ' ';
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #fff;
    position: absolute;
    top: 40px;
    left: 250px;
}

/* 当设备屏幕的最大可见区域宽度 小于等于 767px时 */
@media screen and (max-width:767px) {
    .check-child {

        background-size: 327px 160px;
    }

    .drag {
        width: 327px;
    }
}

/* 当设备屏幕的最大可见区域宽度 大于等于 768px时 */
@media screen and (min-width:768px) {
    .check-child {
        background-size: 310.2px 160px;
    }

    .drag {
        width: 310.2px;
    }
}

.check-child {
    content: ' ';
    width: 50px;
    height: 50px;
    border: 1px solid #fff;
    background-image: inherit;
    background-repeat: inherit;
    background-position: -250px -40px;
    position: absolute;
    top: 40px;
    left: 10px;
}

.drag {
    height: 40px;
    background-color: #e3e3e3;
    margin-bottom: 22px;
    position: relative;
}

.drag-child {
    width: 50px;
    height: 40px;
    background-color: darkorange;
    z-index: 10px;
    position: absolute;
    top: 0;
    left: 0;
}

.drag-tips {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    color: #a8a8a8;
    user-select: none;
    position: absolute;
    top: 0;
    left: 0;

}

/* 通过关键字 keyframes 增加一个动画,名为move 原理是:将一套 CSS 样式逐渐变化为另一套样式。 */

@-webkit-keyframes move

/* Safari and Chrome */
    {

    to {
        transform: translateX(0);
    }
}

@keyframes move {
    to {
        transform: translateX(0);
    }
}
</style>
