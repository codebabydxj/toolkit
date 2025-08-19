<template>
    <el-tree-select :modelValue="modelValue" v-bind.prop="$props" v-bind:attr="$attrs" :data="data" check-strictly
        style="width:100%" :props="options" node-key="id" :default-expanded-keys="expandedIds" empty-text="无匹配数据"
        @change="handleCheckChange" />
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref } from "vue";
import useDictArray from "../../hooks/useDictArray";
import { listToTree } from "../../utils/listFormat";
import { mvTreeSelectEmits, mvTreeSelectProps } from "./mvTreeSelect";
import useDictMap from "@/hooks/useDictMap.ts";

defineOptions({
    name: 'MvTreeSelect'
})

const props = defineProps(mvTreeSelectProps)

const emit = defineEmits(mvTreeSelectEmits)

const defaultOption = {
    value: 'value',
    label: 'label',
    children: 'children',
    renderAfterExpand: false,
    checkStrictly: true
}
const expandedIds = ref<Record<string, any>[]>([])
const options = Object.assign(defaultOption, props.option)
const { arr } = useDictArray(props.dictCode,props.getOptionData)
const data: Record<string, any> = computed(() => listToTree(arr.value, 'id', 'parentId'))


const findExpandedIds = (data: any[], level: number = 0) => {
    return data.map((item: any) => {
        item.level = level + 1;
        if (item.children.length) item.children = findExpandedIds(item.children, item.level)
        return item
    })
}

const handleCheckChange = (val: any) => {
    emit('update:modelValue', val)
}
</script>

<style lang="scss" scoped></style>