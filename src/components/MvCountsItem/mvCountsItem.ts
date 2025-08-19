import type { ExtractPropTypes, PropType } from "vue";
import type { CountsInstance } from "./types";

export const mvCountsItemProps = {
    unitEqual: {
        type: Boolean,
        default: false
    },
    center: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object as PropType<CountsInstance>,
        default: () => ([])
    },
    iconSize: {
        type: Number,
        default: 80
    }
}

export type MvCountsItemProps = ExtractPropTypes<typeof mvCountsItemProps>