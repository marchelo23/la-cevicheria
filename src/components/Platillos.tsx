import { useRef, useEffect, useCallback, useState } from 'react';

interface Platillo {
  img: string;
  alt: string;
  title: string;
  desc: string;
}

const PLATILLOS: Platillo[] = [
  {
    img: '/assets/images/promociones/coctel.jpg',
    alt: 'Ceviche Clásico',
    title: 'Ceviche Clásico Salvadoreño',
    desc: 'Fresco pescado curtido con limón, cebolla morada, tomate y cilantro.',
  },
  {
    img: '/assets/images/promociones/mariscada.jpg',
    alt: 'Mar y Tierra',
    title: 'Volcán Mar y Tierra',
    desc: 'Aguachile de camarón montado sobre un corte de res a la parrilla.',
  },
  {
    img: '/assets/images/promociones/plato.jpg',
    alt: 'Coctel Mixto',
    title: 'Coctel La Cevichería',
    desc: 'Camarón, calamar y pulpo en nuestra salsa secreta de la casa.',
  },
];

export default function Platillos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const getScrollAmount = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return 0;
    return (track.firstElementChild as HTMLElement).clientWidth + 32;
  }, []);

  const updateButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 0);
    setAtEnd(
      Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 5
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons, { passive: true });
    const timer = setTimeout(updateButtons, 100);

    return () => {
      track.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
      clearTimeout(timer);
    };
  }, [updateButtons]);

  const scrollPrev = () => {
    trackRef.current?.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  };

  const scrollNext = () => {
    trackRef.current?.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  };

  return (
    <section id="platillos" className="section platillos-section">
      <div className="container">
        <h2 className="section-title">Platillos Destacados</h2>
        <div className="carousel-wrapper">
          <button
            className="carousel-btn prev-btn"
            aria-label="Anterior"
            aria-disabled={atStart}
            onClick={scrollPrev}
            style={{
              opacity: atStart ? 0.35 : 1,
              pointerEvents: atStart ? 'none' : 'auto',
            }}
          />

          <div className="carousel-track" ref={trackRef}>
            {PLATILLOS.map((p) => (
              <article className="card" key={p.title}>
                <div className="card-img-wrapper">
                  <img src={p.img} alt={p.alt} className="card-img" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-desc">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            className="carousel-btn next-btn"
            aria-label="Siguiente"
            aria-disabled={atEnd}
            onClick={scrollNext}
            style={{
              opacity: atEnd ? 0.35 : 1,
              pointerEvents: atEnd ? 'none' : 'auto',
            }}
          />
        </div>
      </div>
    </section>
  );
}
