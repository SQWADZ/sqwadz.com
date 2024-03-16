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

interface Props {
  activity: string;
  slots: number;
  roomId: number;
}

const formSchema = z.object({
  activity: z.string().max(50).min(1),
  slots: z.number().min(1),
});

const RoomSettingsModal: React.FC<Props> = ({ activity, slots, roomId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slots,
      activity,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const resp = await fetch('/api/rooms/edit-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, roomId: +roomId }),
    });

    setIsLoading(false);
    if (resp.status !== 200) {
      //   Maybe set some "Something went wrong" error?
    }

    modal.close();
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
        <Button type="submit" disabled={isLoading}>
          {!isLoading ? (
            'Apply'
          ) : (
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth className="animate-spin" size="lg" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RoomSettingsModal;
