import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '@/components/modals-provider';
import { notify } from '@/client/utils';

const formSchema = z.object({
  reason: z.string(),
});

const BanMemberModal: React.FC<{ targetId: string; roomId: number }> = ({ targetId, roomId }) => {
  const modal = useModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const resp = await fetch(`/api/rooms/ban-member`, {
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        targetId,
        roomId: +roomId,
        reason: values.reason,
      }),
      method: 'POST',
    });

    if (resp.status !== 200) {
      notify({
        message: `Unable to remove member`,
        data: { description: 'Something went wrong.' },
      });
    }

    setIsLoading(false);
    modal.close();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={() => modal.close()} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} variant="destructive">
            {!isLoading ? (
              'Remove'
            ) : (
              <FontAwesomeIcon icon={faCircleNotch} fixedWidth className="animate-spin" size="lg" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BanMemberModal;
