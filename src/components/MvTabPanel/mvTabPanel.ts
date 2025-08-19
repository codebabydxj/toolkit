
import type { ExtractPropTypes, PropType } from "vue"
import type { MvTabPanelOption, MvTabPanelTags } from "./types"

export const mvTabPanelProps = {
    option: {
        type: Object as PropType<MvTabPanelOption>,
        default: () => ({})
    },
    tags: {
        type: Array as PropType<MvTabPanelTags[]>,
        default: () => ([{ label: '公告', api: '/api/notice/cmsArticle/page' }, { label: '通知', api: '/api/notice/cmsMessage/page' }]),
    },
    length: {
        type: Number,
        default: 3
    }
}

export type MvTabPanelProps = ExtractPropTypes<typeof mvTabPanelProps>

export const mvTabPanelEmits = {
    click: (value: any) => value
}
export type MvTabPanelEmits = typeof mvTabPanelEmits
