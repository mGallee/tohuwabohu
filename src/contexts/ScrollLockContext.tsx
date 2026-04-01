'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';

interface ScrollLockContextValue {
  lockScroll: () => void;
  unlockScroll: () => void;
}

const ScrollLockContext = createContext<ScrollLockContextValue | null>(null);

export function useScrollLock() {
  const ctx = useContext(ScrollLockContext);
  if (!ctx) {
    throw new Error('useScrollLock must be used within ScrollLockProvider');
  }
  return ctx;
}

export function ScrollLockProvider({ children }: { children: ReactNode }) {
  const lockCountRef = useRef(0);

  const lockScroll = useCallback(() => {
    lockCountRef.current++;
    if (lockCountRef.current === 1) {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const unlockScroll = useCallback(() => {
    if (lockCountRef.current === 0) {
      return;
    }
    lockCountRef.current--;
    if (lockCountRef.current === 0) {
      document.body.style.removeProperty('overflow');
    }
  }, []);

  const values = useMemo(
    () => ({
      lockScroll,
      unlockScroll,
    }),
    [lockScroll, unlockScroll],
  );

  useEffect(() => {
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <ScrollLockContext.Provider value={values}>
      {children}
    </ScrollLockContext.Provider>
  );
}
