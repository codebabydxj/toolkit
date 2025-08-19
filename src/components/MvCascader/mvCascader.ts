import type { ExtractPropTypes, PropType } from "vue";
import type { CascaderOption } from "./types";

export type MvCascaderFn = (code: string) => string

export const mvCascaderProps = {
    modelValue: {
        type: [String, Number, Array],
    },
    defaultCode: {
        type: [Number, String],
        default: ''
    },
    option: {
        type: Object as PropType<CascaderOption>,
        default: () => ({})
    },
    getData: {
        type: Function as PropType<(code: string | number) => Promise<Record<string, any>>>,
        required: true
    }
}

export type MvCascaderProps = ExtractPropTypes<typeof mvCascaderProps>