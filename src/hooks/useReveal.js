import { useEffect, useRef, useState } from "react";

/**
 * useReveal — attaches an IntersectionObserver with a calibrated bottom inset
 * (-24% of viewport) so animations trigger right as the section enters the user's
 * primary line of sight, ensuring animations are clearly visible and never
 * finish prematurely before the user scrolls to them.
 */
export default function useReveal(threshold = 0.15, rootMargin = "0px 0px -24% 0px") {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
