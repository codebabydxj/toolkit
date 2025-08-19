import type { ExtractPropTypes } from "vue"

export const mvAlertProps = {
    title: {
        type: String,
    },
    info: {
        type: String,
    },
}

export const mvAlertEmits = {
    cancel: () => true,
}


export type MvAlertProps = ExtractPropTypes<typeof mvAlertProps>
export type MvAlertEmits = typeof mvAlertEmits