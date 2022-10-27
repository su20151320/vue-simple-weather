<template>
    <div class="page-footer font-size14">
        <label>气象数据来源 · 风和天气 </label>
        <label> 日历数据来源 · 天行数据</label>
    </div>
</template>
<script>
export default {
    name: 'PageFooter',
}
</script>
<style scoped>
.page-footer {
    width: 100%;
    /* height: 80px; */
    background-color: rgb(31, 96, 161, 0.9);
    color: #D0D0D0;
}

.page-footer label {
    display: block;
    padding-top: 9px;
    text-align: center;
}
</style>