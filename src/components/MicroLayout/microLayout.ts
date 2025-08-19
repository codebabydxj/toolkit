import type { ExtractPropTypes, PropType } from "vue"
import type { UserInfoInstance } from "./types"

export const microLayoutProps = {
    routes: {
        type: Array as PropType<Record<string, any>>,
        required: true,
        default: []
    },
    userInfo: {
        type: Object as PropType<UserInfoInstance>,
        required: true,
        default: () => ({})
    },
    fullPath: {
        type: String,
        default: ''
    }
}

export type MicroLayoutProps = ExtractPropTypes<typeof microLayoutProps>

export const microLayoutEmits = {
    back: () => true,
}
export type MicroLayoutEmits = typeof microLayoutEmits