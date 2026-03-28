# 公共方法分类说明

index.js 是当前 utils 目录里最主要的工具入口。它既包含纯通用方法，也包含一定业务属性的方法。开发时建议按下面的分类理解和使用。

## 时间与日期处理

| 方法                                               | 参数说明                                                        | 返回值                                    | 作用                                |
| -------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------- | ----------------------------------- |
| `formatDate(cellValue, type = 'datetime')`         | `cellValue`: 时间值；`type`: `datetime/date/month/year`         | `string`，空值返回空字符串                | <nobr>格式化日期时间</nobr>         |
| `formatTime(time)`                                 | `time`: 可被 `Date.parse` 解析的时间值                          | `string`                                  | 转换为“刚刚 / 几分钟前 / 今天xx:xx” |
| `getTime(type)`                                    | `type`: `start` 返回 90 天前时间戳，其他返回当天零点            | `number \| Date`                          | 获取默认时间范围起点                |
| `GetDateAfter(AddDayCount = 0, dateType = 'date')` | `AddDayCount`: 天数偏移；`dateType`: `date/month/year/datetime` | `string`                                  | 获取若干天后的日期                  |
| `getCurrentMonth(time = new Date())`               | `time`: 指定月份的任意时间                                      | `object`，结构为 `{ startDate, endDate }` | 获取某月起止日期                    |
| `isValidDateWithDayjs(date)`                       | `date`: 待校验日期字符串                                        | `boolean`                                 | 校验日期是否合法                    |

示例：

```js
// 基座内部
import { formatDate, formatTime, GetDateAfter, ... } from '@/utils/index.js';

// 子项目
import { formatDate, formatTime, GetDateAfter, ... } from '@eosine/core-sdk';

formatDate(new Date());
formatTime('2026-03-11 09:30:00');
GetDateAfter(-7);
getCurrentMonth('2026-03-11');
```

补充说明：

1. `formatDate` 和 `formatTime` 都依赖浏览器原生时间解析，避免传入非标准时间格式。
2. `getCurrentMonth` 适合报表默认查询区间。

## URL、参数与字符串处理

| 方法                                     | 参数说明                                        | 返回值                | 作用                             |
| ---------------------------------------- | ----------------------------------------------- | --------------------- | -------------------------------- |
| `getQueryObject(url)`                    | `url`: 待解析 URL，默认 `window.location.href`  | `object`              | 读取 URL 查询参数为对象          |
| `param(json)`                            | `json`: 需要转 query string 的对象              | `string`              | 将对象转为 query string          |
| `param2Obj(url)`                         | `url`: 含 `?` 的完整 URL 或路径                 | `object`              | 将 URL 中 `?` 后面的参数转为对象 |
| `html2Text(val)`                         | `val`: HTML 字符串                              | `string`              | 去除 HTML 标签，返回纯文本       |
| `trimAll(ele)`                           | `ele`: 字符串，移除所有空白字符                 | `string \| undefined` | 清理字符串空白字符               |
| `titleCase(str)`                         | `str`: 待转换字符串                             | `string`              | 首字母大写                       |
| `camelCase(str)`                         | `str`: 下划线命名字符串                         | `string`              | 下划线转驼峰                     |
| `getUrlParams(url)`                      | `url`: 含参数字符串                             | `object`              | 从 URL 中提取参数                |
| `getFileName(name)`                      | `name`: 文件路径、下载地址或带 `attname` 的 URL | `string`              | 提取文件名                       |
| `getFileType(url)`                       | `url`: 文件路径或下载地址                       | `string`              | 提取文件扩展名                   |
| `percentageToNumber(percentage = '50%')` | `percentage`: 百分比字符串                      | `string`              | 百分比转补值                     |

示例：

```js
// 基座内部
import { param, param2Obj, getFileName, ... } from '@/utils/index.js';

// 子项目
import { param, param2Obj, getFileName, ... } from '@eosine/core-sdk';

param({ page: 1, keyword: 'eos' });
param2Obj('https://xxx.com?a=1&b=2');
getFileName('https://a.com/file/test.pdf?attname=报价单.pdf');
getFileType('/upload/report.xlsx?token=123');
```

