import { useEffect, useRef, useState } from "react";

/**
 * useReveal — attaches an IntersectionObserver to a ref with a bottom
 * rootMargin inset (-16% from the bottom of the screen) so animations
 * trigger only when the user actually scrolls the element comfortably into
 * their line of sight—never hidden at the very bottom edge of the screen.
 */
export default function useReveal(threshold = 0.22, rootMargin = "0px 0px -16% 0px") {
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
