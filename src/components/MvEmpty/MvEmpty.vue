<template>
  <div class="mv-empty" :style="{ width: widthAddPx, height: heightAddPx, margin: 'auto' }">
    <slot name="mode">
      <img :src="`data:image/svg+xml;base64,${emptySvg[mode].default}`" alt="" class="mv-empty-img" />
    </slot>
    <div class="mv-empty-description">{{ text }}</div>
    <div style="margin-top: 10px"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import * as emptySvg from "../emptyBase64";
import { mvEmptyProps } from "./mvEmpty";

defineOptions({
  name: 'MvEmpty'
})

const props = defineProps(mvEmptyProps)

const widthAddPx = computed(() => {
  return `${props.width}`.endsWith('px') || `${props.width}`.endsWith('%') ? `${props.width}` : `${props.width}px`
})
const heightAddPx = computed(() => {
  return `${props.height}`.endsWith('px') || `${props.height}`.endsWith('%') ? `${props.height}` : `${props.height}px`
})
</script>
<style scoped lang="scss">
.mv-empty {
  text-align: center;
  user-select: none;

  &-description {
    color: var(--el-color-info);
    font-size: 14px;
  }

  &-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>