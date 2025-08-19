import type { ExtractPropTypes, PropType } from "vue";
import type { TableSizeType } from "./types";

export const tableControllerProps = {
  tableSize: {
    type: String as PropType<TableSizeType>,
    default: "default",
  },
  column: {
    type: Array as PropType<Record<string, any>[]>,
    required: true,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
};

export type TableControllerProps = ExtractPropTypes<
  typeof tableControllerProps
>;

export const tableControllerEmits = {
  "update:tableSize": (value: string) => value,
  refresh: () => true,
  changeHidden: (value: any) => value,
};
export type TableControllerEmits = typeof tableControllerEmits;
