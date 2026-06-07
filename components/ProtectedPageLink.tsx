'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBusinessUnlock } from '@/hooks/useBusinessUnlock';
import { getUnlockKey, isProtectedPath } from '@/lib/passcode';
import { PasscodeModal } from './PasscodeModal';

interface ProtectedPageLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  onClick?: () => void;
}

export function ProtectedPageLink({ href, children, className, label, onClick }: ProtectedPageLinkProps) {
  const router = useRouter();
  const pageKey = getUnlockKey(href);
  const { isUnlocked } = useBusinessUnlock(pageKey);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    if (isUnlocked) {
      router.push(href);
    } else {
      setShowModal(true);
    }
  };

  const handleSuccess = () => {
    setShowModal(false);
    router.push(href);
  };

  if (!isProtectedPath(href)) {
    return (
      <a href={href} onClick={onClick} className={className} aria-label={label}>
        {children}
      </a>
    );
  }

  return (
    <>
      <a href={href} onClick={handleClick} className={className} aria-label={label}>
        {children}
      </a>
      <PasscodeModal isOpen={showModal} onClose={() => setShowModal(false)} onSuccess={handleSuccess} pageKey={pageKey} />
    </>
  );
}
