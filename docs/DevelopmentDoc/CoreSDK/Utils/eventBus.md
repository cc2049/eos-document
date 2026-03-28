# eventBus.js

`eventBus.js` 提供轻量级事件订阅与派发能力，适合简单的跨模块通信。

## 方法说明

| 方法（带参数）          | 参数说明                                | 返回值          | 作用             |
| ----------------------- | --------------------------------------- | --------------- | ---------------- |
| `new EventBus()`        | 无参数                                  | `EventBus` 实例 | 创建事件总线实例 |
| `on(eventName, fn)`     | `eventName`: 事件名；`fn`: 订阅回调     | `void`          | 注册事件监听     |
| `emit(eventName, data)` | `eventName`: 事件名；`data`: 事件数据   | `void`          | 触发事件         |
| `off(eventName, fn)`    | `eventName`: 事件名；`fn`: 要移除的回调 | `void`          | 移除事件监听     |

## 示例

```js
// 基座内部
import EventBus from '@/utils/eventBus.js';

// 子项目
import { EventBus } from '@eosine/core-sdk';

const bus = new EventBus();

function onRefresh(data) {
  console.log(data);
}

bus.on('refresh', onRefresh);
bus.emit('refresh', { id: 1 });
bus.off('refresh', onRefresh);
```

## 说明

1. 适合轻量级跨模块通信。
2. 不建议替代 pinia 这类全局状态管理。
