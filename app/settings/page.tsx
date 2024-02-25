import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import Container from '@/components/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';

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
        <div className="border-boder flex items-center justify-between gap-4 rounded-lg border p-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <p className="text-base">Delete account</p>
            </div>
            <p className="text-sm text-muted-foreground">This action is irreversible</p>
          </div>
          <Button variant="destructive">Delete your account</Button>
        </div>
        <Button className="self-end">Save settings</Button>
      </div>
    </Container>
  );
};

export default SettingsPage;
