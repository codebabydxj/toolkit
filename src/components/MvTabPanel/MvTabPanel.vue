<template>
    <el-tabs v-model="active" class="demo-tabs" type="border-card" @tabChange="tabsChange">
        <el-tab-pane :label="item.label" :name="index" v-for="(item, index) in tags">
            <template #label>
                <div class="mv-tab-panel-label">{{ item.label }} <span>({{ unread(index) }})</span></div>
            </template>
            <ul class="mv-tab-panel-list" v-if="lists[index]?.length">
                <li v-for="item in lists[index]" @click="titleClick(item)">
                    <span :class="{ red: !item[option.read] }"> {{ item[option.title] }} ({{ item[option.read] ? '' : '未读'
                    }})
                    </span><span>{{ dayjs(item[option.date]).format('YYYY-MM-DD') }}</span>
                </li>
            </ul>
            <div style="height: 67px; text-align: center; line-height: 67px; color: var(--el-color-info-light-5)" v-else>
                暂无数据</div>
        </el-tab-pane>
    </el-tabs>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { dayjs } from "element-plus";
import { client } from "../../api";
import { systemStore } from "../../store";
import { mvTabPanelEmits, mvTabPanelProps } from "./mvTabPanel";

defineOptions({
    name: 'MvTabPanel'
})

const props = defineProps(mvTabPanelProps)
const emit = defineEmits(mvTabPanelEmits)
const active = ref(0)

const option = Object.assign({
    title: 'title',
    date: 'date',
    read: 'read'
}, props.option)

const lists = ref<Record<string, any>>({})
const unread = (index: number) => {
    if (lists.value[index]) {
        return lists.value[index].filter((x: any) => !x[option.read]).length
    } else {
        return 0
    }
}
const getList = async (name: number = 0) => {
    const res = await client.get(props.tags[name].api, {
        userId: systemStore.userInfo?.userId,
        page: 1,
        size: props.length
    })
    if (res.code === 1) {
        lists.value[name] = res.data.list
    }
}

const tabsChange = (name: any) => {
    getList(name)
}
onMounted(() => {
    for (let i = 0; i < props.tags.length; i++) {
        getList(i)
    }
})

const titleClick = (item: any) => {
    emit('click', item)
}
</script>
  
<style scoped lang="scss">
.mv-tab-panel-list {
    margin: 0;
    padding: 0;
    min-height: 67px;

    li {
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        line-height: 1.6;

        span.red {
            color: var(--el-color-error);
        }

        &:hover {
            span:nth-child(1) {
                text-decoration: underline;
            }
        }
    }
}

.mv-tab-panel-label {
    span {
        color: var(--el-color-error);
    }
}
</style>