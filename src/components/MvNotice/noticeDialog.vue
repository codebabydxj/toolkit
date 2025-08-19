<!-- 详情页 -->
<template>
  <div class="main">
    <div class='title_box'>
      <p>{{ noticeDto.taskTitle }}</p>
    </div>
    <div class="article_info">
      <div>
        时间：<span style="font-weight: 600;">{{ noticeDto.releaseTime }}</span>
      </div>
      <div>
        发布部门：<span style="font-weight: 600;">{{ noticeDto.fromDeptName }}</span>
      </div>
      <div>
        发布人：<span style="font-weight: 600;">{{ noticeDto.fromUserName }}</span>
      </div>
      <div v-if="noticeDto.createUserPhone">
        联系电话：<span style="font-weight: 600;">{{ noticeDto.createUserPhone }}</span>
      </div>
    </div>
    <div class="article_content">
      {{ activeName == 'first' ? '通知' : '公告' }}内容：
    </div>
    <el-alert :title="noticeDto.content" type="success" :closable="false" />
    <div class="article_file_box" v-if="noticeDto.files">
      附件：
      <div class='filesBox'>
        <ul class="file_list" v-for="(item, index) in noticeDto.files" :key='index'>
          <div class='file_li'>
            <span class="file_name">{{ item.fileName }}</span>
            <a :href="item.url" target="_blank">下载</a>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import dayjs from 'dayjs'
import { apiNotice } from "@/api/apiConfig";
import { client } from "@/api";

const props = defineProps(['taskId', 'activeName'])
const noticeDto = reactive<any>({
  taskTitle: null,//标题
  releaseTime: null,//发布时间
  fromDeptName: null,//发布部门
  fromUserName: null,//发布人：
  createUserPhone: null,//联系电话：
  content: null,//通知内容
  files: null,
})

const getNoticeDetail = async () => {
  let res = await client.get(apiNotice.taskDetail, {
    taskId: props.taskId,
  })
  if (res.code == 1) {
    noticeDto.taskTitle = res.data.resTaskBaseInfoDetail.taskTitle
    noticeDto.releaseTime = res.data.resPublishDetail.releaseTime ? dayjs(res.data.resPublishDetail.releaseTime).format("YYYY-MM-DD") : "-";
    noticeDto.fromDeptName = res.data.receiveInfoDetails.fromDeptName
    noticeDto.fromUserName = res.data.receiveInfoDetails.fromUserName
    noticeDto.content = res.data.resTaskBaseInfoDetail.content
  }
}
getNoticeDetail()
</script>

<style lang="scss" scoped>
.main {
  .title_box {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #d5dce3;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    color: #409eff;

    p {
      font-size: 16px;
      font-weight: 700;
      width: 95%;
      text-align: center;
    }
  }

  .article_info {
    margin-top: 5px;
    height: 21px;
    color: #666;
    line-height: 21px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .article_content {
    margin: 15px 0;
  }

  .article_file_box {
    margin-top: 15px;

    .filesBox {
      width: 100%;
      // margin: auto;

      .file_list {
        font-size: 14px;
        color: #606266;
        width: 100%;
        display: flex;
        line-height: 30px;
        // margin: 5px 0;
      }

      .file_name {
        margin-right: 5px;
      }

      .file_li:hover {
        cursor: pointer;
        color: #409eff;
        // border-radius: 3px;
      }

    }
  }

  .ql-editor {
    overflow: hidden;
    // color: #222;
    line-height: 1.5;
    margin-top: 10px;
  }

  .btn_box {
    margin-top: 20px;
  }


}
</style>
<style>
.ql-editor img {
  width: 100%;
}
</style>