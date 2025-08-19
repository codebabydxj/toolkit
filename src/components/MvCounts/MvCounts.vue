<template>
    <div class="mv-counts" :style="{ '--mv-counts-gutter': gutter + 'px' }">
        <slot></slot>
    </div>
</template>
  
<script lang="ts" setup>
import { mvCountsProps } from './mvCounts';

defineOptions({
    name: 'MvCounts'
})
const props = defineProps(mvCountsProps)
</script>
  
<style scoped lang="scss">
.mv-counts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: var(--mv-counts-gutter);
}
</style>