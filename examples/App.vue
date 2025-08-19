<template>
  <div>
    <router-view v-if="route.meta.isFullPage"></router-view>
    <micro-layout :routes="menus" :userInfo="userInfo" :fullPath="defaultActive" v-else></micro-layout>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { routes } from "./router";
import { areaCodeToCodeList, client, actions } from "../src/index";
import { systemStore } from "../src/store";

const route = useRoute();
const defaultActive = computed(() => route.fullPath);
const menus = routes;
const userInfo = {};
</script>

<style lang="scss" scoped></style>
