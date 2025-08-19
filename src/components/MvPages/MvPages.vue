<template>
    <el-pagination style="justify-content: end" :small="small" :background="background" :layout="layout" :total="total"
        :currentPage="pages.page" :pageSize="pages.size" :page-sizes="pageSizes" :hideOnSinglePage="hideOnSinglePage"
        @current-change="currentChange" @size-change="sizeChange"></el-pagination>
</template>
  
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mvPagesEmits, mvPagesProps } from "./mvPages";

defineOptions({
    name: "MvPages",
})

const props = defineProps(mvPagesProps)
const emit = defineEmits(mvPagesEmits)

const router = useRouter()
const route = useRoute()
const pages = computed(() => props.pages)

const currentChange = async (page: number) => {
    if (props.isRouter) {
        await router.push({
            path: route.fullPath,
            query: {
                ...route.query,
                page: page,
            }
        })
    } else {
        pages.value.page = page
    }
    emit("change")
}
const sizeChange = (size: number) => {
    pages.value.size = size
    emit("update:pages", pages.value)
    emit("change")
}
</script>
  
<style scoped lang="scss"></style>