# htmlToPdf.js

`htmlToPdf.js` 用于将页面指定 DOM 区域导出为 PDF。

## 方法说明

| 方法（带参数）                | 参数说明                                               | 返回值          | 作用                     |
| ----------------------------- | ------------------------------------------------------ | --------------- | ------------------------ |
| `htmlToPdf.getPdf(title, id)` | `title`: 导出文件名；`id`: DOM 选择器，如 `#printArea` | `Promise<void>` | 将页面指定区域导出为 PDF |

## 示例

```js
// 基座内部
import htmlToPdf from '@/utils/htmlToPdf.js';

// 子项目
import { htmlToPdf } from '@eosine/core-sdk';

htmlToPdf.getPdf('对账单', '#printArea');
```

## 说明

1. 依赖 html2canvas 和 jspdf。
2. 目标元素必须已渲染完成，否则截图不完整。
