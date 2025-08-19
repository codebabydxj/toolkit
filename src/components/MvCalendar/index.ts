import { withInstall } from "@/utils/with-install.ts";

import _MvCalendar from "./MvCalendar.vue";
export const MvCalendar = withInstall(_MvCalendar);
export default MvCalendar;
export type MvCalendarInstance = InstanceType<typeof _MvCalendar>
export * from './mvCalendar.ts'
export * from './types'

declare module 'vue' {
    export interface GlobalComponents {
        MvCalendar: typeof _MvCalendar;
    }
}
