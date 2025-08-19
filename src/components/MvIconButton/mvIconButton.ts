
import type { ExtractPropTypes, PropType } from "vue"
import type { MvIconButtonIconType } from "./types"

export const mvIconButtonProps = {
    icon: {
        type: String,
        default: ""
    },
    iconType: {
        type: String as PropType<MvIconButtonIconType>,
        default: 'iconFont'
    },
    iconSize: {
        type: Number,
        default: 32
    },
    color: {
        type: String,
        default: ''
    }
}

export type MvIconButtonProps = ExtractPropTypes<typeof mvIconButtonProps>

export const mvIconButtonEmits = {

}
export type MvIconButtonEmits = typeof mvIconButtonEmits
