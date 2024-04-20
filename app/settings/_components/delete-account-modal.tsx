'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'next-auth/react';
import { notify } from '@/client/utils';
import { useModal } from '@/components/modals-provider';
import { useRouter } from 'next/navigation';

const DeleteAccountModal: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();
  const router = useRouter();

  async function handleDeleteAccount() {
    setIsLoading(true);

    const resp = await fetch('/api/delete-account', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);

    notify({
      message: resp.status === 200 ? 'Account successfully deleted' : 'An error occurred while deleting your account.',
    });

    router.push('/');
    router.refresh();

    modal.close();
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Are you sure you want to delete your account?</p>
        <p className="text-destructive">This action is irreversible.</p>
      </div>

      <div className="flex gap-2 self-end">
        <Button variant="destructive" disabled={isLoading} onClick={() => handleDeleteAccount()}>
          {isLoading ? (
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth className="animate-spin" size="lg" />
          ) : (
            'Delete account'
          )}
        </Button>
        <Button variant="secondary" disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
