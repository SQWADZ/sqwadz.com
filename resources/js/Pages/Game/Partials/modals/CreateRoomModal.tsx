import React from 'react';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useModal } from '@/Components/ModalsProvider';
import FormField from '@/Components/FormField';

const CreateRoomModal: React.FC<{ game: string }> = ({ game }) => {
  const modal = useModal();
  const form = useForm({
    activity: '',
    slots: 2,
    password: '',
    duration: 1,
    game,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    form.post('/rooms', {
      onSuccess: () => {
        modal.close();
      },
    });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FormField
        id="activity"
        label="Activity"
        description="Main activity of the room"
        error={form.errors.activity}
        value={form.data.activity}
        onChange={(e) => form.setData('activity', e.target.value)}
        required
      />

      <FormField
        id="slots"
        label="Slots"
        description="Number of members allowed in the room (minimum 2)"
        error={form.errors.slots}
        value={form.data.slots}
        onChange={(e) => form.setData('slots', e.target.value)}
        required
      />

      <FormField
        id="password"
        label="Password"
        description="Optional password for your room"
        error={form.errors.password}
        value={form.data.password}
        onChange={(e) => form.setData('password', e.target.value)}
        type="password"
      />

      <FormField
        id="duration"
        label="Duration"
        description="Sets the room duration up to a maximum of 6 hours. Verified creators only."
        error={form.errors.duration}
        value={form.data.duration}
        onChange={(e) => form.setData('duration', e.target.value)}
      />

      <Button className="self-end" type="submit">
        {form.processing ? 'Loading...' : 'Create a room'}
      </Button>
    </form>
  );
};

export default CreateRoomModal;
