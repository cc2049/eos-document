# useWebSocketV2.js

`useWebSocketV2.js` 是 Vue 3 composable，内置连接状态、消息缓存和自动重连。

## 方法说明

| 方法（带参数）                 | 参数说明                                                                                                                                                    | 返回值                                                                                             | 作用                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------- |
| `useWebSocketV2(options = {})` | `options`: 配置项，支持 `url`、`params`、`protocols`、`reconnectInterval`、`maxReconnectAttempts`、`onOpen`、`onClose`、`onError`、`onMessage`、`singleRun` | `object`，含 `socket`、`isConnected`、`messages`、`latestMessage`、`connect`、`disconnect`、`send` | 创建 WebSocket 管理实例 |
| `connect(customUrl)`           | `customUrl`: 可选连接地址                                                                                                                                   | `void`                                                                                             | 建立连接                |
| `disconnect()`                 | 无参数                                                                                                                                                      | `void`                                                                                             | 断开连接                |
| `send(data)`                   | `data`: 待发送数据对象                                                                                                                                      | `void`                                                                                             | 发送消息                |

## 示例

```js
// 基座内部
import useWebSocketV2 from '@/utils/useWebSocketV2.js';

// 子项目
import { useWebSocketV2 } from '@eosine/core-sdk';

const { isConnected, latestMessage, connect, disconnect, send } = useWebSocketV2({
  url: 'ws://localhost:8080/ws',
  reconnectInterval: 3000,
  maxReconnectAttempts: 10,
  onMessage(data) {
    console.log(data);
  },
});

connect();
```

## 说明

1. 默认支持自动重连。
2. `send` 内部会做 `JSON.stringify`，调用方传对象即可。
