## 宝塔面板

https://192.168.0.250:31937/18ead7d5
yun3d/Dayu_1688

## odoo18接口文档

http://192.168.0.111:8999/api/docs
admin/admin

收货地址查找
isEditModalOpen
保存111

## 自己笔记

## 大宇3D前端pc框架

主要使用的技术栈:

- [Vite 5](https://vitejs.dev/guide/)
- [React18](https://react.docschina.org/)
- [React Router dom 6](https://reactrouter.com/en/main) 路由
- [zustand](https://github.com/pmndrs/zustand): 状态管理
- [ant design 5.0](https://ant.design/index-cn) 阿里ui组件库
- [tailwind](https://tailwindcss.com/) css库
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - 常用api自动导入

### 文件结构

1. 所有组件入口: src/views, 所有组件放在各自目录下,目录首字母大写

```tsx
// 组件名称命名 语义化名称+开发者姓名首字母, 方便定位维护
function HeaderXzz() {}
function FooterCyx() {}
```

2. 状态管理: src/store
3. 网络请求: src/network
4. 国际化: src/locales
5. 路由: src/router

**拉取代码之前需提前设置**

```bash
git config --global core.autocrlf false
```

### 运行

> 脚手架使用pnpm进行包管理

1. 执行 `npm install -g pnpm` 安装pnpm

2. 执行`pnpm install` 等待依赖库安装完成

3. 执行`pnpm dev` 进行开发

### 代码提交规范

> 1. 提交类型type必填, 子主题subject必填, 作用范围scope及其他属性选填,
> 2. type类型: `build` `chore` `ci` `docs` `feat` `fix` `perf` `refactor` `revert` `style` `test`
>    feat： 新增 feature
>    fix: 修复 bug
>    docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
>    style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
>    refactor: 代码重构，没有加新功能或者修复 bug
>    perf: 优化相关，比如提升性能、体验
>    test: 测试用例，包括单元测试、集成测试等
>    chore: 改变构建流程、或者增加依赖库、工具等
>    revert: 回滚到上一个版本

```bash
<type>(<scope>): <subject> (<BLANK LINE> <body> <BLANK LINE> <footer>)
# 示例
git commit -m "style(global): 移除多余文件"
git commit -m "feat(global): 新增header组件"
```

### 注意

- node版本>=18, 推荐>20

- 开发除了src/views目录,其他目录为功能封装文件,尽可能不改动
- 尽可能少引入外部依赖库
- css写法有2种 `module.scss` 和 `tailwind`
