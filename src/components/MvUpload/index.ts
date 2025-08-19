import { withInstall } from '@/utils/with-install'

import _MvUpload from './MvUpload.vue'
export const MvUpload = withInstall(_MvUpload)
export default MvUpload
export type { MvUploadProps, MvUploadEmits } from './mvUpload'
export type { MvUploadListType } from './types'
export type MvUploadInstance = InstanceType<typeof _MvUpload>

declare module 'vue' {
    export interface GlobalComponents {
        MvUpload: typeof _MvUpload
    }
}