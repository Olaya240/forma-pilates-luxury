import { useState, useEffect, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number; // Speed multiplier (0.5 = half speed, 2 = double speed)
  direction?: 'up' | 'down';
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const { speed = 0.5, direction = 'up' } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const elementTop = ref.current.getBoundingClientRect().top;
      const elementHeight = ref.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate if element is in viewport
      const isInViewport = elementTop < windowHeight && elementTop + elementHeight > 0;

      if (isInViewport) {
        // Calculate parallax offset
        const scrolled = windowHeight - elementTop;
        const rate = scrolled * speed;
        const parallaxOffset = direction === 'up' ? -rate : rate;
        
        setOffset(parallaxOffset);
      }
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref, speed, direction]);

  return offset;
};
