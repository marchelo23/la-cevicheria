import { useEffect, useRef } from 'react';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  // Efecto parallax: opacidad y desplazamiento del logo al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const scrollPos = window.scrollY;
      if (scrollPos < 600) {
        const opacity = 1 - scrollPos / 400;
        const transformY = scrollPos * 0.4;
        el.style.opacity = String(Math.max(0, opacity));
        el.style.transform = `translateY(${transformY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="hero" className="hero-section">
      <div className="video-container">
        <video autoPlay muted loop playsInline className="hero-video">
          <source
            src="/assets/videos/390D2BBB-0F82-4F94-A650-8EDE9FA1C6B5.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="hero-content" ref={contentRef}>
        <img
          src="/assets/images/logos/LB.png"
          alt="La Cevichería Logo"
          className="hero-logo"
        />
      </div>
    </header>
  );
}
