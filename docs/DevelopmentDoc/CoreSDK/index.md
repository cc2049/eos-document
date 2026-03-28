# PASS平台基座

基于 **pnpm monorepo + Vue 3 + Vite + Element Plus** 构建的前端基座方案。
将登录、布局、菜单路由、消息通知、接口封装等公共能力抽成独立的 `@eosine/core-sdk` 包，
业务项目（TMS、WMS 等）安装后只需关注自身业务页面，支持多企业差异化部署。

## 项目目录

```
eos-base-monorepo/
├── packages/
│   ├── cli/                          # 后期开发脚手架使用
│   └── core-sdk/                     # 公共基座（纯 JS，可独立发布为 npm 包）
│       ├── src/
│       │   ├── api/
│       │   │   ├── config/           # 单据设计和配置相关接口
│       │   │   |    ├── index.js     # 1.0 的单据设计
│       │   │   |    └── index-v2.js  # 2.0 的可视化设计器
│       │   │   ├── common/           # 公共接口
│       │   │   |    ├── index.js     # 系统级别公共接口（如：文件下载/全局参数）
│       │   │   |    └── report.js    # 报表接口
│       │   │   ├── developPlatform/  # 开发平台
│       │   │   |    └── index.js     # 开发平台相关接口
│       │   │   ├── system/           # 系统
│       │   │   |    ├── index.js     # 系统相关接口（如：系统参数/系统配置/系统日志）
│       │   │   |    └── ...
│       │   │   ├── tour/             # 新手引导
│       │   │   |    └── index.js     # 新手引导相关接口
│       │   │   ├── workflow/         # 工作流
│       │   │   |    └── index.js     # 工作流相关接口
│       │   ├── assets/               # 静态资源相关
│       │   │   ├── 401_images/       # 401
│       │   │   └── ...
│       │   ├── components/           # 核心组件
│       │   │   ├── SliderVerify      # 滑块验证组件
│       │   │   └── ...               # 其他组件
│       │   ├── hooks/
│       │   │   └── index.js          # createBaseApp() 核心初始化插件
│       │   │   └── ...
│       │   ├── i18n/                 # 多语言
│       │   │   └── cn.js             # 中文
│       │   │   └── ...               # 其他语言
│       │   ├── layout/               # 核心布局相关
│       │   │   └── components        # 布局组件（侧边栏 / 顶部栏 / 面包屑）
│       │   │   └── ...
│       │   ├── plugins/
│       │   │   └── index.js          # 入口文件，提供 createBaseApp() 注册全局插件
│       │   │   └── cache.js          # 缓存插件（如：路由缓存 / 菜单缓存）
│       │   │   └── download.js       # 下载插件（如：文件下载/文件预览）
│       │   │   └── ...
│       │   ├── router/
│       │   │   └── index.js          # 基础路由 + addConstantRoutes()
│       │   │   └── permission.js     # 路由守卫逻辑（鉴权、动态路由懒加载、白名单）
│       │   ├── stores/
│       │   │   └── index.js          # 状态管理（如：登录态 / 权限 / 用户信息）
│       │   │   └── ...
│       │   ├── views/
│       │   │   ├── LoginView.vue     # 登录页（支持租户编码）
│       │   │   └── ...               # 其他页面
│       │   └── index.js              # 库模式对外导出入口
│       ├── vite.config.js
│       └── package.json
├── templates/                        # 集成插件的基础模板
│    ├── src/
│    │   ├── main.js                  # 调用 createBaseApp() 注册路由/菜单
│    │   ├── router/
│    │   │   └── index.js             # TMS 路由 + buildTmsConfig()（企业扩展点）
│    │   └── views/
│    │       └── DashboardView.vue    # TMS 数据概览
│    ├── vite.config.js
│    └── package.json
├── scripts/
|   └── pre-publish-check.js          # 发布前检查脚本（确保所有子项目都已构建）
├── pnpm-workspace.yaml               # 定义 Monorepo 子项目目录
├── .npmrc                            # 全局 私有仓库路径配置
└── package.json                      # Monorepo 根配置
```
