<template>
    <div class="content-life-style-card">
        <div class="title-marg-top-bottom5 text-wei">生活指数</div>
        <div class="radius-box">
            <el-row :gutter="24" class="box-padd-lr-8">
                <el-col :span="12">
                    <el-card shadow="always" :body-style="{ padding: '10px' }">
                        总是显示
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always"  :body-style="{ padding: '10px' }">
                        鼠标悬浮时显示
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="box-padd-lr-8">
                <el-col :span="12">
                    <el-card shadow="always"  :body-style="{ padding: '10px' }">
                        总是显示
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always"  :body-style="{ padding: '10px' }">
                        鼠标悬浮时显示
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="box-padd-lr-8">
                <el-col :span="12">
                    <el-card shadow="always" :body-style="{ padding: '10px' }">
                        总是显示
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always" :body-style="{ padding: '10px' }">
                        鼠标悬浮时显示
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LifeStyleCard'
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

.content-life-style-card .radius-box {
    height: 100%;
    padding: 15px 0;
}

.radius-box .box-padd-lr-8 .el-col-12:first-child {
    padding-left: 6px !important;
    padding-right: 6px !important;
}

.radius-box .box-padd-lr-8 .el-col-12:last-child {
    padding-left: 0 !important;
    padding-right: 6px !important;
}

.radius-box .box-padd-lr-8 {
    margin: 6px 0 !important;
}

.box-padd-lr-8 .el-card {
    height: 110px;
    line-height: 110px;
    text-align: center;
}
</style>