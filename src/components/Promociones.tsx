import { useRef, useEffect, useState } from 'react';

interface Promo {
  img: string;
  alt: string;
  title: string;
  desc: string;
}

const PROMOS: Promo[] = [
  {
    img: '/assets/images/promociones/carne.jpg',
    alt: 'Promo 1',
    title: 'Martes de Ceviche',
    desc: '2x1 en Ceviche Clásico Salvadoreño',
  },
  {
    img: '/assets/images/promociones/pinchos.jpg',
    alt: 'Promo 2',
    title: 'Jueves Mar y Tierra',
    desc: 'Postre gratis en la compra del Volcán',
  },
  {
    img: '/assets/images/promociones/pizza.jpg',
    alt: 'Promo 3',
    title: 'Happy Hour Diario',
    desc: 'Bebidas nacionales a mitad de precio de 5pm a 7pm',
  },
  {
    img: '/assets/images/promociones/chicharron.jpg',
    alt: 'Promo 4',
    title: 'Finde Familiar',
    desc: 'Paquete familiar con 20% de descuento',
  },
];

export default function Promociones() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  // Duplicamos las promos para el loop infinito
  const allPromos = [...PROMOS, ...PROMOS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Desactivar scroll-snap nativo para control JS
    track.style.scrollBehavior = 'auto';
    track.style.scrollSnapType = 'none';

    let animId: number;
    const scrollSpeed = 1;

    const autoScroll = () => {
      if (!isHovered && track) {
        track.scrollLeft += scrollSpeed;
        const maxScroll = track.scrollWidth / 2;
        if (track.scrollLeft >= maxScroll) {
          track.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(autoScroll);
    };

    animId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  return (
    <section id="promociones" className="section promociones-section animated-bg">
      <div className="promociones-overlay" />
      {/* Burbujas decorativas */}
      <div className="bubbles-container">
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
      </div>

      <div className="container relative-z">
        <h2 className="section-title">Promociones Especiales</h2>
        <div
          className="snap-carousel"
          ref={trackRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {allPromos.map((p, i) => (
            <div className="promo-card" key={`${p.title}-${i}`}>
              <img src={p.img} alt={p.alt} className="promo-img" />
              <div className="promo-card-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
