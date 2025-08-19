
import type { ExtractPropTypes, PropType } from "vue"
import type { MvProjectProgressColorOption } from "./types"

export const mvProjectProgressProps = {
    businessId: {
        type: [String, Number],
        default: 1
    },
    tableName: {
        type: String,
        default: ''
    },
    current: {
        type: [String, Number],
        default: 0
    },
    apiUrl: {
        type: String,
        default: '/api/flow/btProjectRate/list',
    },
    colorOption: {
        type: Object as PropType<MvProjectProgressColorOption>,
        default: () => ({})
    },
}

export type MvProjectProgressProps = ExtractPropTypes<typeof mvProjectProgressProps>

export const mvProjectProgressEmits = {
    dotClick: (value: any) => value
}
export type MvProjectProgressEmits = typeof mvProjectProgressEmits
