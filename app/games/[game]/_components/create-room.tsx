'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faLock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useModal } from '@/components/modals-provider';
import CreateRoomModal from '@/app/games/[game]/_components/create-room-modal';

const formSchema = z.object({
  activity: z.string().max(50),
  slots: z.number(),
  password: z.string().optional(),
});

const CreateRoom: React.FC<{ session: Session | null }> = ({ session }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const modal = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slots: 1,
      activity: '',
      password: '',
    },
  });

  return (
    <Button
      variant="secondary"
      className="flex items-center gap-2"
      disabled={!session?.user}
      onClick={() =>
        modal.open({
          title: 'Create a room',
          children: <CreateRoomModal />,
        })
      }
    >
      <FontAwesomeIcon icon={faPlus} fixedWidth />
      Create a room
    </Button>
  );
};

export default CreateRoom;
