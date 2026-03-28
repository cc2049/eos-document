# reg.js

`reg.js` 内置大量业务正则，包括车牌号、手机号、姓名、密码、身份证、银行卡、税率、邮箱、IP 地址等。

## 方法说明

| 方法（带参数）             | 参数说明                    | 返回值    | 作用             |
| -------------------------- | --------------------------- | --------- | ---------------- |
| `REG.CarNo.test(value)`    | `value`: 车牌号字符串       | `boolean` | 校验车牌号       |
| `REG.Mobile.test(value)`   | `value`: 手机号或固话字符串 | `boolean` | 校验手机号/电话  |
| `REG.Name.test(value)`     | `value`: 姓名字符串         | `boolean` | 校验中英文姓名   |
| `REG.Email.test(value)`    | `value`: 邮箱字符串         | `boolean` | 校验邮箱         |
| `REG.IdCard.test(value)`   | `value`: 身份证号字符串     | `boolean` | 校验身份证号     |
| `REG.bankCard.test(value)` | `value`: 银行卡号字符串     | `boolean` | 校验银行卡号     |
| `REG.Password.test(value)` | `value`: 密码字符串         | `boolean` | 校验复杂密码     |
| `REG.IPReg.test(value)`    | `value`: 地址或域名字符串   | `boolean` | 校验 IP/域名/URL |

## 示例

```js
// 基座内部
import REG from '@/utils/reg.js';

// 子项目
import { REG } from '@eosine/core-sdk';

REG.Mobile.test('13800000000');
REG.IdCard.test('110101199001011234');
```

## 说明

1. `reg.js` 是正则集合对象，不是函数模块。
2. 使用时按 `REG.xxx.test(value)` 方式调用即可。
