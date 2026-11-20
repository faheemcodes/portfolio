import { useEffect, useRef, useState } from "react";

/**
 * useReveal — attaches an IntersectionObserver to a ref with a bottom
 * rootMargin inset (-16% from the bottom of the screen) on desktop.
 * On mobile devices (<= 768px), immediately marks visible to eliminate
 * scroll lag and delays outside of the Hero & Preload sections.
 */
export default function useReveal(threshold = 0.22, rootMargin = "0px 0px -16% 0px") {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setIsVisible(true);
      return undefined;
    }

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
