
import type { ExtractPropTypes, PropType } from "vue"

export const mvImportExlProps = {
    modalValue: {
        type: Boolean,
        default: false
    },
    downloadUrl: {
        type: String,
        default: ''
    },
    uploadUrl: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: '上传文件'
    },
    limit: {
        type: Number,
        default: 1
    },
}

export type MvImportExlProps = ExtractPropTypes<typeof mvImportExlProps>

export const mvImportExlEmits = {
    "update:modelValue": (value: boolean) => value,
    success: () => true
}
export type MvImportExlEmits = typeof mvImportExlEmits
