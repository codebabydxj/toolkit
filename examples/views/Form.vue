<template>
  <el-card>
    <el-form :model="form" :rules="formRules" ref="formRef">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
<!--      <el-form-item label="下拉url" prop="name">-->
<!--        <mv-select v-model="form.value" :getOptionData="()=>getOptionData('/api/user/role/getDepartRoleList')"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="下拉项目" prop="name">-->
<!--        <mv-select v-model="form.value" dictCode="category_type" />-->
<!--      </el-form-item>-->
      <el-form-item label="树url" prop="name">
        <mv-tree-select v-model="form.value1" :getOptionData="()=>getTree('/api/category/mgr/getCategoryListTree')" :expandedLevel="0" />
      </el-form-item>
<!--      <el-form-item label="级联菜单" prop="name">-->
<!--        <mv-cascader v-model="form.value2" defaultCode="默认参数" :getData="()=> getTree('/api/category/mgr/getCategoryListTree')" :option="{}" />-->
<!--      </el-form-item>-->
      <el-form-item label="文件" prop="file">
        <mv-upload style="width: 100%" fileType=".doc,.docx,.png,.jpg,.xls,.xlsx,.pdf" :limit="2" @success="handleUploadSuccess"
          :fileSize="2">
          <template #tip>
            <div class="el-upload__tip">
              只能上传.png,.jpg,.xls,.xlsx,.pdf文件，且大小不超过2M
            </div>
          </template>
        </mv-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit(formRef)">提交</el-button>
      </el-form-item>
    </el-form>
    <mv-counts>
      <mv-counts-item :data="{ label: '年度预算总资金', value: '294992.45', unit: '元' }" center unitEqual></mv-counts-item>
    </mv-counts>
  </el-card>
  <router-view></router-view>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {fv} from "../../dist/";

import type {FormInstance} from "element-plus";
import {arrToDict, client, listToTree, treeToList} from "../../src";

export default defineComponent({
  setup() {
    const formRef = ref<FormInstance>();
    const form = reactive({
      name: "",
      file: '',
      value: '',
      value1: '',
      value2: ''
    });
    const formRules = reactive({
      name: [fv.isRequired({ msg: "请输入用户名" }), {
        validator: () => {
        }
      }],
      file: [fv.isRequired({ msg: "请选择文件" }), {
        validator: () => {
        }
      }],
    });

    // openNewProject('https://www.baidu.com/docs')
    const submit = async (formEl: FormInstance | undefined) => {
      console.log(form);
      // console.log(formEl);
      try {
        const valid = await formEl?.validate((valid) => {
          return valid;
        });
        // console.log(valid);
        // await formEl?.validate((valid, fields) => {
        //     console.log(valid)
        // })
      } catch (error) {
        console.log(error);
      }

    };

    //图片上传成功方法
    const handleUploadSuccess = (filelist: any) => {
      console.log(filelist);
      form.file = filelist
    }

   //  下拉事件url
   const getOptionData = (url?: string, type?: any) =>{
      return new Promise(async (resolve, reject) => {
        const res = await client[!type||type===1 ? 'post': 'get'](url,{
          departIds: ['1', "21401"]
        })
        resolve(arrToDict(res.data, 'id', 'roleName'))
      })
   }

    // const getTree = (url?: string, type?: any) =>{
    //   console.log(url);
    //   return new Promise(async (resolve, reject) => {
    //     const res = await client[!type||type===1 ? 'post': 'get'](url)
    //     console.log(res)
    //     const data = treeToList(res.data, 'children').map(item=> {
    //       item.label = item.categoryName;
    //       item.value = item.id
    //       return item
    //     })
    //     resolve(listToTree (data, 'id', 'parentId'))
    //   })
    // }

    const getTree = (url?: string, type?: any) =>{
      console.log(url);
      return new Promise(async (resolve, reject) => {
        const res = await client[!type||type===1 ? 'post': 'get'](url)
        console.log(res)
        const data = treeToList(res.data, 'children').map(item=> {
          item.label = item.categoryName;
          item.value = item.id
          return item
        })
        resolve(listToTree (data.filter(item => item.categoryName !== '无'), 'id', 'parentId'))
      })
    }

   return { formRef, form, formRules, submit, handleUploadSuccess,getOptionData,getTree };
  }
});
</script>

<style lang="scss" scoped></style>