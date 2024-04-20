'use client';

import React from 'react';
import { useModal } from '@/components/modals-provider';
import FeedbackModal from '@/components/feedback-modal';

const GameRequestButton: React.FC = () => {
  const modal = useModal();

  return (
    <span
      className="text-primary hover:cursor-pointer hover:underline"
      onClick={() => modal.open({ title: 'Give feedback', children: <FeedbackModal type="game-request" /> })}
    >
      Request it
    </span>
  );
};

export default GameRequestButton;
