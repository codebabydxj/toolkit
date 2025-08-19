<template>
    <el-checkbox-group :model-value="modelValue" v-bind.prop="$props" v-bind.attr="$attrs">
        <el-checkbox v-for="(value, key) in options" :label="key">{{ value }}</el-checkbox>
    </el-checkbox-group>
</template>

<script lang="ts" setup>
import useDictMap from '../../hooks/useDictMap';
import { mvCheckboxProps } from './mvCheckBox';

defineOptions({
    name: 'MvCheckBox'
})

const props = defineProps(mvCheckboxProps)

const { options } = useDictMap(props.dictCode)
</script>

<style scoped></style>