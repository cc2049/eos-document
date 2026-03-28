# validate.js

`validate.js` 提供常见的输入校验能力，适合 URL、邮箱、大小写、数组等基础场景。

## 方法说明

| 方法（带参数）        | 参数说明            | 返回值    | 作用                 |
| --------------------- | ------------------- | --------- | -------------------- |
| `isHttp(url)`         | `url`: 地址字符串   | `boolean` | 是否 http/https 地址 |
| `isExternal(path)`    | `path`: 路径字符串  | `boolean` | 是否外链             |
| `validUsername(str)`  | `str`: 用户名字符串 | `boolean` | 是否预设用户名       |
| `validURL(url)`       | `url`: URL 字符串   | `boolean` | URL 是否合法         |
| `validLowerCase(str)` | `str`: 字符串       | `boolean` | 是否纯小写           |
| `validUpperCase(str)` | `str`: 字符串       | `boolean` | 是否纯大写           |
| `validAlphabets(str)` | `str`: 字符串       | `boolean` | 是否纯字母           |
| `validEmail(email)`   | `email`: 邮箱字符串 | `boolean` | 是否邮箱             |
| `isString(str)`       | `str`: 任意值       | `boolean` | 是否字符串           |
| `isArray(arg)`        | `arg`: 任意值       | `boolean` | 是否数组             |

## 示例

```js
// 基座内部
import { validURL, validEmail, isArray } from '@/utils/validate.js';

// 子项目
import { validURL, validEmail, isArray } from '@eosine/core-sdk';

validURL('https://example.com');
validEmail('demo@example.com');
isArray([]);
```

## 说明

1. 适合作为表单轻量校验辅助。
2. 若存在强业务规则，优先放到 `reg.js` 或具体业务模块里。
