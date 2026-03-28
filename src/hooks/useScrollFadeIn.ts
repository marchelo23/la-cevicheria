import { useEffect } from 'react';

/**
 * Custom hook que aplica la clase 'fade-in' a elementos que coincidan
 * con el selector y usa IntersectionObserver para añadir 'visible'
 * cuando entran al viewport.
 */
export function useScrollFadeIn(selector: string): void {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selector]);
}
