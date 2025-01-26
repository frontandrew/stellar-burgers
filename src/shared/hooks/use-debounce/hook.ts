import { useCallback, useMemo, useRef } from 'react';

import { debounce } from 'utils';

export const useDebounceCallback = <Params extends unknown[], Return>(
  callback: (...args: Params) => Return,
  delay: number
) => {
  const internalCallbackRef = useRef<typeof callback>(callback);
  internalCallbackRef.current = callback;

  const internalCallback = useCallback((...args: Params) => {
    const fn = internalCallbackRef.current;
    return fn(...args);
  }, []);

  const debounced = useMemo(() => debounce(internalCallback, delay), [delay]);

  return debounced;
};
