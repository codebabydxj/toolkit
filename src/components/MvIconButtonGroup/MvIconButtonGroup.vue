<template>
    <div class="mv-icon-button-group-main">
        <div class="mv-icon-button-group" ref="mvRef">
            <div class="mv-icon-button-group-content">
                <slot></slot>
            </div>
        </div>
        <div class="mv-icon-button-group-right">
            <slot name="rightIcon"></slot>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from "vue";

defineOptions({
    name: "MvIconButtonGroup"
})

const mvRef = ref()
onMounted(() => {
    mvRef.value.addEventListener('wheel', (event: any) => {
        event.preventDefault()
        mvRef.value.scrollLeft += (event.deltaY as number)
    })
})

</script>
  
<style scoped lang="scss">
.mv-icon-button-group-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mv-icon-button-group {
    overflow: hidden;
    overflow-x: auto;
    display: flex;
    padding: 20px 0;

    &::-webkit-scrollbar {
        height: 5px;
        background: transparent;
        border-radius: 5px;
        transition: background-color .3s;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 5px;
        transition: background-color .3s;
    }

    &:hover {
        &::-webkit-scrollbar {
            background: var(--el-color-info-light-5);
        }

        &::-webkit-scrollbar-thumb {
            background: var(--el-color-info);
        }
    }

    .mv-icon-button-group-content {
        flex: 1;
        display: flex;
        grid-gap: 20px;
    }
}

.mv-icon-button-group-right {
    padding: 0 10px;
}</style>