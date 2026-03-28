import FloatingMenu from './components/FloatingMenu';
import Hero from './components/Hero';
import Platillos from './components/Platillos';
import Promociones from './components/Promociones';
import Nosotros from './components/Nosotros';
import Ubicacion from './components/Ubicacion';
import Postulaciones from './components/Postulaciones';
import Footer from './components/Footer';
import { useScrollFadeIn } from './hooks/useScrollFadeIn';

export default function App() {
  // Aplicar fade-in a los elementos que aparecen al hacer scroll
  useScrollFadeIn(
    '.section-title, .card, .sucursal-card, .promo-card, .nosotros-text, .form-container'
  );

  return (
    <>
      <FloatingMenu />
      <Hero />

      <main className="main-content-wrapper">
        <div className="main-content-overlay" />
        <Platillos />
        <Promociones />
        <Nosotros />
        <Ubicacion />
        <Postulaciones />
      </main>

      <Footer />
    </>
  );
}
