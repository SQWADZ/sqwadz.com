'use client';

import React from 'react';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useModal } from '@/components/modals-provider';
import { toast } from 'sonner';
import { notify } from '@/client/utils';

const formSchema = z.object({
  type: z.string(),
  comment: z.string(),
  game: z.string(),
  title: z.string(),
});

const FeedbackModal: React.FC<{ type?: 'general' | 'game-request' | 'bug-report' }> = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: props.type ?? 'general',
      comment: '',
      game: '',
      title: '',
    },
  });

  const watchType = form.watch('type');

  React.useEffect(() => {
    form.resetField('comment');
    form.resetField('title');
    form.resetField('game');
  }, [watchType, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const resp = await fetch('/api/submit-feedback', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'Application/JSON',
      },
    });

    setIsLoading(false);

    const data = (await resp.json()) as {
      error?: 'title_missing' | 'game_missing' | 'comment_missing';
    };

    if (data?.error) {
      switch (data.error) {
        case 'title_missing':
          form.setError('title', { message: 'Title is required.' });
          break;
        case 'comment_missing':
          form.setError('comment', { message: 'Comment is required.' });
          break;
        case 'game_missing':
          form.setError('game', { message: 'Game is required.' });
          break;
      }
    }

    if (resp.status === 200) {
      notify({
        message: 'Feedback submitted',
        data: { description: 'Thank you for your feedback.' },
      });
      modal.close();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of feedback you want to submit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general">General feedback</SelectItem>
                  <SelectItem value="game-request">Game request</SelectItem>
                  <SelectItem value="bug-report">Bug report</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {watchType === 'general' && (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <Textarea className="resize-none" {...field} rows={8} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {watchType === 'game-request' && (
          <>
            <FormField
              control={form.control}
              name="game"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {watchType === 'bug-report' && (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report title</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe the bug</FormLabel>
                  <FormDescription>Please describe the issue in as much detail as possible.</FormDescription>
                  <Textarea className="resize-none" {...field} rows={8} />
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </>
        )}
        <Button className="self-end" type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackModal;
