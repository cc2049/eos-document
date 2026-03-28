# 路由管理模块

## 架构概览

```
createBaseRouter()                              ← 初始化 Router 实例
      ├── constantRoutes                        ← 基座固定路由
      │   └── addConstantRoutes()               ← 子项目追加固定路由
      └── setupPermissionGuard()                ← 路由守卫（beforeEach）
          └── 首次导航且 addRoutes 为空时
              ├── useUserStore().getInfo()      ← 获取用户信息
              └── permissionStore.generateRoutes()
                   ├── getRouters()             ← 接口请求后端菜单
                   ├── filterAsyncRouter()      ← 映射组件
                   └── applyServerRoutes()      ← 注册到 Router（自动去重）
```

## 文件说明

| 文件            | 职责                                                 |
| --------------- | ---------------------------------------------------- |
| `index.js`      | Router 实例管理、固定路由定义、动态路由注册/重置 API |
| `permission.js` | 路由守卫逻辑（鉴权、动态路由懒加载、白名单）         |

## 路由分层

| <nobr>层级</nobr> | <nobr>来源</nobr>       | <nobr>类型</nobr>     | 注册时机           | 使用方法                                                    |
| ----------------- | ----------------------- | --------------------- | ------------------ | ----------------------------------------------------------- |
| 1                 | <nobr>基座内置</nobr>   | <nobr>固定路由</nobr> | 应用启动           | `constantRoutes` 数组，随 `createBaseRouter()` 直接初始化   |
| 2                 | <nobr>子项目传入</nobr> | <nobr>固定路由</nobr> | 应用启动           | `addConstantRoutes(routes)`                                 |
| 3                 | <nobr>后端接口</nobr>   | <nobr>动态路由</nobr> | 首次导航时按需加载 | 权限守卫自动触发 `generateRoutes()` → `applyServerRoutes()` |

> **规则说明**
>
> - 层级 1 / 2 无需权限校验，应用启动后立即可访问。
> - 层级 3 由路由守卫驱动，登录后首次进入受保护页面时触发一次，后续导航直接放行。

## API 参考

### `index.js`

#### `createBaseRouter(base?)`

创建并返回 Vue Router 实例，内置基座固定路由。必须在 `setupPermissionGuard()` **之前**调用。

```js
import { createBaseRouter } from '@eosine/core-sdk';
const router = createBaseRouter('/');
```

| 参数   | 类型     | 默认值 | 说明                    |
| ------ | -------- | ------ | ----------------------- |
| `base` | `string` | `'/'`  | history 模式的 base URL |

---

#### `getRouter()`

返回已创建的 Router 实例，在非组件环境中使用。

```js
import { getRouter } from '@eosine/core-sdk';
const router = getRouter();
```

---

#### `addConstantRoutes(routes)`

将子项目的**固定路由**追加到基座，调用后立即生效。应在 `createBaseRouter()` 之后、`app.use(router)` 之前调用（`createBaseApp` 内部已保证顺序）。

```js
import { addConstantRoutes } from '@eosine/core-sdk';

addConstantRoutes([
  {
    path: '/my-page',
    name: 'MyPage',
    component: () => import('./views/MyPage.vue'),
    meta: { title: '我的页面' },
  },
]);
```

---

#### `applyServerRoutes(routes)`

将接口返回、经处理后的动态路由注册到 Router。**内部自动去重**。

> 此方法由 `store/modules/permission.js` 的 `generateRoutes()` 内部调用，**通常不需要在业务代码中直接调用**。

---

### `permission.js`

#### `setupPermissionGuard()`

初始化路由权限守卫（`beforeEach` / `afterEach`），必须在 `createBaseRouter()` **之后**调用。

> `createBaseApp()` 内部已自动调用，子项目无需手动调用。

**守卫执行逻辑：**

```
beforeEach
  ├── 有 Token
  │     ├── 访问 /login → 重定向到首页
  │     ├── addRoutes 为空（首次或重置后）
  │     │     ├── 调用 userStore.getInfo()
  │     │     ├── 调用 permissionStore.generateRoutes()  ← 请求接口 + 注册路由
  │     │     └── next({ ...to, replace: true })
  │     └── addRoutes 不为空 → next()
  └── 无 Token
        ├── 路径在白名单 → next()
        └── 其他 → 重定向到 /login?redirect=...
```

## 完整流程

```
子项目入口 main.js
    └── createBaseApp(app, { routes: fixedRoutes, ... })
            ├── createBaseRouter('/')
            ├── addConstantRoutes(fixedRoutes)       ← 固定路由立即注册
            ├── app.use(router)
            └── setupPermissionGuard()               ← 挂载守卫

用户访问动态路由页面（如 /order/list）
    └── beforeEach 触发
            └── permissionStore.addRoutes 为空
                    ├── userStore.getInfo()          ← 获取用户角色/权限
                    ├── permissionStore.generateRoutes()
                    │       ├── GET /getRouters      ← 后端返回菜单树
                    │       ├── mergeRoutes(Routes)  ← 格式化/映射组件/注册动态路由
                    │       └── applyServerRoutes()  ← 注册到 Router，自动去重
                    └── next({ path: '/order/list', replace: true })
```

## 子项目切换 / 自定义路由整合

子项目切换时，由**子项目自身**请求各自的路由接口，然后调用 `mergeRoutes` 追加路由。已注册过的路由自动去重跳过，不会重复添加。

> ⚠️ 不要调用 `generateRoutes()`，那是基座调用自己 `/getRouters` 接口专用的。

```js
import { usePermissionStore } from '@eosine/core-sdk';

const permissionStore = usePermissionStore();

// 子项目拉取自身路由接口
const res = await myProjectGetRouters();

// 传入原始路由数据，与基座动态路由相同的方式处理并追加（自动去重）
permissionStore.mergeRoutes(res.RESULT);
```

#### `mergeRoutes(rawRoutes)` 的执行步骤：

| <nobr>步骤</nobr> | <nobr>方法</nobr>                  | <nobr>释义</nobr>                                                                                           |
| ----------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1                 | `formatRoutes()`                   | 格式化顶层路由（设置 component/path）                                                                       |
| 2                 | `filterAsyncRouter()`              | 将字符串组件名映射为真实组件，生成 sidebarRoutes / rewriteRoutes / defaultRoutes                            |
| 3                 | `applyServerRoutes(rewriteRoutes)` | 注册动态路由                                                                                                |
| 4                 | `mergeRoutes(rawRoutes)`           | 将新路由追加合并到 store 的 `addRoutes`、`sidebarRouters`、`topbarRouters` 等状态，使用 `dedupeByName` 去重 |

## 白名单配置

以下路径无需登录即可访问，在 `router/permission.js` 的 `WHITE_LIST` 中维护：

```
/login
/auth-redirect
/bind
/register
/TMSSync/searchCarPath
/formDesigner
/formView
/extend/tms
/driverLogin
/productList
/orderList
/docsShare
/mobileDesigner
/problem
/problemDetail
/TYTMSSendOrderConfirm
```

如需新增白名单路径，直接在 `permission.js` 中向 `WHITE_LIST` 的 `Set` 添加即可：

```js
const WHITE_LIST = new Set([
  // ... 已有路径
  '/your-new-public-path',
]);
```
