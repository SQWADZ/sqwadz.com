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
      <p className="text-destructive">
        NOTE: Deleting your account data will wipe the data from our database, however to completely prevent sign-ins
        you will have to un-authorize the sqwadz app in the settings of your OAuth provider.
      </p>

      <div className="flex gap-2 self-end">
        <Button variant="destructive" disabled={isLoading} onClick={() => handleDeleteAccount()}>
          {isLoading ? (
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth className="animate-spin" size="lg" />
          ) : (
            'Delete account data'
          )}
        </Button>
        <Button variant="secondary" disabled={isLoading} onClick={() => modal.close()}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
