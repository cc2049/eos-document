# auth.js

`auth.js` 负责 Token 的 Cookie 与 sessionStorage 管理，属于基座登录态能力。

## 方法说明

| 方法（带参数）    | 参数说明              | 返回值                | 作用                          |
| ----------------- | --------------------- | --------------------- | ----------------------------- |
| `getToken()`      | 无参数                | `string \| undefined` | 获取当前登录 Token            |
| `setToken(token)` | `token`: 登录态 Token | `void`                | 写入 Cookie 和 sessionStorage |
| `removeToken()`   | 无参数                | `void`                | 清理 Token                    |

## 说明

1. 强绑定基座登录约定和 `TokenKey` 存储规则。
2. 不建议业务项目单独 copy，统一走基座鉴权入口。
