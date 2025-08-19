<template>
    <el-radio-group :model-value="modelValue" v-bind.prop="$props" v-bind.attr="$attrs">
        <template v-if="button">
            <el-radio-button :label="key" v-for="(value, key) in options">{{ value }}</el-radio-button>
        </template>
        <template v-else>
            <el-radio :label="key" v-for="(value, key) in options">{{ value }}</el-radio>
        </template>
    </el-radio-group>
</template>

<script lang="ts" setup>
import useDictMap from '../../hooks/useDictMap';
import { mvRadioProps } from './mvRadio';

defineOptions({
    name: 'MvRadio'
})
const props = defineProps(mvRadioProps)

const { options } = useDictMap(props.dictCode)

</script>

<style scoped></style>