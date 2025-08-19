import type { ExtractPropTypes, PropType } from "vue";
import {MvCalendarSize, MvCalendarType} from "./types.ts";



export const mvCalendarProps = {
    type: {
        type: String as PropType<MvCalendarType>,
        default: 'line'
    },
    dayHeight: {
        type: String,
        default: '30px'
    },
    maxLine: {
        type: Number,
        default: 0
    },
    dayFontSize: {
        type: String,
        default: '14px'
    },
    contentFontSize: {
        type: String,
        default: ''
    },
    size: {
        type: String as PropType<MvCalendarSize>,
        default: ''
    },
    appendToBody: {
        type: Boolean,
        default: false
    }
}

export type MvCalendarProps = ExtractPropTypes<typeof mvCalendarProps>
