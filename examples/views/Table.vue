<template>
  <div>
    <table-controller v-model:column="column">
    </table-controller>
    <el-table :data="tableData" ref="tableRef">
      <template v-for="item in column">
        <el-table-column v-bind="item" v-if="!item.hidden"></el-table-column>
      </template>
    </el-table>
    <mv-pages :pages="pages" :total="total" :router="isRouter"></mv-pages>
    {{ pages }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useMvPages, client } from '../../src'
import { dayjs } from "element-plus";

export default defineComponent({
  setup() {
    const { pages, total, isRouter } = useMvPages(true)

    interface ColumnType {
      label: string,
      prop: string,
      fixed?: string | boolean,
      formatter?: (row: any, column: any, cellValue: any, index: any) => {}
      disabled?: boolean
      hidden?: boolean
    }

    const column = ref<ColumnType[]>([
      {
        label: 'Date', prop: 'date', formatter: (row: any, column: any, cellValue: any, index: any) => {
          // console.log(row, column, cellValue, index)
          return dayjs(cellValue).format('YYYY-MM-DD')
        },
        disabled: true
      },
      { label: 'Name', prop: 'name' },
      { label: 'Address', prop: 'address' },
    ])

    const tableData = ref([
      { label: 'date', address: 'asdfasdfdsfdsf' },
      { label: 'date', address: 'asdfasdfdsfdsf' },
      { label: 'date', address: 'asdfasdfdsfdsf' },
      { label: 'date', address: 'asdfasdfdsfdsf' },
      { label: 'date', address: 'asdfasdfdsfdsf' },
      { label: 'date', address: 'asdfasdfdsfdsf' },
      { label: 'date', address: 'asdfasdfdsfdsf' },
    ])

    total.value = 100

    const getList = async () => {
      try {
        const res = await client.post("/list", { ...pages.value }, {}, true)
        console.log(res)
        tableData.value = res.data.list
        total.value = res.data.total
      } catch (error) {

      }
    }

    // getList()
    const change = (data: Record<string, any>) => {
      // console.log(data)
    }

    const tableRef = ref()
    onMounted(() => {
      console.log(tableRef.value.$slots.default()[0].children)
    })
    return { tableData, column, pages, total, change, isRouter, tableRef }
  }
});
</script>

<style lang="scss" scoped></style>