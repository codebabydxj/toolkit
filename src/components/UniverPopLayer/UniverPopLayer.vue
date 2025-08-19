<template>
  <div>
    <template v-if="layerType === 'dialog'">
        <el-dialog v-model="modelValue" v-bind="params">
            <template v-if="$slots.default">
                <slot></slot>
            </template>
            <component :is="component" v-else></component>
            <template #footer>
                <slot name="footer"></slot>
            </template>
        </el-dialog>
    </template>
    <template v-if="layerType === 'drawer'">
        <el-drawer v-model="modelValue" v-bind="params">
            <template v-if="$slots.default">
                <slot></slot>
            </template>
            <component :is="component" v-else></component>
            <template #footer>
                <slot name="footer"></slot>
            </template>
        </el-drawer>
    </template>
  </div>
</template>

<script setup lang="ts">
import { UniverPopLayerType } from './types';

defineOptions({
  name: 'UniverPopLayer'
})

const modelValue = defineModel<boolean>({default: false})
const layerType = defineModel<UniverPopLayerType>('layerType', {required: true})
const params = defineModel<Record<string, any>>('params')
const component = defineModel('component')
</script>

<style lang="scss" scoped>
</style>