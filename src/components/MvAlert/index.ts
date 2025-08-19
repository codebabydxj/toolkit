import { withInstall } from "../../utils/with-install";

import _MvAlert from './MvAlert.vue'
export const MvAlert = withInstall(_MvAlert)
export default MvAlert
export * from './mvAlert'
export type MvAlertInstance = InstanceType<typeof _MvAlert>
declare module 'vue' {
    export interface GlobalComponents {
        MvAlert: typeof _MvAlert;
    }
}