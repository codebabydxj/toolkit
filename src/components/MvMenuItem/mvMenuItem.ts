import type { ExtractPropTypes, PropType } from "vue";

export const mvMenuItemPorps = {
    list: {
        type: Array as PropType<Record<string, any>>
    }
}

export type MvMenuItemProps = ExtractPropTypes<typeof mvMenuItemPorps>