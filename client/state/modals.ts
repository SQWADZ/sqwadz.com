import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

import React from 'react';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  size?: ModalSize | number;
  children: React.ReactNode;
};

const modalAtom = atom<ModalProps>({
  open: false,
  title: '',
  description: '',
  children: null,
});

export const useSetModal = () => useSetAtom(modalAtom);
export const useModalState = () => useAtom(modalAtom);
