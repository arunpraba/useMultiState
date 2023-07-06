import { useState, useCallback } from 'react';
import { produce } from 'immer';

export function useImmer(initialValue) {
  const [val, updateValue] = useState(() =>
    Object.freeze(
      typeof initialValue === 'function' ? initialValue() : initialValue
    )
  );

  return [
    val,
    useCallback((updater) => {
      if (typeof updater === 'function')
        updateValue((prevState) => produce(prevState, updater));
      else updateValue(Object.freeze(updater));
    }, []),
  ];
}
