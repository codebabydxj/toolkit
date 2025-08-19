<template>
    <el-cascader :model-value="modelValue" :props="cascaderProps" v-bind.prop="$props" v-bind.attr="$attrs" />
</template>

<script lang="ts" setup>
import type { CascaderProps } from "element-plus";
import { mvCascaderProps } from "./mvCascader";

defineOptions({
    name: 'MvCascader'
})

const props = defineProps(mvCascaderProps)

const defaultOption = {
    value: 'value',
    label: 'label',
    children: 'children',
    leaf: 'leaf',
    checkStrictly: true
}
const option = Object.assign(defaultOption, props.option)

const cascaderProps: CascaderProps = {
    lazy: true,
    ...option,
    lazyLoad(node, resolve) {
        const { level, value } = node
        if (props.getData) {
            props.getData(value || props.defaultCode).then((res: any) => {
                resolve(res)
            })
        }
    },
}

</script>

<style scoped></style>