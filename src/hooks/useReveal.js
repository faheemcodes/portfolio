import { useEffect, useRef, useState } from "react";

/**
 * useReveal — attaches an IntersectionObserver with responsive threshold and rootMargin:
 * - On Mobile (<= 768px): Uses lighter threshold (0.08) and minimal bottom inset (-8%)
 *   so cards and headlines animate in naturally as you read, with zero pop-in delay.
 * - On Desktop: Uses calibrated inset (-16%) for a crisp, synchronized cascade.
 */
export default function useReveal(threshold, rootMargin) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const finalThreshold = threshold !== undefined ? threshold : isMobile ? 0.08 : 0.15;
    const finalRootMargin = rootMargin !== undefined ? rootMargin : isMobile ? "0px 0px -8% 0px" : "0px 0px -16% 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: finalThreshold, rootMargin: finalRootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
