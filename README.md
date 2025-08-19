# toolkit
下一代工具库


### 发布npm 🧩

```text
- package.json                 修改 version 发布版本
- yrm use npm                  切换源
- npm run build                打包
- npm publish                  发布
- npm publish --access public  私有包发布
```

### NPM组件私有化 🧩

```text
- 如果不想发布到NPM上，而仅供内部使用，可以执行如下命令
- npm run build      打包
- npm pack           生成包

- npm pack 之后，就会在当前目录下生成 一个 vue-ruler-tool-1.0.0.tgz 的文件打开一个新的vue项目，将 vue-ruler-tool-1.0.0.tgz 放到目录中，在当前路径下执行

- npm install vue-ruler-tool-1.0.0.tgz
```