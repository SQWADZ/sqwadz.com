'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/modals-provider';
import DeleteAccountModal from '../_components/delete-account-modal';

const DeleteAccountButton: React.FC = () => {
  const modal = useModal();

  return (
    <Button
      variant="destructive"
      className="self-start"
      onClick={() =>
        modal.open({
          title: 'Delete account',
          children: <DeleteAccountModal />,
        })
      }
    >
      Delete account
    </Button>
  );
};

export default DeleteAccountButton;
