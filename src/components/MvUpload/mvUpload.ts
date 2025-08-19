import type { ExtractPropTypes, PropType } from "vue";
import type { MvUploadListType } from "./types";

export const mvUploadProps = {
  modelValue: {
    type: Array,
  },
  action: {
    type: String,
    default: "/api/file/upload/fileUpload",
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  headers: {
    type: Object,
    default: () => ({}),
  },
  listType: {
    type: String as PropType<MvUploadListType>,
    default: "text",
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: String,
    default: () =>
      ".png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.rar,.zip",
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5,
  },
  // 图片数量限制
  limit: {
    type: Number,
    default: 1,
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true,
  },
  fileList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
};

export type MvUploadProps = ExtractPropTypes<typeof mvUploadProps>;

export const mvUploadEmits = {
  success: (value: any) => value,
  "update:fileList": (value: any) => value,
};
export type MvUploadEmits = typeof mvUploadEmits;
