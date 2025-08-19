<template>
    <div class="tableController">
        <div>
            <slot></slot>
        </div>
        <div class="sizeController" v-if="column && column.length > 0">
            <el-space>
                <el-icon :size="24" @click="refresh">
                    <Refresh />
                </el-icon>
                <el-dropdown trigger="click" @command="tableSizeChange">
                    <span class="el-dropdown-link">
                        <el-icon :size="24">
                            <Grid />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <template v-for="item in sizes">
                                <el-dropdown-item :command="item.value">{{ item.label }}</el-dropdown-item>
                            </template>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-popover placement="bottom-end" trigger="click" width="200">
                    <template #reference>
                        <el-icon :size="24">
                            <Operation />
                        </el-icon>
                    </template>
                    <div style="overflow: auto; max-height: 300px;">
                        <div v-for="item in column"
                            style="display: flex; justify-content: space-between; align-items: center;">
                            <el-checkbox :label="item.label" :checked="!item.hidden" :disabled="item.disabled"
                                @change="changeHidden(item)">{{
                                    item.label
                                }}</el-checkbox>
                            <div v-if="showArrow">
                                <el-icon :color="item.fixed === 'left' ? 'var(--el-color-primary)' : ''"
                                    @click="fixed(item, 'left')">
                                    <DArrowLeft />
                                </el-icon>
                                <el-icon :color="item.fixed === 'right' ? 'var(--el-color-primary)' : ''"
                                    @click="fixed(item, 'right')">
                                    <DArrowRight />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                </el-popover>
            </el-space>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { tableControllerEmits, tableControllerProps } from './tableController';
import type { SizesInterface } from './types';


defineOptions({
    name: 'TableController'
})

const props = defineProps(tableControllerProps)
const emit = defineEmits(tableControllerEmits)

const sizes = ref<SizesInterface[]>([
    { label: '默认', value: 'default' },
    { label: '宽松', value: 'large' },
    { label: '紧凑', value: 'small' },
])
const tableSizeChange = (command: string) => {
    emit('update:tableSize', command)
}
const refresh = () => {
    emit('refresh')
}
const changeHidden = (item: Record<string, any>) => {
    item.hidden = !item.hidden
    emit('changeHidden', item)
}

const fixed = (item: Record<string, any>, type: 'left' | 'right') => {
    item.fixed = item.fixed === type ? false : type
}


</script>

<style lang="scss" scoped>
.tableController {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    .size {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .el-icon {
        cursor: pointer;
        transition: color .3s;

        &:hover {
            color: var(--el-color-primary);
        }
    }
}
</style>