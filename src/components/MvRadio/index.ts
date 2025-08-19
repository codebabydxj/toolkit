
import { withInstall } from '@/utils/with-install'
import _MvRadio from './MvRadio.vue'
export const MvRadio = withInstall(_MvRadio)
export default MvRadio
export * from './mvRadio'
export type MvRadioInstance = InstanceType<typeof _MvRadio>

declare module 'vue' {
    export interface GlobalComponents {
        MvRadio: typeof _MvRadio
    }
}
