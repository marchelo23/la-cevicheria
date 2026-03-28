import { useState, useEffect, useCallback } from 'react';

const NAV_ITEMS = [
  { href: '#hero', label: 'Inicio' },
  { href: '#platillos', label: 'Platillos' },
  { href: '#promociones', label: 'Promociones' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#postulaciones', label: 'Trabaja con nosotros' },
];

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) close();
    },
    []
  );

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  return (
    <>
      <button
        id="btn-menu"
        className="floating-menu-btn"
        aria-label="Abrir menú de navegación"
        onClick={open}
      >
        <span className="menu-icon">☰</span>
      </button>

      <div
        id="nav-modal"
        className={`modal-overlay${isOpen ? '' : ' is-hidden'}`}
        onClick={handleOverlayClick}
      >
        <nav className="modal-content">
          <button
            className="close-modal-btn"
            aria-label="Cerrar menú"
            onClick={close}
          >
            &times;
          </button>
          <ul className="modal-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link" onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
