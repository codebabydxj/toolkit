<template>
    <el-upload v-bind="{ ...$props, ...$attrs }" :headers="headersData" :action="action" accept="fileType" ref="refUpload"
        :data="data" :before-upload="handleBeforeUpload" :on-exceed="handleExceed" :on-remove="handleRemove"
        :on-error="handleUploadError" :limit="limit" :file-list="fileList" :on-success="handleUploadSuccess">
        <template v-if="!$slots.default">
            <template v-if="listType === 'picture-card'">
                <el-icon>
                    <Plus />
                </el-icon>
            </template>
            <template v-else>
                <el-button type="primary">上传文件</el-button>
            </template>
        </template>
        <template v-for="(item, key) in $slots" v-slot:[key]> <!--关键代码，v-slot:[key]为动态插槽名-->
            <slot :name="key"></slot>
        </template>
    </el-upload>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { systemStore } from "../../store";
import { ElMessage, type UploadRawFile } from "element-plus";
import { mvUploadEmits, mvUploadProps } from "./mvUpload";

defineOptions({
    name: "MvUpload",
})

const props = defineProps(mvUploadProps)
const emit = defineEmits(mvUploadEmits)

const data = computed(() => Object.assign({ type: systemStore.systemInfo.projectCode }, props.data));

const headersData = computed(() => Object.assign({ "Authorization": systemStore.token?.token }, props.headers));

const refUpload = ref()
const fileList = computed({
    get: () => props.fileList,
    set: (val) => {
        emit('update:fileList', val)
    }
})

// 删除图片
/**
 * 移除图片
 * @param file
 * @param fileLists
 */
const handleRemove = (file: any, fileLists: any) => {
    console.log(fileList.value);
    const index = fileList.value.map((f: any) => f.name).indexOf(file.name)
    if (index > -1) {
        fileList.value.splice(index, 1)
        emit('success', { fileList: fileList.value, file: file })
    }
}
/**
 * 提交前校验文件大小类型
 * @param rawFile
 */
const handleBeforeUpload = (rawFile: UploadRawFile) => {
    const type = rawFile.name.substring(rawFile.name.lastIndexOf('.'));
    let extension = props.fileType;
    if (extension.indexOf(type.toLowerCase()) == -1) {
        //判断文件后缀名
        ElMessage.error({
            message: '上传文件格式错误，允许上传的格式为：' + extension,
        });
        refUpload.value.clearFiles();
        return false;
    }
    if (props.fileSize) {
        const isLt = Number(rawFile.size) / 1024 / 1024 < props.fileSize  //将文件大小转换成M单位，判断文件大小
        if (!isLt) {
            ElMessage.error(`上传文件大小不能超过 ${props.fileSize} MB!`)
            return false
        }
    }
    return true;
}

// 文件个数超出
const handleExceed = () => {
    ElMessage.error(`上传文件数量不能超过 ${props.limit} 个,请先删除后继续上传!`)
}

/**
 * 上传失败方法
 */
const handleUploadError = () => {
    ElMessage.error('上传失败')
}

/**
 * 上传成功回调
 * @param res
 */
const handleUploadSuccess = (res: any) => {
    if (![0, 1].includes(res.code)) {
        ElMessage.error((`上传失败，原因:${res.msg}!`))
        return
    }
    fileList.value.push({ name: res.name, url: res.url })
    emit('success', {
        fileList: fileList.value,
        file: { name: res.name, url: res.url },
        response: res
    })
}

</script>

<style lang="scss" scoped></style>