import { useRef } from 'react';

export function useDebounce(callback, delay) {
  const timer = useRef();

  const debounceCallback = (...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debounceCallback;
}