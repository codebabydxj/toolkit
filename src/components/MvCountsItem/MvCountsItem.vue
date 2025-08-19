<template>
  <div class="mv-counts-item" v-bind="{ ...$props, ...$attrs }">
    <div class="icon" :style="{ width: iconSize }" v-if="data.icon">
      <img :src="data.icon" alt="" :style="{ width: iconSize }">
    </div>
    <div :class="['text', { 'textCenter': center }]">
      <h4>{{ data.label }}</h4>
      <h3>{{ data.value }}<span :class="{ 'unit': unitEqual }">{{ data.unit }}</span></h3>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { computed } from "vue";
import { mvCountsItemProps } from "./mvCountsItem";

defineOptions({
  name: 'MvCountsItem'
})

const props = defineProps(mvCountsItemProps)

const iconSize = computed(() => props.iconSize + 'px')

</script>
  
<style scoped lang="scss">
.mv-counts-item {
  display: flex;
  align-items: center;
  grid-gap: 10px;

  .text {
    &.textCenter {
      text-align: center;
    }

    h3,
    h4 {
      margin: 0;
      padding: 0;
      font-weight: normal;
    }

    h4 {
      font-size: 16px;
      margin-bottom: 5px;
    }

    h3 {
      font-size: 20px;
      font-weight: bold;
      color: var(--el-color-primary);

      span {
        font-size: 14px;
        font-weight: normal;
        color: var(--el-color-info);

        &.unit {
          @extend h3
        }
      }
    }
  }
}
</style>