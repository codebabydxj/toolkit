import type { ExtractPropTypes, PropType } from "vue";

export const mvEditorProps = {
  modelValue: {
    type: String,
    default: "",
  },
  height: {
    type: [Number, String],
    default: 300,
  },
  action: {
    type: String,
    default: "/api/file/upload/fileUpload",
  },
  fieldName: {
    type: String,
    default: "file",
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024,
  },
  placeholder: {
    type: String,
    default: "请输入内容...",
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: "default",
  },
};

export type MvEditorProps = ExtractPropTypes<typeof mvEditorProps>;

export const mvEditorEmits = {
  change: () => true,
  "update:modelValue": (value: string) => value,
};
export type MvEditorEmits = typeof mvEditorEmits;
