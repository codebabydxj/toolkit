
import { withInstall } from '@/utils/with-install'
import _MvImportExl from './MvImportExl.vue'
export const MvImportExl = withInstall(_MvImportExl)
export default MvImportExl
export * from './mvImportExl'
export type MvImportExlInstance = InstanceType<typeof _MvImportExl>

declare module 'vue' {
    export interface GlobalComponents {
        MvImportExl: typeof _MvImportExl
    }
}
