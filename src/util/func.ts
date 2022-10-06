/**
 * @file function utils
 * @author netcon
 * @source https://github.com/conwnet/github1s/blob/master/extensions/github1s/src/helpers/func.ts
 *
 * @remarks
 * Changes:
 *   - Added non-null assertions and explicit parameter types.
 *   - Changed dependency on `json-stable-stringify` to `fast-json-stable-stringify`.
 *   - Removed dependency on `p-finally` as Promise.finally is now widely supported.
 */

import { stableStringify } from "./stringify";

const defaultComputeCacheKey = (...args: any[]) => stableStringify([...args]);

// reuse previous promise when a request call
// and previous request not completed
export const reuseable = <F extends (...args: any[]) => Promise<any>>(
  func: F,
  computeCacheKey: (...args: Parameters<F>) => string = defaultComputeCacheKey
) => {
  const cache = new Map<string, ReturnType<F>>();

  return function f(this: unknown, ...args: Parameters<F>): ReturnType<F> {
    const key = computeCacheKey(...args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const promise = func.call(this, ...args) as ReturnType<F>;
    cache.set(key, promise);

    if (promise instanceof Promise) {
      return promise.finally(() => cache.delete(key)) as ReturnType<F>;
    } else {
      cache.delete(key);
      return promise;
    }
  };
};