补充说明：

1. `param` 会过滤 `undefined`，但 `0` 也可能被 `cleanArray` 过滤，涉及数值 0 的查询参数要额外注意。
2. `getFileName` 优先读取 `attname` 参数，适合下载接口文件名回显。

## 集合、对象与通用处理

| 方法                             | 参数说明                                               | 返回值     | 作用                     |
| -------------------------------- | ------------------------------------------------------ | ---------- | ------------------------ |
| `cleanArray(actual)`             | `actual`: 待过滤数组                                   | `Array`    | 过滤数组假值             |
| `objectMerge(target, source)`    | `target`: 目标对象；`source`: 来源对象                 | `object`   | 深合并对象               |
| `debounce(func, wait, options)`  | `func`: 防抖函数；`wait`: 毫秒；`options`: lodash 配置 | `Function` | 防抖                     |
| `deepClone(source)`              | `source`: 任意可拷贝值                                 | `any`      | 深拷贝                   |
| `uniqueArr(arr)`                 | `arr`: 待去重数组                                      | `Array`    | 数组去重                 |
| `createUniqueString()`           | 无参数                                                 | `string`   | 生成唯一字符串           |
| `byteLength(str)`                | `str`: 待统计字符串                                    | `number`   | 统计字符串字节长度       |
| `makeMap(str, expectsLowerCase)` | `str`: 逗号分隔字符串；`expectsLowerCase`: 是否转小写  | `Function` | 创建快速查找 map         |
| `isNumberStr(str)`               | `str`: 待判断字符串                                    | `boolean`  | 判断是否数字字符串       |
| `typeOf(obj)`                    | `obj`: 任意值                                          | `string`   | 获取更准确的数据类型     |
| `bytesToSize(bytes)`             | `bytes`: 字节数                                        | `string`   | 文件大小格式化           |
| `toThousands(num)`               | `num`: 数值或数字字符串                                | `string`   | 数字千分位格式化         |
| `uuid()`                         | 无参数                                                 | `string`   | 生成浏览器侧 uuid 字符串 |
| `turnCase(str, type)`            | `str`: 字符串；`type`: 1 大写 2 小写 3 首字母大写      | `string`   | 大小写转换               |
| `hideMobile(mobile)`             | `mobile`: 手机号                                       | `string`   | 手机号脱敏               |
| `Desensitization(str)`           | `str`: 手机号或敏感字符串                              | `string`   | 手机号脱敏               |

示例：

```js
// 基座内部
import { debounce, deepClone, uniqueArr, ... } from '@/utils/index.js';

// 子项目
import { debounce, deepClone, uniqueArr, ... } from '@eosine/core-sdk';

const save = debounce(() => {
  console.log('save');
}, 300);

const copy = deepClone(sourceData);
const merged = objectMerge({ a: 1 }, { b: 2 });
const ids = uniqueArr([1, 1, 2, 3]);
const size = bytesToSize(1024 * 1024 * 5);
```

说明：

1. debounce 现在返回的是 lodash 的函数实例，支持 cancel 和 flush。
2. deepClone 适合复制复杂对象，但仍不建议复制包含 DOM、组件实例、函数闭包的对象。
3. `eosObjectAssign(data)` 当前是空实现，不建议依赖。

## DOM 与样式辅助

| 方法                              | 参数说明                                  | 返回值    | 作用                       |
| --------------------------------- | ----------------------------------------- | --------- | -------------------------- |
| `toggleClass(element, className)` | `element`: DOM 元素；`className`: 类名    | `void`    | 切换类名                   |
| `hasClass(ele, cls)`              | `ele`: DOM 元素；`cls`: 类名              | `boolean` | 判断是否包含类名           |
| `addClass(ele, cls)`              | `ele`: DOM 元素；`cls`: 类名              | `void`    | 添加类名                   |
| `removeClass(ele, cls)`           | `ele`: DOM 元素；`cls`: 类名              | `void`    | 删除类名                   |
| `getAssetsFile(url)`              | `url`: assets/images 下的文件名或相对路径 | `string`  | 获取 assets 下静态资源路径 |

