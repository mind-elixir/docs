<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mind-elixir](./mind-elixir.md) &gt; [createBus](./mind-elixir.createbus.md)

## createBus() function

**Signature:**

```typescript
export declare function createBus<T extends Record<string, (...args: any[]) => void> = EventMap>(): {
    handlers: Record<keyof T, ((...arg: any[]) => void)[]>;
    addListener: <K extends keyof T>(type: K, handler: T[K]) => void;
    fire: <K extends keyof T>(type: K, ...payload: Parameters<T[K]>) => void;
    removeListener: <K extends keyof T>(type: K, handler: T[K]) => void;
};
```
**Returns:**

{ handlers: Record&lt;keyof T, ((...arg: any\[\]) =&gt; void)\[\]&gt;; addListener: &lt;K extends keyof T&gt;(type: K, handler: T\[K\]) =&gt; void; fire: &lt;K extends keyof T&gt;(type: K, ...payload: Parameters&lt;T\[K\]&gt;) =&gt; void; removeListener: &lt;K extends keyof T&gt;(type: K, handler: T\[K\]) =&gt; void; }

