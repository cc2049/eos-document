# dict.js

`dict.js` 用于按字典类型读取字典数据，并在 store 中做缓存复用。当前实现会优先从 `useDictStore` 读取，未命中时再调用接口获取。

## 方法说明

| 方法（带参数）     | 参数说明                       | 返回值                                     | 作用                                 |
| ------------------ | ------------------------------ | ------------------------------------------ | ------------------------------------ |
| `useDict(...args)` | `args`: 一个或多个字典类型编码 | `object`，返回 `toRefs` 后的响应式字典对象 | 按字典类型读取字典，并返回响应式结果 |

## 示例

```js
// 基座内部
import { useDict } from '@/utils/dict.js';

// 子项目
import { useDict } from '@eosine/core-sdk';

const { sys_yes_no, order_status } = useDict('sys_yes_no', 'order_status');
```

## 说明

1. 该方法依赖 core-sdk 提供的 pinia 字典 store 和字典接口能力，因此子项目使用前应确保已经通过基座完成应用初始化。
2. 适合下拉选项、标签回显、查询条件枚举等场景。
