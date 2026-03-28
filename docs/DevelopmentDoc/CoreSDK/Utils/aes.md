# aes.js

`aes.js` 提供 RSA 与 DES 的组合加解密能力，主要用于和后端协议约定的数据加密传输。

## 方法说明

| 方法（带参数）             | 参数说明                                    | 返回值                                 | 作用                   |
| -------------------------- | ------------------------------------------- | -------------------------------------- | ---------------------- |
| `random16()`               | 无参数                                      | `string`                               | 生成 16 位随机字符串   |
| `RSAEncrypt(data)`         | `data`: 待加密字符串                        | `string`                               | RSA 公钥加密           |
| `RSADencrypt(data)`        | `data`: 待解密字符串                        | `string`                               | RSA 私钥解密           |
| `aesJmEncrypt(text, key)`  | `text`: 待加密文本；`key`: 可选 DES 密钥    | `string`                               | DES 加密               |
| `aesJmDEncrypt(text, key)` | `text`: 待解密文本；`key`: 可选 DES 密钥    | `string`                               | DES 解密               |
| `aesEncrypt(data)`         | `data`: 待加密对象或数据                    | `object`，结构为 `{ aesKey, aesData }` | 生成随机密钥并加密数据 |
| `aesDEncrypt(data)`        | `data`: 含 `KEY`、`SECRETRESULT` 的响应对象 | `string`                               | 解密后端返回数据       |

## 示例

```js
// 基座内部
import { aesEncrypt, aesDEncrypt } from '@/utils/aes.js';

// 子项目
import { aesEncrypt, aesDEncrypt } from '@eosine/core-sdk';

const payload = aesEncrypt({ id: 1, name: 'test' });
const result = aesDEncrypt(serverData);
```

## 说明

1. 当前文件中存在硬编码密钥，仅适合当前内部协议。
2. 如果要做真正对外能力，建议改造成“密钥参数化”或“工厂函数化”。
