<template>
<div style="background-size: 200% auto;background-image: linear-gradient(to right, var(--el-color-primary) 0%, #c2e9fb 51%, #a1c4fd 100%);height: 100%;">
  <el-text class="_cy _hello">{{ hello }}</el-text>
  <el-text class="_cy">{{ greetings }}</el-text>
  <el-text class="_cy _time">
    <span>{{ `${year}年${month}月${day}` }}</span>
    <span style="padding: 0px 20px 0 10px;">{{ `${week}` }}</span>
    <span style="font-weight: 600; font-size: 24px;">{{ `${hour} : ${minute} : ${second}`}}</span>
  </el-text>
  <iframe id="weatherIframe" width="100%" scrolling="no" height="150" frameborder="0" allowtransparency="true" src="https://i.tianqi.com?c=code&id=48&icon=1&py=taiyuan&num=6&site=12" style="margin-top: 40px;"></iframe>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { getTimeState } from "@/utils/getTimeState"
import { useTime } from '@/hooks/useTime';
defineOptions({
    name: 'MvWeather'
})

onMounted(() => {
  nextTick(() => {
    // 处理天气的样式紊乱问题
    let _iframe_mright_1_a: HTMLElement | any = document.querySelector('#mright_1 .zl a');
    let _iframe_mright_1: HTMLElement | any = document.querySelector('#mright_1');
    let _iframe_mright_2: HTMLElement | any = document.querySelector('#mright_2');
    let _iframe_mright_3: HTMLElement | any = document.querySelector('#mright_3');
    let _iframe_mright_4: HTMLElement | any = document.querySelector('#mright_4');
    let _iframe_mright_5: HTMLElement | any = document.querySelector('#mright_5');
    let _iframe_mright_6: HTMLElement | any = document.querySelector('#mright_6');
    if (_iframe_mright_1_a) {
      _iframe_mright_1_a.style.display = 'flex';
      _iframe_mright_1_a.style.flexDirection = 'column';
      _iframe_mright_1_a.style.lineHeight = '26px';
    }
    if (_iframe_mright_1) {
      _iframe_mright_1.style.width = '190px';
    }
    if (_iframe_mright_2) {
      _iframe_mright_2.style.width = '107px';
      _iframe_mright_2.style.display = 'flex';
      _iframe_mright_2.style.justifyContent = 'center';
    }
    if (_iframe_mright_3) {
      _iframe_mright_3.style.width = '107px';
      _iframe_mright_3.style.display = 'flex';
      _iframe_mright_3.style.justifyContent = 'center';
    }
    if (_iframe_mright_4) {
      _iframe_mright_4.style.width = '107px';
      _iframe_mright_4.style.display = 'flex';
      _iframe_mright_4.style.justifyContent = 'center';
    }
    if (_iframe_mright_5) {
      _iframe_mright_5.style.display = 'none';
    }
    if (_iframe_mright_6) {
      _iframe_mright_6.style.display = 'none';
    }
  })
})

const { year, month, day, hour, minute, second, week } = useTime(true)
const hello: any = getTimeState()
const date: Date = new Date();
const greetings = computed(() => {
  if (date.getHours() >= 0 && date.getHours() < 12) {
    return '新的一天开始，用积极的态度面对一切🌞！';
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return '对未来的真正慷慨，是把一切献给现在😃！';
  } else {
    return '夜深了，愿月色拂去您的疲惫烦恼忧伤🌛！';
  }
});
</script>
 
<style scoped lang="scss">
._cy {
  font-size: 17px;
  color: #ffffff;
  display: flex;
  padding: 20px 20px 5px;
  font-weight: 500;
}
._hello {
  font-size: 20px;
  font-weight: 700;
}
._time {
  font-size: 18px;
  align-items: center;
}
</style>