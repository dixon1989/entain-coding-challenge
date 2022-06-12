import {useCallback, useState} from 'react';

import {UseToggleResult} from './useToggle.interface';

export function useToggle(initialState = false): UseToggleResult {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(
    () => setState((currentState: boolean) => !currentState),
    [],
  );
  const setTrueState = useCallback(() => setState(true), []);
  const setFalseState = useCallback(() => setState(false), []);

  /*
   * Example of usages:
   * 1. Only with toggle
   * ```
   *   const [isOpen, toggleOpen] = useToggle();
   * ```
   *
   * 2. Only with set true handler
   * ```
   *   const [isOpen, , openHandler] = useToggle();
   * ```
   *
   * 3. Only with set false handler
   * ```
   *   const [isOpen, , , closeHandler] = useToggle();
   * ```
   *
   * 4. With toggle and set false handler
   * ```
   *   const [isOpen, toggleOpen, , closeHandler] = useToggle();
   * ```
   * */
  return [state, toggle, setTrueState, setFalseState];
}
