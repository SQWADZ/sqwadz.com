'use client';

import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faLock, faStopwatch, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@/components/modals-provider';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { setEngine } from 'crypto';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

const formSchema = z.object({
  activity: z.string().max(50).min(1, { message: 'Activity is required' }),
  slots: z.number().min(2, 'Slots must be at least 2'),
  password: z.string().optional(),
  duration: z.number().min(1).max(6),
});

const CreateRoomModal: React.FC<{ game: string; session: Session | null }> = ({ game, session }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [isLongDuration, setIsLongDuration] = React.useState(false);
  const [hasRoom, setHasRoom] = React.useState<false | number>(false);
  const router = useRouter();
  const modal = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slots: 2,
      activity: '',
      password: '',
      duration: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    values.password = !isPrivate ? '' : values.password;

    const formData: z.infer<typeof formSchema> & { game: string } = { ...values, game };

    const resp = await fetch('/api/rooms/create-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data: { id?: number; error?: string; roomId?: number } = await resp.json();

    if (resp.status !== 200 && data.error) {
      if (data.error === 'room_exists') setHasRoom(data.roomId || false);
      setIsLoading(false);
      return;
    }

    if (values.password) {
      document.cookie = `${data.id}:password=${values.password};path=/;secure=true;`;
    }

    modal.close();
    router.push(`/games/${game}/${data.id}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {hasRoom !== false && (
          <Alert variant="destructive">
            <FontAwesomeIcon icon={faWarning} fixedWidth />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              You can only have a single room active at a time, click{' '}
              <Link className="underline" href={`/games/${game}/${hasRoom}`}>
                here
              </Link>{' '}
              to find your room.
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="activity"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required>Activity</FormLabel>
              <FormDescription>Main activity of the room</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slots"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required>Slots</FormLabel>
              <FormDescription>Number of members allowed in the room (minimum 2)</FormDescription>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => {
                    const value = +event.target.value;
                    if (isNaN(value)) return;

                    field.onChange(+event.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between gap-8">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} fixedWidth />
                <label htmlFor="private-room" className="text-base">
                  Private room
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Allow only users with the password to join</p>
            </div>
            <Switch id="private-room" checked={isPrivate} onCheckedChange={() => setIsPrivate(!isPrivate)} />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(!isPrivate && 'text-muted-foreground')}>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" disabled={!isPrivate} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between gap-8">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} fixedWidth />
                <label htmlFor="private-room" className="text-base">
                  Long duration room
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Sets the room duration up to a maximum of 6 hours. Verified creators only.
              </p>
            </div>
            <Switch
              id="long-room"
              disabled={!session?.user.isVerified}
              checked={isLongDuration}
              onCheckedChange={() => setIsLongDuration((prev) => !prev)}
            />
          </div>
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(!isLongDuration && 'text-muted-foreground')}>Hours</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(event) => {
                      const value = +event.target.value;
                      if (isNaN(value)) return;

                      field.onChange(+event.target.value);
                    }}
                    disabled={!isLongDuration}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {!isLoading ? (
            'Create'
          ) : (
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth className="animate-spin" size="lg" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateRoomModal;
