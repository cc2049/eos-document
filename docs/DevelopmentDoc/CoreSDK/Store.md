# Store 状态管理模块

基于 [Pinia](https://pinia.vuejs.org/) 实现的全局状态管理，集成了 `pinia-plugin-persistedstate` 持久化插件。

## 目录结构

```
store/
├── index.js          # Pinia 实例创建与持久化插件注册
└── modules/
    ├── app.js        # 应用布局（侧边栏、设备类型、尺寸）
    ├── dict.js       # 数据字典缓存
    ├── filedown.js   # 文件下载列表
    ├── global.js     # 全局参数（全屏、分辨率）
    ├── modal.js      # 全局弹窗状态
    ├── page.js       # 页面参数传递
    ├── permission.js # 权限路由（框架内部使用）
    ├── settings.js   # 系统设置（框架内部使用）
    ├── sysGlobal.js  # 系统全局配置
    ├── tagsView.js   # 标签页视图
    ├── user.js       # 用户信息与登录状态
    └── workflow.js   # 工作流状态
```

## 使用方式

### 1. 安装依赖

```bash
pnpm add @eosine/core-sdk
```

> 所有Modules均通过 `@eosine/core-sdk` 包统一导出。

### 2. 在组件中使用

```vue
<script setup>
import {
  useUserStore,
  useAppStore,
  useDictStore,
  useGlobalDataStore,
  useModalStore,
  usePageParamsStore,
  useSysGlobalStore,
  useTagsViewStore,
  filedownStore,
} from '@eosine/core-sdk';

const userStore = useUserStore();
const appStore = useAppStore();
const dictStore = useDictStore();
</script>
```

### 3. 其他处使用（如main.js）

在项目入口文件（`main.js`）中引入并安装 Pinia 实例：

```js
import { createApp } from 'vue';
import { createBaseApp, useUserStore } from '@eosine/core-sdk';
import App from './App.vue';

/**
 * pinia 实例由 createBaseApp 返回，Pinia 会在框架初始化阶段自动安装，无需手动注册
 */
export const { pinia } = createBaseApp(app, {
  appName: 'TMS 运输管理系统',
  appKey: 'tms',
  ...
});
const userStore = useUserStore(pinia);
```

### 4. 典型使用示例

#### 获取当前用户信息

```js
const userStore = useUserStore();

// 触发登录
await userStore.login({
  LOGINTYPE: 'captcha',
  username: 'admin',
  password: '123456',
  uuid: 'xxx',
  code: '1234',
});

// 获取用户信息
await userStore.getInfo();
console.log(userStore.name, userStore.userInfo);
```

#### 读取 / 写入数据字典

```js
const dictStore = useDictStore();

// 缓存字典
dictStore.setDict('sys_user_sex', [
  { value: '0', label: '男' },
  { value: '1', label: '女' },
]);

// 读取字典
const sexList = dictStore.getDict('sys_user_sex');

// 清除单个字典
dictStore.removeDict('sys_user_sex');
```

#### 控制全局弹窗

```js
const modalStore = useModalStore();

// 打开弹窗
modalStore.setModal({
  title: '新增用户',
  type: 'addUser',
  menuID: 'menu_001',
  config: {
    /* 传入弹窗所需数据 */
  },
});

// 关闭弹窗
modalStore.close();
```

#### 跨页面传递参数

```js
const pageStore = usePageParamsStore();

// 页面 A：写入参数
pageStore.setPageBillNo({ menuPath: '/order/list', menuParams: { billNo: 'SO2024001' } });

// 页面 B：读取参数
const params = pageStore.pageBillNo['/order/list'];
console.log(params.billNo); // 'SO2024001'
```

#### 管理文件下载进度

```js
const dlStore = filedownStore();

// 添加/更新下载任务
dlStore.setDown({ path: '/files/report.xlsx', downProgress: 60 });

// 完成后移除
dlStore.delDown('/files/report.xlsx');
```

## 各模块说明

### useAppStore — 应用布局状态

管理侧边栏展开/收起、设备类型、UI 尺寸。

| 状态             | 类型      | 说明                              |
| ---------------- | --------- | --------------------------------- |
| `sidebar.opened` | `boolean` | 侧边栏是否展开（持久化到 Cookie） |
| `sidebar.hide`   | `boolean` | 侧边栏是否隐藏                    |
| `device`         | `string`  | 设备类型（`desktop` / `mobile`）  |
| `size`           | `string`  | UI 尺寸（持久化到 Cookie）        |

| 方法                                 | 说明                |
| ------------------------------------ | ------------------- |
| `toggleSideBar(withoutAnimation)`    | 切换侧边栏展开/收起 |
| `closeSideBar({ withoutAnimation })` | 关闭侧边栏          |
| `toggleDevice(device)`               | 切换设备类型        |
| `setSize(size)`                      | 设置 UI 尺寸        |
| `toggleSideBarHide(status)`          | 设置侧边栏隐藏状态  |

---

### useDictStore — 数据字典缓存

在内存中缓存从接口获取的字典数据，避免重复请求。

| 方法                  | 说明                |
| --------------------- | ------------------- |
| `getDict(key)`        | 按 key 获取字典值   |
| `setDict(key, value)` | 写入字典数据        |
| `removeDict(key)`     | 删除指定 key 的字典 |
| `cleanDict()`         | 清空所有字典缓存    |

---

### filedownStore — 文件下载列表

管理后台文件下载任务列表及进度。

| 状态       | 类型     | 说明                                            |
| ---------- | -------- | ----------------------------------------------- |
| `downList` | `Array`  | 下载中的文件列表，每项含 `path`、`downProgress` |
| `downErr`  | `string` | 下载错误信息                                    |

| 方法            | 说明                                             |
| --------------- | ------------------------------------------------ |
| `setDown(data)` | 新增或更新某文件的下载进度（以 `path` 为唯一键） |
| `delDown(path)` | 从列表中移除已完成/失败的任务                    |

---

### useGlobalDataStore — 全局参数

存储全屏状态和屏幕分辨率，**开启 localStorage 持久化**。

| 状态           | 类型      | 说明                              |
| -------------- | --------- | --------------------------------- |
| `isFullscreen` | `boolean` | 是否全屏                          |
| `Resolution`   | `object`  | 屏幕分辨率信息（`big` / `small`） |

| 方法                  | 说明           |
| --------------------- | -------------- |
| `setFullscreen(data)` | 设置全屏状态   |
| `setResolution(data)` | 设置屏幕分辨率 |

---

### useModalStore — 全局弹窗

控制全局弹窗的显示/隐藏及携带的配置信息。

| 状态        | 类型      | 说明         |
| ----------- | --------- | ------------ |
| `showModal` | `boolean` | 弹窗是否可见 |
| `title`     | `string`  | 弹窗标题     |
| `type`      | `string`  | 弹窗类型     |
| `menuID`    | `string`  | 关联菜单 ID  |
| `config`    | `object`  | 弹窗配置数据 |

| 方法                                        | 说明               |
| ------------------------------------------- | ------------------ |
| `setModal({ title, type, menuID, config })` | 打开弹窗并设置参数 |
| `close()`                                   | 关闭弹窗           |

---

### usePageParamsStore — 页面参数传递

跨页面传递参数，**开启 localStorage 持久化**。

| 状态         | 类型     | 说明                               |
| ------------ | -------- | ---------------------------------- |
| `activePath` | `string` | 当前激活的菜单路径                 |
| `pageBillNo` | `object` | 各菜单页面的参数集合，键为菜单路径 |

| 方法                                      | 说明                 |
| ----------------------------------------- | -------------------- |
| `setActivePath(data)`                     | 设置激活路径         |
| `setPageBillNo({ menuPath, menuParams })` | 设置某菜单页面的传参 |

---

### useSysGlobalStore — 系统全局配置

存储从服务端拉取的系统级全局配置，**持久化到 sessionStorage**。

| 状态           | 类型     | 说明                                  |
| -------------- | -------- | ------------------------------------- |
| `globalConfig` | `object` | 系统全局配置对象（如 `menuStyle` 等） |

| 方法                    | 说明         |
| ----------------------- | ------------ |
| `setGlobalConfig(data)` | 更新全局配置 |

---

### useTagsViewStore — 标签页视图

管理多标签页（已访问视图 / 缓存视图 / iframe 视图）。

| 状态           | 说明                               |
| -------------- | ---------------------------------- |
| `visitedViews` | 已访问的标签页列表                 |
| `cachedViews`  | 需要 keep-alive 缓存的视图名称列表 |
| `iframeViews`  | iframe 嵌入的标签页列表            |

常用方法：`addView`、`delView`、`delOthersViews`、`delAllViews`、`updateVisitedView`。

---

### useUserStore — 用户信息与登录

管理用户 token、用户信息、权限、登录/登出，**持久化到 sessionStorage**。

| 状态          | 说明             |
| ------------- | ---------------- |
| `token`       | 登录 token       |
| `name`        | 用户名           |
| `avatar`      | 头像地址         |
| `roles`       | 角色列表         |
| `userInfo`    | 完整用户信息对象 |
| `permissions` | 权限码列表       |

| 方法              | 说明                                  |
| ----------------- | ------------------------------------- |
| `login(userInfo)` | 登录（账密/短信验证码），返回 Promise |
| `getInfo()`       | 获取当前用户信息，返回 Promise        |
| `logOut()`        | 登出，清除 token 并重置状态           |

---

### useWorkFlowStore — 工作流状态

管理工作流审批流程中的抽屉面板和配置数据。

| 状态              | 说明                 |
| ----------------- | -------------------- |
| `waitDoNum`       | 待办工作流数量       |
| `promoterDrawer`  | 发起人抽屉是否显示   |
| `approverDrawer`  | 审批人抽屉是否显示   |
| `copyerDrawer`    | 抄送人抽屉是否显示   |
| `conditionDrawer` | 条件节点抽屉是否显示 |

## 持久化策略一览

| Store                | 持久化存储                        |
| -------------------- | --------------------------------- |
| `useAppStore`        | Cookie（`sidebarStatus`、`size`） |
| `useGlobalDataStore` | localStorage                      |
| `usePageParamsStore` | localStorage                      |
| `useUserStore`       | sessionStorage                    |
| `useSysGlobalStore`  | sessionStorage                    |
| 其余 Store           | 不持久化（内存）                  |
