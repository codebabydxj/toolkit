import type { ExtractPropTypes, PropType } from "vue";
import type { EmptyModeType } from "./types";

export const mvEmptyProps = {
    mode: {
        type: String as PropType<EmptyModeType>,
        default: 'NoData'
    },
    text: {
        type: String,
        default: '暂无内容'
    },
    width: {
        type: [String, Number],
        default: '100%'
    },
    height: {
        type: [String, Number],
        default: '100%'
    }
}

export type MvEmptyProps = ExtractPropTypes<typeof mvEmptyProps>