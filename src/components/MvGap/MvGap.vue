<template>
    <div class="mv-gap" :style="{ width: width, height: height }"></div>
</template>
  
<script lang="ts" setup>
import { computed } from "vue";
import { mvGapProps } from "./mvGap";

defineOptions({
    name: 'MvGap'
})

const props = defineProps(mvGapProps)

const addPx = (value: string | number) => {
    if (typeof value === "number") {
        return props.width + 'px'
    }
    return value
}
const width = computed(() => addPx(props.width))
const height = computed(() => addPx(props.height))
</script>
<style scoped lang="scss">
.mv-gap {
    display: inline-block;
}
</style>