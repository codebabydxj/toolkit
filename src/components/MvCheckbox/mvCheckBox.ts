import type { ExtractPropTypes, PropType } from "vue"

export const mvCheckboxProps = {
    modelValue: {
        type: Array as PropType<Record<string, any>[]>,
        default: () => ([])
    },
    dictCode: {
        type: String,
        required: true,
    }
}

export type MvCheckboxProps = ExtractPropTypes<typeof mvCheckboxProps>