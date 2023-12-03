'use client';

import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faLock } from '@fortawesome/free-solid-svg-icons';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@/components/modals-provider';

const formSchema = z.object({
  activity: z.string().max(50),
  slots: z.number(),
  password: z.string().optional(),
});

const CreateRoomModal: React.FC = () => {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const resp = await fetch('/api/rooms/create-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data = await resp.json();
    setIsLoading(false);
    if (data !== 200) {
      //   Maybe set some "Something went wrong" error?
    }

    modal.close();
    // TODO: redirect and close dialog (controlled)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
              <FormDescription>Number of slots available slots in the room</FormDescription>
              <FormControl>
                <Input {...field} onChange={(event) => field.onChange(+event.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <label htmlFor="private-room" className="flex flex-row items-center justify-between rounded-lg border p-4">
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
        </label>
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
