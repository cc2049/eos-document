# gpsToAmap.js

`gpsToAmap.js` 主要用于将 WGS-84 坐标转换为高德地图可直接使用的 GCJ-02 坐标。

## 方法说明

| 方法（带参数）                | 参数说明                     | 返回值                          | 作用                      |
| ----------------------------- | ---------------------------- | ------------------------------- | ------------------------- |
| `transformLat(x, y)`          | `x/y`: 坐标偏移量            | `number`                        | 计算纬度偏移              |
| `transformLon(x, y)`          | `x/y`: 坐标偏移量            | `number`                        | 计算经度偏移              |
| `delta(lat, lon)`             | `lat/lon`: 原始经纬度        | `object`，结构为 `{ lat, lon }` | 计算坐标偏移量            |
| `outOfChina(lat, lon)`        | `lat/lon`: 原始经纬度        | `boolean`                       | 判断是否在中国范围外      |
| `gcj_encrypt(wgsLat, wgsLon)` | `wgsLat/wgsLon`: WGS-84 坐标 | `object`，结构为 `{ lat, lon }` | 将 GPS 坐标转换为高德坐标 |

## 示例

```js
// 基座内部
import GPS from '@/utils/gpsToAmap.js';

// 子项目
import { GPS } from '@eosine/core-sdk';

const point = GPS.gcj_encrypt(31.2304, 121.4737);
```

## 说明

1. 对国外坐标会直接返回原始值。
2. 常用入口是 `gcj_encrypt`，其他方法一般作为内部算法辅助使用。
