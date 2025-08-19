<template>
  <div class="mv-alert">
    <slot name="icon">
      <el-icon color="var(--el-color-primary)"><info-filled /></el-icon>
    </slot>
    <div class="mv-alert-title">{{ title }}</div>
    <div class="mv-alert-info">{{ info }}</div>
    <a class="mv-alert-link" @click="cancel" v-if="info">取消选择</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mvAlertProps, mvAlertEmits } from "./mvAlert";

export default defineComponent({
  name: 'MvAlert',
  props: mvAlertProps,
  emits: mvAlertEmits,
  setup(props, { emit }) {
    const cancel = () => {
      emit("cancel");
    };
    return { cancel };
  }
});
</script>
<style scoped lang="scss">
.mv-alert {
  border: 1px solid #91d5ff;
  background: var(--el-color-primary-light-8);
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 10px;

  &-title {
    font-size: 14px;
    margin-left: 10px
  }

  &-info {
    margin-right: 20px;
    font-size: 14px
  }

  &-link {
    font-size: 14px;
    color: var(--el-color-primary);
    cursor: pointer;

    &:hover {
      text-decoration: underline
    }
  }
}
</style>