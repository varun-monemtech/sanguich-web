import { useState, useEffect, useCallback } from 'react';

function useElementSize() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });
  }, [ref]);

  useEffect(() => {
    if (!ref) return;

    handleSize();

    const resizeObserver = new ResizeObserver(() => handleSize());
    resizeObserver.observe(ref);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, handleSize]);

  return [setRef, size] as const;
}

export default useElementSize;