---
sidebar_position: 3
---

# 箭头数据

```typescript
export type Arrow = {
    id: string;
    label: string;
    from: Uid;
    to: Uid;
    delta1: {
        x: number;
        y: number;
    };
    delta2: {
        x: number;
        y: number;
    };
    bidirectional?: boolean;
};
```