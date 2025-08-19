<template>
    <div class="mv-icon-button">
        <div class="icon" v-if="icon" :style="style">
            <component :is="icon" v-if="iconType === 'elementIcon'"></component>
            <img :src="icon" v-if="iconType === 'image'" alt="" />
            <span class="iconfont" :class="icon" v-if="iconType === 'iconFont'"></span>
        </div>
        <div class="label">
            <slot></slot>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { computed } from "vue";
import { mvIconButtonProps } from "./mvIconButton";

defineOptions({
    name: 'MvIconButton'
})

const props = defineProps(mvIconButtonProps)

const iconSize = computed(() => props.iconSize + 'px')
const iconPadding = computed(() => props.iconSize / 6 + 'px')
const color = computed(() => props.color || 'var(--el-color-primary)')
const style = computed(() => ({
    width: iconSize.value,
    height: iconSize.value,
    padding: iconPadding.value,
    background: color.value
}))

</script>

<style scoped lang="scss">
.mv-icon-button {
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    background-color: var(--el-color-info-light-9);
    border-radius: 5px;
    padding: 8px;

    .icon {
        margin-right: 5px;
        color: #FFFFFF;
        box-sizing: border-box;
        position: relative;
        border-radius: 5px;

        img {
            width: 100%;
        }

        // &:before {
        //   content: " "; display: block; width: 100%; height: 100%; position: absolute; top: 0; left: 0; border-radius: 5px;
        //   background-image: linear-gradient(125deg, rgba($color: #FFFFFF, $alpha: 0.8), rgba($color: #FFFFFF, $alpha: 0));
        //   z-index: 2;
        // }
    }

    .label {
        font-size: 16px;
        font-weight: bold;
        flex: 1;
        white-space: nowrap;
        padding-right: 5px;
    }

    &:hover {
        .icon {
            opacity: 0.8;
        }

        .label {
            color: var(--el-color-info);
        }
    }
}
</style>