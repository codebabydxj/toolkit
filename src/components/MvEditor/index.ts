import { withInstall } from "@/utils/with-install";
import _MvEditor from "./MvEditor.vue";
export const MvEditor = withInstall(_MvEditor);
export default MvEditor;
export * from "./MvEditor";
export * from "./types";
export type MvEditorInstance = InstanceType<typeof _MvEditor>;

declare module "vue" {
  export interface GlobalComponents {
    MvEditor: typeof _MvEditor;
  }
}
