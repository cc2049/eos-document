# upVersion.js

`upVersion.js` 通过轮询首页响应头里的 ETag 来检测是否发布了新版本。

## 方法说明

| 方法（带参数）    | 参数说明 | 返回值 | 作用             |
| ----------------- | -------- | ------ | ---------------- |
| `updateVersion()` | 无参数   | `void` | 开启版本轮询检测 |

## 示例

```js
// 基座内部
import { updateVersion } from '@/utils/upVersion.js';

// 子项目
import { updateVersion } from '@eosine/core-sdk';

updateVersion();
```

## 说明

1. 当前默认每 60 秒检测一次。
2. 依赖 element-plus 的确认框提醒用户刷新页面。
