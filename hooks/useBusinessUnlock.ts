'use client';

import { useState, useEffect, useCallback } from 'react';
import { CORRECT_PASSCODE } from '@/lib/passcode';

export function useBusinessUnlock(pageKey: string) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(pageKey);
      if (stored === 'true') {
        setIsUnlocked(true);
      }
      setIsReady(true);
    }
  }, [pageKey]);

  const unlock = useCallback((passcode: string) => {
    if (passcode === CORRECT_PASSCODE) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(pageKey, 'true');
      }
      setIsUnlocked(true);
      return true;
    }
    return false;
  }, [pageKey]);

  const lock = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(pageKey);
    }
    setIsUnlocked(false);
  }, [pageKey]);

  return { isUnlocked, isReady, unlock, lock };
}
