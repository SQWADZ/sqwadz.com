'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useModal } from '@/components/modals-provider';
import FeedbackModal from '@/components/feedback-modal';

const HeaderFeedbackButton: React.FC = () => {
  const modal = useModal();

  return (
    <Button variant="outline" onClick={() => modal.open({ title: 'Give feedback', children: <FeedbackModal /> })}>
      <FontAwesomeIcon icon={faComment} size="lg" />
      Feedback
    </Button>
  );
};

export default HeaderFeedbackButton;
