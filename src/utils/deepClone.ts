//  适用于zustand 状态管理 的 优化性能版本

export const deepClone = <T>(value: T, map = new WeakMap<object, any>()): T => {
  // 1. 基本类型或 null/undefined 直接返回
  if (value === null || typeof value !== "object") {
    return value
  }

  // 2. 循环引用检查
  if (map.has(value)) {
    return map.get(value)
  }

  // 3. 定义结果变量，推导其类型
  let result: any

  // 4. 根据类型处理不同的数据结构
  if (Array.isArray(value)) {
    result = []
    map.set(value, result) // 记录引用
    for (const item of value) {
      result.push(deepClone(item, map))
    }
  } else if (value instanceof Map) {
    result = new Map()
    map.set(value, result)
    for (const [key, val] of value.entries()) {
      result.set(deepClone(key, map), deepClone(val, map))
    }
  } else if (value instanceof Set) {
    result = new Set()
    map.set(value, result)
    for (const item of value.values()) {
      result.add(deepClone(item, map))
    }
  } else if (value instanceof Date) {
    result = new Date(value.getTime())
  } else if (value instanceof RegExp) {
    result = new RegExp(value.source, value.flags)
  } else if (value instanceof Object) {
    result = {}
    map.set(value, result)
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepClone((value as any)[key], map)
      }
    }
  } else {
    // 对于其他不可枚举的情况，直接返回值
    return value
  }

  return result
}

/*  

使用示例：

const useStore = create((set, get) => ({
  nestedState: { foo: { bar: 42 }, baz: [1, 2, 3] },
  updateNestedState: (updater) =>
    set((state) => {
      // 深拷贝当前状态
      const newState = deepClone(state.nestedState);

      // 使用更新函数更新深拷贝后的状态
      updater(newState);

      // 返回新状态
      return { nestedState: newState };
    }),
}));



import React from 'react';
import useStore from './store';

const App = () => {
  const nestedState = useStore((state) => state.nestedState);
  const updateNestedState = useStore((state) => state.updateNestedState);

  const handleUpdate = () => {
    updateNestedState((draft) => {    //  此处函数传递的参数 是 真正调用时参数的  别名  形参
      draft.foo.bar = 99; // 更新嵌套状态
      draft.baz.push(4);  // 修改数组
    });
  };

  return (
    <div>
      <pre>{JSON.stringify(nestedState, null, 2)}</pre>
      <button onClick={handleUpdate}>更新状态</button>
    </div>
  );
};

export default App;



*/
