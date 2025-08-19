<template>
    <el-dialog :modelValue="modalValue" :title="title" width="600px" :before-close="handleClose">
        <div class="mv-import-exl-download">
            <a :href="downloadUrl">----&gt;&gt;&gt;下载模板&lt;&lt;&lt;----</a>
        </div>
        <el-upload ref="file" class="upload-demo mv-import-exl-upload" drag :limit="limit" accept=".xlsx,.xls" multiple
            :show-file-list="false" :before-upload="beforeUpload" :on-success="fileSuccess" :action="uploadUrl"
            :headers="headers" :data="data">
            <el-icon class="el-icon--upload">
                <upload-filled />
            </el-icon>
            <div class="el-upload__text">
                拖拽文件到此处<em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    只能上传xlsx、xls文件
                </div>
            </template>
        </el-upload>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage, type UploadFile, type UploadFiles } from "element-plus";
import { systemStore } from "../../store";
import { mvImportExlEmits, mvImportExlProps } from "./mvImportExl";

defineOptions({
    name: "MvImportExl"
})

const props = defineProps(mvImportExlProps)
const emit = defineEmits(mvImportExlEmits)

const handleClose = () => {
    emit('update:modelValue', false)
}
const beforeUpload = (file: File) => {
    const fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    if (!fileType.includes(file.type)) {
        ElMessage.error('请上传xlsx/xls文件类型')
        return false
    }
    return true
}

const fileSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    if (response.code == 1) {
        ElMessage.success('导入成功')
        emit('update:modelValue', false)
        emit('success')
    } else {
        ElMessage.error(response.msg)
    }
}

const headers = { "authorization": systemStore.token?.token || '' }
const data = { type: systemStore.systemInfo.projectCode }
</script>
<style lang="scss" scoped>
.mv-import-exl-download {
    margin-top: -20px;

    a {
        text-decoration: none;
        color: var(--el-color-primary);

        &:hover {
            color: var(--el-color-error);
        }
    }
}

.mv-import-exl-upload {
    margin-top: 10px;
}
</style>