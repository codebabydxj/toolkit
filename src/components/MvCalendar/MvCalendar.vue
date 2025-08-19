<template>
  <div class="mvCalendar">
    <el-calendar v-model="currentMonth" :class="[{ small: size === 'small' }, { large: size === 'large' }]">
      <template #date-cell="{ data }">
        <div class="day" :class="[data.isSelected ? 'is-selected' : '']" @click="dateClick(data)">
          <div class="dayHeader">
            <slot name="header" :date="data" v-if="$slots.header"></slot>
            <span v-else>{{ data.day.split('-').slice(1).join('-') }}</span>
          </div>
          <div class="dayContent" :class="{ dot: type === 'dot' }">
            <template v-if="$slots.content" v-for="item in dateData[data.day]">
              <slot name="content" :data="dateData[data.day]"></slot>
            </template>
            <template v-else v-for="(item, index) in dateData[data.day]">
              <el-tooltip :content="item.title" placement="bottom-start" v-if="maxLine === 0 || (index + 1) <= maxLine">
                <div class="dayItem" v-if="dateData[data.day]" :style="{ '--color': item.color }">
                  <span v-if="type !== 'dot'">{{ item.title }}</span>
                </div>
              </el-tooltip>
              <div v-else>...</div>
            </template>
          </div>
        </div>
      </template>
    </el-calendar>

    <el-dialog v-model="visible" :title="`${title}日程`" width="800" :appendToBody="appendToBody">
      <el-collapse>
        <el-collapse-item :name="item.id" v-for="(item) in dateData[title]">
          <template #title>
            <div
              style="display: flex; gap: 5px; align-items: center; justify-content: space-between; width: 100%; padding-right: 20px">
              <span
                :style="{ display: 'block', width: '14px', height: '14px', background: item.color, borderRadius: '10px' }"></span>
              <h3>{{ item.title }}</h3>
              <div style="margin-left: auto">
                <el-button icon="Edit" round type="primary" size="small" @click="edit(item)"></el-button>
                <el-button icon="Delete" type="warning" round size="small" @click="del(item)"></el-button>
              </div>
            </div>
          </template>
          <div v-html="item.content"></div>
        </el-collapse-item>
      </el-collapse>
      <template #footer>
        <el-button type="primary" @click="addVisible = true">新增</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="addVisible" :title="`${title}日程`" width="800" :before-close="addDialogClose"
      :appendToBody="appendToBody">
      <el-form :model="form" label-width="80px" ref="formRef" :rules="rules">
        <el-form-item label="id" prop="id" style="display: none">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="calDate" prop="calDate" style="display: none">
          <el-input v-model="form.calDate"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-color-picker v-model="form.color" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mv-editor v-model="form.content"></mv-editor>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { dayjs, ElMessage, ElMessageBox, FormInstance } from 'element-plus';
import { ref, watch } from 'vue';
import { client } from '@/api';
import { MvCalendarForm } from "@/components/MvCalendar/types.ts";
import { isRequired } from "@/form";
import { mvCalendarProps } from "@/components/MvCalendar/mvCalendar.ts";

defineOptions({
  name: 'MvCalendar'
})

const props = defineProps(mvCalendarProps)

const dateData = ref<Record<string, any>>({})

const title = ref('')
const visible = ref(false)
const addVisible = ref(false)
const currentMonth = ref(new Date())
watch(currentMonth, () => {
  getDateData()
})

const formRef = ref<FormInstance>()
const form = ref<MvCalendarForm>({
  id: '',
  title: '',
  color: '#FF0000',
  content: '',
  calDate: ''
})

const rules = ref({
  title: [isRequired({ msg: '请填写标题' })],
  color: [isRequired({ msg: '请选择颜色', trigger: 'change' })],
  content: [isRequired({ msg: '请输入内容' })],
})

const dateClick = (e: any) => {
  title.value = e.day
  form.value.calDate = e.day
  if (dateData.value[e.day]) {
    visible.value = true
  } else {
    addVisible.value = true
  }
}

const getDateData = async () => {
  const res = await client.post('/api/gis/gisCalendarStorage/list', { calDate: `*${dayjs(currentMonth.value).format('YYYY-MM')}*` })
  dateData.value = res.data
}
getDateData()

const submit = async () => {
  const valid = formRef.value?.validate()
  if (valid) {
    const url = form.value.id ? '/api/gis/gisCalendarStorage/update' : '/api/gis/gisCalendarStorage/add'
    const res = await client.post(url, form.value)
    if (res.code === 1) {
      ElMessage.success(form.value.id ? '修改成功' : '添加成功')
      await getDateData()
      addDialogClose()
    } else {
      ElMessage.error(res.msg)
    }
  }
}

const edit = (data: any) => {
  addVisible.value = true
  form.value = Object.assign({}, data)
}

const del = async (data: any) => {
  await ElMessageBox.confirm('确定要删除吗？', '温馨提示', { appendTo: '.mvCalendar' })
  const res = await client.get('/api/gis/gisCalendarStorage/delete', { ids: [data.id].join(',') })
  if (res.code === 1) {
    ElMessage.success('删除成功')
    await getDateData()
  } else {
    ElMessage.error(res.msg)
  }

}

const addDialogClose = () => {
  formRef.value?.resetFields()
  addVisible.value = false
}
</script>

<style lang="scss" scoped>
.day {
  width: 100%;
  height: 100%;
  position: relative;

  .dayHeader {
    white-space: nowrap;
    font-size: v-bind(dayFontSize);
  }

  .dayContent {
    display: flex;
    gap: 3px;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow: hidden;

    .dayItem {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: v-bind(contentFontSize);

      &:before {
        content: "";
        overflow: hidden;
        display: block;
        width: 10px;
        height: 10px;
        background: var(--color, red);
        border-radius: 10px;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        flex: 1;
        font-size: 14px;
      }
    }

    &.dot {
      flex-direction: row;
    }
  }

}

:deep(.el-calendar) {
  --el-calendar-cell-width: auto;
}

.small {
  :deep(.el-calendar__header) {
    padding: 5px 10px;
  }

  :deep(.el-calendar__body) {
    padding: 0 15px 15px;
  }

  :deep(.el-calendar-table thead th) {
    padding: 8px 0;
    font-size: 14px;
  }
}

.large {
  :deep(.el-calendar__header) {
    padding: 15px 25px;
    font-size: 18px;
  }

  :deep(.el-calendar__body) {
    padding: 0 15px 15px;
  }

  :deep(.el-calendar-table thead th) {
    padding: 15px 0;
    font-size: 16px;
  }
}

:deep(.el-calendar-table .el-calendar-day) {
  min-height: v-bind(dayHeight);
  --el-calendar-cell-width: auto;
}</style>
