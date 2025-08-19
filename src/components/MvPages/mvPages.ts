import type { ExtractPropTypes, PropType } from "vue";
import type { BdPagesInterface } from "./types";

export const mvPagesProps = {
  pages: {
    type: Object as PropType<BdPagesInterface>,
    default: () => ({}),
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 30, 50, 100],
  },
  layout: {
    type: String,
    default: "total,sizes,prev,pager,next,jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  small: {
    type: Boolean,
    default: false,
  },
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },
  isRouter: {
    type: Boolean,
    default: true,
  },
};

export type MvPagesProps = ExtractPropTypes<typeof mvPagesProps>;

export const mvPagesEmits = {
  change: () => true,
  "update:pages": (value: BdPagesInterface) => value,
};
export type MvPagesEmits = typeof mvPagesEmits;
