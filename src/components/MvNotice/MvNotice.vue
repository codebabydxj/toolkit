<!-- 待办事项 -->
<template>
  <div class="toList">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane name="first" :style="{ height: ulHeight }">
        <template #label>
          <span class="custom-tabs-label">
            <span>通知</span>
            <span class="num_box">({{ tzTotal <= 99 ? tzTotal : '99+' }})</span>
          </span>
        </template>
        <ul :loading="loading" v-if="noticeList.length" style="overflow: hidden; position: relative;" :style="{ height: ulHeight }">
          <el-scrollbar :max-height="scrollH">
            <li v-for="(item, index) in noticeList" :key="index" @click="toDetail(item.taskId)">
              <el-alert :type="item.viewCount > 0 ? 'info' : 'warning'" :closable="false" class="el_alert_p">
                <span class="title">{{ item.taskTitle }}</span>
                <span class="time">{{item.releaseTime }}</span>
              </el-alert>
              <el-tag size="small" :type="item.viewCount > 0 ? 'success' : 'primary'" style="margin-left: 4px;">{{ item.viewCount > 0 ? '已读' : '未读'}}</el-tag>
            </li>
          </el-scrollbar>
          <div class="pages">
            <el-button-group>
              <el-button type="primary" plain size="small" :icon="ArrowLeft" @click="prevPage('first')">上一页</el-button>
              <el-button type="primary" plain size="small" @click="nextPage('first')">下一页
                <el-icon class="el-icon--right">
                  <ArrowRight />
                </el-icon>
              </el-button>
            </el-button-group>
          </div>
        </ul>
        <mv-empty mode="NoData" width="200" height="200" text="暂无通知" v-else></mv-empty>
      </el-tab-pane>
      <el-tab-pane name="second" :style="{ height: ulHeight }">
        <template #label>
          <span class="custom-tabs-label">
            <span>公告</span>
            <span class="num_box">({{ ggTotal <= 99 ? ggTotal : '99+' }})</span>
          </span>
        </template>
        <ul :loading="loading" v-if="noticeList.length" style="overflow: hidden; position: relative;" :style="{ height: ulHeight }">
          <el-scrollbar :max-height="scrollH">
            <li v-for="(item, index) in noticeList" :key="index" @click="toDetail(item.taskId)">
              <el-alert :type="item.viewCount > 0 ? 'info' : 'warning'" :closable="false" class="el_alert_p">
                <span class="title">{{ item.taskTitle }}</span>
                <span class="time">{{item.releaseTime }}</span>
              </el-alert>
              <el-tag size="small" :type="item.viewCount > 0 ? 'success' : 'primary'" style="margin-left: 4px;">{{ item.viewCount > 0 ? '已读' : '未读'}}</el-tag>
            </li>
          </el-scrollbar>
          <div class="pages">
            <el-button-group>
              <el-button type="primary" plain size="small" :icon="ArrowLeft" @click="prevPage('second')">上一页</el-button>
              <el-button type="primary" plain size="small" @click="nextPage('second')">下一页
                <el-icon class="el-icon--right">
                  <ArrowRight />
                </el-icon>
              </el-button>
            </el-button-group>
          </div>
        </ul>
        <mv-empty mode="NoData" width="200" height="200" text="暂无公告" v-else></mv-empty>
      </el-tab-pane>
      <el-tab-pane name="three" :style="{ height: ulHeight }">
        <template #label>
          <span class="custom-tabs-label">
            <span>我发送消息</span>
            <span class="num_box">({{ mySendTotal <= 99 ? mySendTotal : '99+' }})</span>
          </span>
        </template>
        <mv-empty mode="NoData" width="200" height="200" text="暂无消息"></mv-empty>
      </el-tab-pane>
    </el-tabs>
    <!-- 详情页弹窗 -->
    <div v-if="modelValue">
      <el-dialog :title="`${activeName == 'first' ? '通知' : '公告'}预览`" :modelValue="modelValue" :before-close="closeDialog" width="50%"
        :close-on-click-modal="false">
        <noticeDialog :taskId="taskId" :activeName="activeName"></noticeDialog>
        <template #footer>
          <el-button type="default" @click="closeDialog">关 闭</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { TabsPaneContext } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import noticeDialog from './noticeDialog.vue'
import { client } from "@/api";
import { apiNotice } from "@/api/apiConfig";
import MvEmpty from "../MvEmpty/MvEmpty.vue"

defineOptions({
    name: 'MvNotice'
})

