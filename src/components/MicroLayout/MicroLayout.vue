<template>
  <el-container class="b-common-layout">
    <el-aside>
      <el-scrollbar>
        <el-menu :default-active="defaultMenu"
          :background-color="themeModel === 'light' ? 'var(--el-color-primary)' : 'var(--el-bg-color)'"
          text-color="#FFFFFF" active-text-color="yellow" :router="true" :unique-opened="true">
          <mv-menu-item :list="routes"></mv-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header height="50px" style="z-index: 9;">
        <el-page-header @click="handleBack" :title="navHeader.title">
          <template #icon>
            <el-icon color="var(--el-color-info-light-3)">
              <arrowLeft />
            </el-icon>
          </template>
        </el-page-header>
        <div class="b-userInfo">
          <el-switch v-model="themeModel" active-value="dark" inactive-value="light" @change="themeChange" size="large"
            style="margin-right: 10px;" active-text="夜" inactive-text="昼" inline-prompt />
          <el-avatar :size="32" :src="userInfo?.avatar"></el-avatar>
          <div class="b-nickName">
            {{ userInfo?.realname }}
            <div>{{ userInfo?.defaultDepart?.departName }}</div>
          </div>
          <el-button icon="SwitchButton" circle @click="loginOut"></el-button>
        </div>
      </el-header>
      <el-scrollbar>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import microAuth from "../../utils/microAuth";
import MvMenuItem from "../MvMenuItem"
import { microLayoutProps, microLayoutEmits } from "./microLayout";

defineOptions({
  name: 'MicroLayout',
})

const props = defineProps(microLayoutProps)
const emit = defineEmits(microLayoutEmits)

const body: any = document.querySelector('body')
body.style.margin = '0'
body.style.padding = '0'
const defaultMenu = computed(() => props.fullPath)
const navHeader: any = reactive({
  title: '返回',
})

const htmlDom = document.querySelector('html')

const themeModel = ref('light')
const themeChange = (value: any) => {
  htmlDom?.setAttribute('class', value)
  localStorage.setItem('theme', value)
}

onMounted(() => {
  themeModel.value = localStorage.getItem('theme') || 'light'
  htmlDom?.setAttribute('class', themeModel.value)
})

const handleBack = () => {
  history.back()
}
const loginOut = () => {
  microAuth()
}

const userInfo = computed(() => props.userInfo)
</script>
<style scoped lang="scss">
html.dark {
  .b-common-layout {
    .el-aside {
      background: var(--el-bg-color);
    }
  }
}


.b-common-layout {
  height: 100vh;
  background: var(--el-bg-color-page);

  .el-header {
    background: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-lighter);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    background: var(--el-color-primary);
    display: flex;
    flex-direction: column;

    .el-scrollbar {
      flex: 1;
    }
  }

  .el-main {
    --el-main-padding: 15px;
  }

  .el-menu {
    border-right: none;
  }
}


.b-userInfo {
  display: flex;
  align-items: center;

  .b-nickName {
    font-size: 14px;
    margin: 0 10px;
    color: var(--el-color-primary);
  }
}
</style>