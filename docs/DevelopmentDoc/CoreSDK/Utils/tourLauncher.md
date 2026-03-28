# tourLauncher.js

`tourLauncher.js` 用于全局新手导览启动与重置，不属于常规通用工具函数。

## 方法说明

| 方法（带参数）                | 参数说明             | 返回值              | 作用             |
| ----------------------------- | -------------------- | ------------------- | ---------------- |
| `new TourLauncher()`          | 无参数               | `TourLauncher` 实例 | 创建导览启动器   |
| `setTourInstance(instance)`   | `instance`: 导览实例 | `void`              | 设置导览实例     |
| `setLayoutInstance(instance)` | `instance`: 布局实例 | `void`              | 设置布局实例     |
| `startTour()`                 | 无参数               | `boolean \| any`    | 启动导览         |
| `resetTour()`                 | 无参数               | `void`              | 重置导览         |
| `isCompleted()`               | 无参数               | `boolean`           | 检查导览是否完成 |

## 说明

1. 依赖具体布局组件实例。
2. 更适合基座内部使用，不建议作为普通工具函数理解。
