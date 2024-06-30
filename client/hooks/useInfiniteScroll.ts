import { useIntersection } from '@/client/hooks/useIntersection';
import React from 'react';

export const useInfiniteScroll = (onIntersect: () => void, threshold?: number) => {
  const lastElementRef = React.useRef(null);
  const { ref, entry } = useIntersection({
    root: lastElementRef.current,
    threshold: threshold || 1.0,
  });

  React.useEffect(() => {
    if (entry && entry.isIntersecting) {
      onIntersect();
    }
  }, [entry]);

  return { ref };
};
