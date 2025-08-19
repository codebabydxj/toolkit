
import type { ExtractPropTypes, PropType } from "vue"

export const mvGapProps = {
    width: {
        type: [String, Number],
        default: 0,
    },
    height: {
        type: [String, Number],
        default: 0,
    },
}

export type MvGapProps = ExtractPropTypes<typeof mvGapProps>