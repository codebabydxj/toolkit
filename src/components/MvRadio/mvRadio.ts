
import type { ExtractPropTypes, PropType } from "vue"

export const mvRadioProps = {
    modelValue: {
        type: [String, Number]
    },
    dictCode: {
        type: String,
        default: ""
    },
    button: {
        type: Boolean,
        default: false
    }
}

export type MvRadioProps = ExtractPropTypes<typeof mvRadioProps>

export const mvRadioEmits = {

}
export type MvRadioEmits = typeof mvRadioEmits
