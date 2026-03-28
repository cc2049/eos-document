# 工具类目录文件总览

## 目录结构

```
utils/
├── index.js              # 通用前端工具（保留业务函数 + re-export lodash-es）
├── aes.js                # 加解密（需改造公私钥注入方式）
├── auth.js               # Token 管理（基座内部）
├── dict.js               # 字典 Composable（基座内部，可对外）
├── dynamicTitle.js       # 动态标题（基座内部）
├── errorCode.js          # 错误码（可改造为可配置后对外）
├── eventBus.js           # 事件总线（通用，可对外）
├── gpsToAmap.js          # GPS 坐标转换（通用，可对外）
├── htmlToPdf.js          # HTML 转 PDF（通用，可对外）
├── loadPackage.js        # 子包懒加载（基座内部）
├── reg.js                # 正则集合（通用，可对外）
├── request.js            # HTTP 请求封装（基座内部）
├── ruoyi.js              # 若依工具函数（基座内部，部分可提炼）
├── theme.js              # 主题切换（通用，可对外）
├── tourLauncher.js       # 新手引导（基座内部）
├── upVersion.js          # 版本检测（通用，可对外）
├── useWebSocketV2.js     # WebSocket（通用，可对外）
├── validate.js           # 校验函数（通用，可对外）
├── grhtml5-6.8-min.js    # GridReport 第三方库（不对外）
└── grwebapp.js           # GridReport 报表通信（不对外）
```

## 目录定位

utils 目录承担两类职责：

1. 提供可复用的前端通用能力，比如时间格式化、对象处理、WebSocket、事件总线、主题色处理、文件名解析等。
2. 承载基座运行时所需的内部能力，比如 Token 管理、请求拦截、动态装载子包、字典读取、页面标题设置等。

> 开发时要先区分文件类型，再决定是否复用、是否对外暴露、往什么文件放。

## 分类总览

### 1. 对外通用工具

> 这类文件耦合低，适合被业务项目直接复用，或者后续从 core-sdk 中统一导出。

| 文件              | 说明                                                          | 适用场景                   |
| ----------------- | ------------------------------------------------------------- | -------------------------- |
| index.js          | 通用前端方法集合，包含时间、URL、集合、表单配置、文件名处理等 | 常规业务开发               |
| aes.js            | RSA + DES 加解密封装                                          | 与后端约定加密传输         |
| eventBus.js       | 轻量事件总线                                                  | 非父子组件通信、跨模块通知 |
| gpsToAmap.js      | GPS 坐标转高德坐标                                            | 地图定位、轨迹展示         |
| htmlToPdf.js      | 页面局部区域导出 PDF                                          | 打印、导出报表             |
| dict.js           | 字典数据读取 composable                                       | 页面字典缓存、下拉字典回显 |
| reg.js            | 常用业务正则集合                                              | 表单规则、数据校验         |
| theme.js          | Element Plus 主题色动态切换                                   | 主题定制                   |
| upVersion.js      | 基于 ETag 的前端版本更新提示                                  | 检测新版本并提醒刷新       |
| useWebSocketV2.js | Vue 3 WebSocket 封装                                          | 实时消息、状态推送         |
| validate.js       | 常规校验函数                                                  | URL、邮箱、数组等基础校验  |
| errorCode.js      | 常见错误码文案映射                                            | 接口错误提示兜底           |

### 2. 基座内部能力

> 这类文件对 store、router、内部 API、内部组件协议存在依赖，不建议业务项目直接复用。

| 文件            | 说明                                     | 原因                               |
| --------------- | ---------------------------------------- | ---------------------------------- |
| auth.js         | Token 的 Cookie 与 sessionStorage 管理   | 强绑定基座登录约定                 |
| dynamicTitle.js | 动态设置系统标题                         | 依赖 sysGlobal store               |
| loadPackage.js  | 动态装载 form、etable、vtable、workbench | 基座路由与插件初始化逻辑           |
| request.js      | axios 请求封装                           | 深度耦合内部协议、鉴权、加密、下载 |
| ruoyi.js        | 若依风格工具集                           | 含历史兼容逻辑，建议按需提炼       |
| tourLauncher.js | 新手引导启动器                           | 依赖具体布局组件实例               |

### 3. 第三方或历史兼容文件

> 这类文件以兼容接入为主，不建议继续扩展新功能。

| 文件               | 说明                                |
| ------------------ | ----------------------------------- |
| grhtml5-6.8-min.js | 第三方报表相关压缩库                |
| grwebapp.js        | 第三方报表客户端通信脚本            |
| jsencrypt.js       | 历史封装，优先直接使用 jsencrypt 包 |

## 开发原则

### 1. 保留两套调用方式

当前约定保留两套使用方式：

1. 基座内部开发：继续使用 utils 目录下的原始文件路径，便于就近维护和调试。
2. 子项目开发：统一从 `@eosine/core-sdk` 导入，不直接依赖 SDK 内部目录结构。

推荐规则：

1. 在 core-sdk 仓库内部开发时，优先使用 `@/utils/...`。
2. 在子项目中，优先使用 `@eosine/core-sdk`。
3. 只要某个工具计划给子项目使用，就需要先从 SDK 入口统一导出。

### 2. 新增工具前先判断归属

新增 JS 方法前，先判断属于哪一类：

1. 纯前端通用函数：优先放到 index.js 或拆成单独文件。
2. 与 store、router、request 协议耦合：放独立文件，不要塞进 index.js。
3. 第三方库的简单转发：尽量直接依赖库，不重复造一层无意义封装。

### 3. index.js 的边界

index.js 适合放：

1. 纯函数。
2. 无副作用方法，或副作用非常清晰的方法。
3. 业务项目高频复用的方法。

index.js 不适合放：

1. 强依赖 pinia store 的逻辑。
2. 强依赖特定页面协议的数据拼装逻辑。
3. 需要初始化生命周期的对象型模块。

### 4. 通用能力优先用 lodash-es

当前基座已接入 lodash-es。对以下类型的方法，优先直接使用 lodash-es，而不是重复手写：

1. 防抖、节流。
2. 深拷贝。
3. 对象合并。
4. 数组去重。
5. 空值过滤。

当前 index.js 以下方法已统一改为调用 lodash-es：

- cleanArray -> compact
- objectMerge -> merge
- debounce -> lodash-es debounce
- deepClone -> cloneDeep
- uniqueArr -> uniq

这样做的目的：

1. 降低自实现 bug 风险。
2. 避免多个项目维护不同版本的同类方法。
3. 在 Vite 下可被 tree-shaking，体积可控。
