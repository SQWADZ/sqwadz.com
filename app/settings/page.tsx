import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import Container from '@/components/container';
import DeleteAccountButton from './_components/delete-account-button';

const SettingsPage: React.FC = async () => {
  const session = await getServerAuthSession();

  if (!session?.user) return redirect('/sign-in');

  return (
    <Container>
      <div className="flex flex-col justify-between gap-4 rounded-lg">
        <div className="flex flex-col">
          <p className="text-xl">Danger Zone</p>
          <p className="text-sm text-muted-foreground">Manage your account</p>
        </div>
        <div className="border-boder flex flex-col justify-between gap-4 rounded-lg border p-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-base">Delete account data</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Removes all data associated with your account. This action is irreversible.
            </p>
          </div>
          <DeleteAccountButton />
        </div>
      </div>
    </Container>
  );
};

export default SettingsPage;
