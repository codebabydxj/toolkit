
import type { ExtractPropTypes, PropType } from "vue"

export const mvTreeSelectProps = {
    modelValue: {
        type: [String, Number, Boolean, Object]
    },
    dictCode: {
        type: String,
        default: ''
    },
    option: {
        type: Object,
        default: () => ({})
    },
    expandedLevel: {
        type: Number,
        default: 0
    },
    getOptionData: {
        type: Function as PropType<() => Promise<any>>,
        default: () => []
    }
}

export type MvTreeSelectProps = ExtractPropTypes<typeof mvTreeSelectProps>

export const mvTreeSelectEmits = {
    'update:modelValue': (value: any) => value
}
export type MvTreeSelectEmits = typeof mvTreeSelectEmits
