'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '@/components/modals-provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const formSchema = z.object({
  password: z.string().min(1),
});

const RoomPasswordModal: React.FC<{ roomId: number }> = ({ roomId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const modal = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { password } = values;

    setIsLoading(true);

    const resp = await fetch('/api/rooms/verify-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId, password }),
    });

    const data = await resp.json();

    if (!data.isCorrect) {
      setIsLoading(false);
      return form.setError('password', { message: 'Incorrect password' });
    }

    setIsLoading(false);

    modal.close();
    return router.push(`${pathname}/${roomId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-end" type="submit" disabled={isLoading}>
          {isLoading ? (
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth className="animate-spin" size="lg" />
          ) : (
            <>Join room</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RoomPasswordModal;
