'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { PasscodePrompt } from './PasscodePrompt';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pageKey: string;
}

export function PasscodeModal({ isOpen, onClose, onSuccess, pageKey }: PasscodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-md rounded-2xl p-8">
        <DialogTitle className="sr-only">Passcode</DialogTitle>
        <PasscodePrompt
          onSuccess={onSuccess}
          onCancel={onClose}
          pageKey={pageKey}
        />
      </DialogContent>
    </Dialog>
  );
}
