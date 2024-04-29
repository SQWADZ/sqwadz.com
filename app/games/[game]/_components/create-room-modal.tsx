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
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  activity: z.string().max(50),
  slots: z.number(),
  password: z.string().optional(),
});

const CreateRoomModal: React.FC<{ game: string }> = ({ game }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const router = useRouter();
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

    values.password = !isPrivate ? '' : values.password;

    const formData: z.infer<typeof formSchema> & { game: string } = { ...values, game };
    const resp = await fetch('/api/rooms/create-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data: { id?: number } = await resp.json();

    setIsLoading(false);
    if (resp.status !== 200) {
      //   Maybe set some "Something went wrong" error?
    }

    if (values.password) {
      document.cookie = `${data.id}:password=${values.password}`;
    }

    modal.close();
    router.push(`/games/${game}/${data.id}`);
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
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
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
