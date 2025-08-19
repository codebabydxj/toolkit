
import type { ExtractPropTypes, PropType } from "vue"

// @ts-ignore
export const mvSelectProps = {
    modelValue: {
        type: [String, Number, Boolean, Object]
    },
    dictCode: {
        type: String,
        default: ""
    },
    allOption: {
        type: Boolean,
        default: false
    },
    getOptionData: {
        type: Function as PropType<() => Promise<any>>,
        default: () => {}
    }
}

export type MvSelectProps = ExtractPropTypes<typeof mvSelectProps>

export const mvSelectEmits = {

}
export type MvSelectEmits = typeof mvSelectEmits
