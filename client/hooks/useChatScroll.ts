// Borrowed from:
// https://github.com/AntonioErdeljac/next13-discord-clone/blob/237a649e23ed041c670c76ebb4a75c4b09122823/hooks/use-chat-scroll.ts

import { useEffect, useRef, useState } from 'react';

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore?: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({ chatRef, shouldLoadMore, loadMore, count }: ChatScrollProps) => {
  const initRef = useRef(false);

  useEffect(() => {
    const topDiv = chatRef?.current;

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topDiv?.addEventListener('scroll', handleScroll);

    return () => {
      topDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const topDiv = chatRef.current;
    const shouldAutoScroll = () => {
      if (!topDiv) return;

      const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

      if (distanceFromBottom <= 100) {
        topDiv.scrollTop = topDiv.scrollHeight;
      }

      return distanceFromBottom <= 100;
    };

    if (!chatRef.current) return;

    if (!initRef.current && chatRef.current.childElementCount > 0) {
      initRef.current = true;
      chatRef.current.scrollTop = chatRef.current.scrollHeight;

      return;
    }

    shouldAutoScroll();
  }, [chatRef, count, initRef]);
};
