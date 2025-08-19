/** @type {import('vite').UserConfig} */
import { defineConfig, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import { resolve } from "path";

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(({ command, mode }: UserConfig) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      dts({
        cleanVueFileName: true,
        insertTypesEntry: true,
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
      // 忽略后缀名的配置项
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.node', '.scss'],
    },
    server: {
      host: '0.0.0.0',
      cors: true,
      port: 5177,
      proxy: {
        "/onLineComponents": {
          target: env.VITE_PROXY,
          changeOrigin: true,
        },
        "/api": {
          target: env.VITE_PROXY,
          changeOrigin: true,
        },
        "/file_download": {
          target: env.VITE_PROXY,
          changeOrigin: true,
        },
      },
    },
    // 设置scss的api类型为modern-compiler
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',  // 修改api调用方式
        }
      }
    },
    build: {
      target: "modules",
      minify: true,
      emptyOutDir: true,
      rollupOptions: {
        // 忽略打包vue文件
        external: [
          "vue",
          "pinia",
          "axios",
          "element-plus",
          "vue-router",
          "crypto-js",
          "sass",
          "@nuxt/toolkit",
          "dayjs",
          "lodash",
        ],
      },
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        formats: ["es", "cjs", "umd"],
        name: "toolkit",
        fileName: "index",
      },
    },
  };
});
