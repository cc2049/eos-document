# theme.js

`theme.js` 用于动态切换 Element Plus 主色及浅色、深色变量。

## 方法说明

| 方法（带参数）                        | 参数说明                           | 返回值          | 作用                           |
| ------------------------------------- | ---------------------------------- | --------------- | ------------------------------ |
| `handleThemeStyle(theme = '#0055ff')` | `theme`: 主色十六进制字符串        | `void`          | 批量设置 Element Plus 主题变量 |
| `hexToRgb(str)`                       | `str`: 十六进制颜色值              | `Array<number>` | hex 转 rgb                     |
| `rgbToHex(r, g, b)`                   | `r/g/b`: RGB 数值                  | `string`        | rgb 转 hex                     |
| `getLightColor(color, level)`         | `color`: 基准色；`level`: 变浅比例 | `string`        | 获取更浅颜色                   |
| `getDarkColor(color, level)`          | `color`: 基准色；`level`: 变深比例 | `string`        | 获取更深颜色                   |

## 示例

```js
// 基座内部
import { handleThemeStyle } from '@/utils/theme.js';

// 子项目
import { handleThemeStyle } from '@eosine/core-sdk';

handleThemeStyle('#0f766e');
```

## 说明

1. `handleThemeStyle` 会直接操作 `document.documentElement.style`。
2. 适合运行时换肤，不适合服务端渲染阶段调用。