示例：

```js
// 基座内部
import { addClass, removeClass, getAssetsFile } from '@/utils/index.js';

// 子项目
import { addClass, removeClass, getAssetsFile } from '@eosine/core-sdk';

addClass(document.body, 'is-ready');
removeClass(document.body, 'is-loading');
const logo = getAssetsFile('logo.png');
```

## 表单配置与页面配置处理

这部分方法带明显业务属性，但在当前基座中使用频率很高。

| 方法                                                | 参数说明                                                                 | 返回值                             | 作用                              |
| --------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------- | --------------------------------- |
| `getFormValue(data, hasTS = false, QueryData = {})` | `data`: 表单配置数组；`hasTS`: 特殊索引占位；`QueryData`: 查询默认值对象 | `object`                           | 根据表单配置生成初始值            |
| `getFormRule(data, hasTrigger = true)`              | `data`: 表单配置数组；`hasTrigger`: 是否附带 trigger                     | `object`                           | 根据表单配置生成校验规则          |
| `dict2name(OTHER, value)`                           | `OTHER`: 枚举配置；`value`: 单值或多值                                   | `object`，结构为 `{ name, color }` | 根据 OTHER 枚举配置回显名称和颜色 |
| `setSuffix(data, cf, hasValue = true)`              | `data`: 当前数据对象；`cf`: 字段配置；`hasValue`: 是否拼接字段值         | `string`                           | 根据字段配置拼接单位或后缀        |
| `getShowCFG(data)`                                  | `data`: 配置数组                                                         | `Array`                            | 过滤 isShow 的配置项              |
| `getRowBgEval(data)`                                | `data`: 配置数组                                                         | `string`                           | 获取表格行背景色条件              |
| `getQueryUrl(data, t)`                              | `data`: 动作配置数组；`t`: `tree` 或默认详情模式                         | `string`                           | 获取详情或树查询接口              |
| `resetTopButton(data)`                              | `data`: 顶部按钮配置数组                                                 | `Array`                            | 重组表格顶部按钮                  |
| `getMyRouter(Arr, id)`                              | `Arr`: 路由数组；`id`: 路由标识片段                                      | `string`                           | 根据 id 查找路由                  |

示例：

```js
// 基座内部
import { getFormValue, getFormRule, dict2name } from '@/utils/index.js';

// 子项目
import { getFormValue, getFormRule, dict2name } from '@eosine/core-sdk';

const formModel = getFormValue(formConfig);
const formRules = getFormRule(formConfig);
const statusInfo = dict2name(field.OTHER, row.STATUS);
```

注意：

1. getFormValue、getFormRule 强依赖当前表单配置协议，不建议普通业务项目照搬协议后随意扩展。
2. 这类方法如果后续持续演进，建议独立拆成 form-utils.js，避免 index.js 继续膨胀。

## 动态表达式与高风险方法

| 方法                   | 参数说明                                    | 返回值 | 作用                         |
| ---------------------- | ------------------------------------------- | ------ | ---------------------------- |
| `evilFn(row, fn)`      | `row`: 上下文对象；`fn`: 表达式字符串       | `any`  | 用 `new Function` 执行表达式 |
| `evalFun(DATA, OTHER)` | `DATA`: 表达式上下文；`OTHER`: 待执行表达式 | `any`  | 使用 `eval` 执行表达式       |

建议：

1. 新代码不要继续扩散 eval 和 new Function 的使用范围。
2. 若必须支持表达式配置，优先考虑白名单解析或专门表达式引擎。

风险说明：

1. `evilFn` 使用 `new Function`，`evalFun` 使用 `eval`，都不适合处理外部可控输入。
2. 若只是做字段映射或简单条件判断，优先使用普通函数代替。

## lodash-es

lodash-es 是一个功能丰富的工具库，已经被引入并使用在多个工具函数中。建议新开发优先考虑复用 lodash-es 的方法，避免重复造轮子。

```js
// 基座项目和子项目都可以直接从 lodash-es 导入需要的方法
import { debounce, merge, cloneDeep, uniq } from 'lodash-es';

cloneDeep(Object);
...
```