const props = defineProps(['isRefresh', 'version'])
const activeName = ref('first')
const loading = ref(false)
const noticeList = ref(<any>[]) // 通知列表
const tzTotal = ref(0) // 通知Total
const ggTotal = ref(0) // 公告Total
const mySendTotal = ref(0) // 我发送Total
const taskId: any = ref('')
const params: any = ref({
  type: 1,
  sendType: 'pc',
  workArea: 4,
  releaseTemplateCode: 'tzgg_type',
  typeCode: 'tzgg',
  twoTypeCode: 'tz',
  page: 1,
  size: 10
})
const ulHeight = ref('270px')
const scrollH = ref('230px')

//  --  详情弹窗 ---
const modelValue = ref(false)
const handleClick = (tab: TabsPaneContext) => {
  params.value.page = 1
  params.value.size = 7
  getNoticeList(tab.props.name)
}
// 获取通知列表
const getNoticeList = (name: any) => {
  params.value.type = name == 'first' ? 1 : 2
  params.value.twoTypeCode = name == 'first' ? 'tz' : 'gg'
  if (!loading.value) {
    loading.value = true
    client.post(apiNotice.selectTasksByTypePage, params.value)
    .then((res: any) => {
      if (res.code === 1) {
        noticeList.value = res.data.list.map((i: any) => ({
          ...i,
          releaseTime: i.releaseTime ? dayjs(i.releaseTime).format("YYYY-MM-DD") : '-'
        }))
        if (name == 'first') {
          tzTotal.value = res.data.total
        } else {
          ggTotal.value = res.data.total
        }
      }
    }).finally(() => {
      loading.value = false
    }).catch(() => {
      loading.value = false
    })
  }
}
getNoticeList('first')

const prevPage = (type: any) => {
  if (params.value.page == 1) return
  params.value.page--
  getNoticeList(type)
}

const nextPage = (type: any) => {
  const total = type == 'first' ? tzTotal.value : ggTotal.value
  // if (params.value.page * params.value.size > total) return
  params.value.page++
  getNoticeList(type)
}

watch(() => props.isRefresh, (newVal: any) => {
  if (newVal) {
    getNoticeList('first')
  }
})

// 详情页查看
const toDetail = (id: any) => {
  if (!taskId) return
  taskId.value = id
  modelValue.value = true
}

const closeDialog = () => {
  modelValue.value = false
  taskId.value = ''
  getNoticeList(activeName.value)
}
</script>

<style lang="scss" scoped>
.toList {
  position: relative;
  width: 100%;

  .right_box {
    position: absolute;
    right: 0;
    top: 10px;
  }

  .custom-tabs-label {
    font-size: 16px;
  }

  .demo-tabs {
    width: 100%;
  }

  .is-active {
    .num_box {
      color: red;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    // li::before {
    //   content: "";
    //   width: 6px;
    //   height: 6px;
    //   display: inline-block;
    //   border-radius: 50%;
    //   background: black;
    //   vertical-align: middle;
    //   margin-right: 14px;
    // }

    li {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 15px;
      padding: 4px 0;
      list-style: none
    }

    li:hover {
      color: var(--el-color-primary);
      cursor: pointer;
    }

    li div {
      width: 95%;
      padding-right: 10px;
      flex: 1;
      align-content: space-between;
    }

    li .title {
      font-size: 14px;
      display: inline-block;
      // min-width: 50%;
      max-width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    li .time {
      font-size: 14px;
      float: right;
    }
  }
}

.article_title {
  padding: 25px 0;
  font-family: "微软雅黑", "黑体";
  font-size: 32px;
  line-height: 35px;
  text-align: center;
}

img {
  width: 100%;
}

.article_info {
  padding: 2px 5px 0 5px;
  height: 21px;
  border-top: #EAEAEA 1px solid;
  border-bottom: #EAEAEA 1px solid;
  color: #666;
  line-height: 21px;
}

.ql-editor {
  overflow: hidden;
  color: #222;
  line-height: 1.5;
}
:deep(.el-scrollbar__wrap){
  overflow: hidden !important;
  overflow-y: auto !important;
}
:deep(.el-scrollbar__bar.is-horizontal) {
  height: 0 !important;
}
:deep(.el_alert_p) {
  p {
    margin: 0;
  }
  .el-alert__content {
    width: 100%;
  }
}
.pages {
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  bottom: 4px;
  display: flex;
  justify-content: flex-end;
}
</style>

<style>
.ql-editor img {
  width: 100%;
}
</style>