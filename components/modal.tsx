'use client';

import React from 'react';
import { useModalState } from '@/client/state/modals';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const SIZES = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

const Modal: React.FC = () => {
  const [modal, setModal] = useModalState();

  return (
    <Dialog open={modal.open} onOpenChange={() => setModal((prev) => ({ ...prev, open: false }))} modal>
      <DialogContent
        style={{
          width: typeof modal.size === 'number' ? modal.size : undefined,
        }}
        className={cn(!modal.size && 'max-w-sm md:max-w-md', typeof modal.size === 'string' && SIZES[modal.size])}
      >
        <DialogHeader>
          <DialogTitle>{modal.title}</DialogTitle>
          {modal.description && <DialogDescription>{modal.description}</DialogDescription>}
        </DialogHeader>
        {modal.children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
