<template>
    <template v-for="item in list">
        <el-sub-menu :index="item.path" v-if="hasChildren(item.children) && item.hidden !== 1">
            <template #title><span>{{ item.meta.title || item.name }}</span></template>
            <el-menu-item-group v-if="item.children && item.children.length > 0">
                <mv-menu-item :list="item.children"></mv-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="item.path" v-if="item.meta && item.meta.hidden !== 1">
                <template #title>{{ item.meta.title || item.name }}</template>
            </el-menu-item>
        </template>
    </template>
</template>

<script lang="ts" setup>
import { mvMenuItemPorps } from "./mvMenuItem";

defineOptions({
    name: 'MvMenuItem'
})
const props = defineProps(mvMenuItemPorps)

const hasChildren = (list: Record<string, any>[]) => {
    if (list?.length) {
        const has = list.filter(x => x.meta.hidden !== 1)
        return has.length
    } else {
        return false
    }

}
</script>

<style lang="scss" scoped></style>