import type { ExtractPropTypes } from "vue"

export const mvCountsProps = {
    gutter: {
        type: Number,
        default: 20
    }
}

export type MvCountsProps = ExtractPropTypes<typeof mvCountsProps>