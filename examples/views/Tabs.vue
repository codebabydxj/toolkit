<template>
    <div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="User" name="first">
                <mv-empty mode="Message" width="500"></mv-empty>
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">
                <mv-empty mode="Error404" width="500"></mv-empty>
            </el-tab-pane>
            <el-tab-pane label="Role" name="third">
                <mv-empty mode="Permit" width="500"></mv-empty>
            </el-tab-pane>
            <el-tab-pane label="Task" name="fourth">
                <mv-empty mode="NoData" width="500"></mv-empty>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const activeName = ref('first')
const handleClick = () => { }
</script>

<style lang="scss" scoped>
// scoped 表示以下的css仅供本组件使用，外部不可使用
</style>