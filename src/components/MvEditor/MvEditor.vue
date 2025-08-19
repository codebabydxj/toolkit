<template>
    <div class="mv-editor">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor :style="{ height, 'overflow-y': 'hidden' }" v-model="valueHtml" :defaultConfig="editorConfig" mode="simple"
            @onCreated="handleCreated" />
    </div>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { computed, onBeforeUnmount, ref, shallowRef } from "vue";
import { ElMessage } from 'element-plus';
import { systemStore } from '@/store';
import { mvEditorProps, mvEditorEmits } from './MvEditor';
import type { InsertFnType } from './types'
import '@wangeditor/editor/dist/css/style.css';
import { apiConfig } from '@/api/apiConfig';

defineOptions({
    name: 'MvEditor'
})

const props = defineProps(mvEditorProps)
const emit = defineEmits(mvEditorEmits)
const valueHtml = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const height = computed(() => isNaN(Number(props.height)) ? props.height : (props.height + 'px'))
const editorRef = shallowRef()
const toolbarConfig = {}
const token: string | null =
    localStorage.getItem(apiConfig.tokenName) ||
    sessionStorage.getItem(apiConfig.tokenName);

let localToken: string | null = null;
if (token !== null) {
    localToken = JSON.parse(token).token;
}
const editorConfig = {
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    MENU_CONF: {
        uploadImage: {
            server: props.action,
            timeout: 5 * 1000, // 5s
            fieldName: props.fieldName,
            meta: Object.assign({
                type: systemStore.systemInfo.projectCode
            }, props.data),
            headers: {
                Authorization: localToken ?? "",
            },
            metaWithUrl: false,
            maxFileSize: props.maxFileSize, // 10M
            onBeforeUpload(file: any) {
                return file
            },
            onProgress(progress: any) {
                console.log('onProgress', progress)
            },
            onSuccess(file: any, res: any) {
                console.log('onSuccess', file, res)
            },
            onFailed(file: any, res: any) {
                console.log('onFailed', file, res)
            },
            onError(file: any, err: any, res: any) {
                console.error('onError', file, err, res)
            },
            customInsert(res: any, insertFn: InsertFnType) {                  // JS 语法
                const { url: href, name: alt, pictureUrl: url } = res
                insertFn(url, alt, href)
            },
        },
        uploadVideo: {
            server: props.action,
            timeout: 5 * 1000, // 5s
            fieldName: props.fieldName,
            meta: Object.assign({
                type: systemStore.systemInfo.projectCode
            }, props.data),
            headers: {
                Authorization: localToken ?? "",
            },
            metaWithUrl: false,
            maxFileSize: props.maxFileSize, // 10M
            onBeforeUpload(file: any) {
                let fileObj = (Object.values(file)[0] as any).data
                // 判断视频大小
                let isLt = fileObj.size < props.maxFileSize // 判断是否小于最大值
                if (!isLt) {
                    ElMessage.warning(`视频大小不能超过${props.maxFileSize / 1024 / 1024}M! 请重新上传`)
                }

                if (!isLt) {
                    return false
                } else {
                    return file
                }
            },
            onProgress(progress: any) {
                console.log('onProgress', progress)
            },
            onSuccess(file: any, res: any) {
                console.log('onSuccess', file, res)
            },
            onFailed(file: any, res: any) {
                console.log('onFailed', file, res)
            },
            onError(file: any, err: any, res: any) {
                ElMessage.error(`错误原因：${err}`);
                console.error('onError', file, err, res)
            },
            customInsert(res: any, insertFn: InsertFnType) {
                const { url: href, name: alt, pictureUrl: url } = res
                insertFn(url, alt, href)
            },
        }
    }
}
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>

<style lang="scss" scoped>
.mv-editor {
    border: 1px solid var(--el-border-color);
    border-radius: 5px;
    overflow: hidden;
    transition: border .3s;

    &:focus-within {
        border: 1px solid var(--el-color-primary)
    }


}


:deep(h6, .h6) {
    font-size: 0.67rem;
}

:deep(h5, .h5) {
    font-size: 0.83rem;
}

:deep(h4, .h4) {
    font-weight: bold;
}

:deep(h3, .h3) {
    font-size: 1.17rem;
    font-weight: bold;
}

:deep(h2, .h2) {
    font-size: 1.5rem;
    font-weight: bold;
}

:deep(h1, .h1) {
    font-size: 2rem;
    font-weight: bold;
}

:deep(i) {
    font-style: italic
}

:deep(.w-e-toolbar .w-e-menu i) {
    font-style: normal;
}

:deep(ol) {
    list-style-type: decimal;
}

/* ul ol 样式 */
:deep(ol) {
    margin: 10px 0 10px 22px;
    list-style-type: decimal;
}

:deep(ul) {
    margin: 10px 0 10px 22px;
    list-style-type: disc;
}

/* table 样式 */
:deep(table) {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
}

:deep(table td),
:deep(table th) {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
    height: 32px;
}

:deep(table th) {
    border-bottom: 2px solid #ccc;
    text-align: center;
    background-color: #f1f1f1;
}

/* blockquote 样式 */
:deep(blockquote) {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    min-height: 24px;
    font-size: 100%;
    background-color: #f1f1f1;
}

/* code 样式 */
:deep(code) {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
}

:deep(pre code) {
    display: block;
}

:deep(a) {
    // text-decoration: underline;
    color: #5592e5;
}
</style>
