<template>
    <el-select :modelValue="modelValue" v-bind.prop="$props" v-bind.attr="$attrs">
        <el-option :label="value" :value="key" v-for="(value, key) in options"></el-option>
    </el-select>
</template>

<script lang="ts" setup>
import useDictMap from '../../hooks/useDictMap';
import { mvSelectProps } from './mvSelect';
import {computed, onMounted, ref, watch} from "vue";

defineOptions({
    name: 'MvSelect'
})
const emit  = defineEmits(['getFatherData'])
const props = defineProps(mvSelectProps)

const { options } = useDictMap(props.dictCode, props.getOptionData)

</script>

<style lang="scss" scoped></style>