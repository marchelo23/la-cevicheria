/**
 * ==========================================================================
 * Scroll Effects JS - Especialista en Apariciones Visuales y Paralaje
 * ==========================================================================
 * Optimiza la experiencia del usuario agregando animaciones a los
 * componentes a medida que entran al viewport y crea profundidad
 * mediante efectos de paralaje controlados en el Hero.
 */

const ScrollEffectsModule = (() => {

    /**
     * Inicialización del módulo de ScrollEffects.
     * Crea un IntersectionObserver que supervisa múltiples elementos
     * y muta el Hero según el desplazamiento del usuario verticalmente.
     */
    const init = () => {
        // Obtenemos una lista colectiva de nodos DOM base que requieren aparición
        const fadeElements = document.querySelectorAll('.section-title, .card, .sucursal-card, .promo-card, .nosotros-text, .form-container');

        // Aplicamos clase CSS inicial (opacidad 0, translate Y compensado)
        fadeElements.forEach(el => {
            el.classList.add('fade-in');
        });

        // Configuramos la sensibilidad del observer (Intersectión Observer API)
        const appearOptions = {
            threshold: 0.15, // Porcentaje de elemento visible necesario (>15%) para accionar evento
            rootMargin: "0px 0px -50px 0px" // Reducción ligera pre-borde de ventana
        };

        /**
         * Instancia de IntersectionObserver encargado de trigger el efecto fade
         * @param {IntersectionObserverEntry[]} entries Colección supervisada
         * @param {IntersectionObserver} observer Referencia autoasignada
         */
        const appearOnScroll = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return; // Ignorar el callback si no ha intersectado
                } else {
                    entry.target.classList.add('visible'); // Activar transición CSS respectiva
                    observer.unobserve(entry.target); // Detener seguimiento al ser un efecto one-shot
                }
            });
        }, appearOptions);

        // Agregamos todo el conjunto de nodos previamente configurados a la vigilancia
        fadeElements.forEach(el => {
            appearOnScroll.observe(el);
        });

        // -------------------------------------------------------------
        // EFECTO PARALAJE BÁSICO EN HERO SECTION
        // -------------------------------------------------------------
        const heroContent = document.querySelector('.hero-content');

        if (heroContent) {
            // Escuchar el scrolling del navegador y ejecutar cálculos de opacidad matemáticos
            window.addEventListener('scroll', () => {
                const scrollPos = window.scrollY;

                // Limitar ejecución únicamente en zona superior
                if (scrollPos < 600) {
                    // Cómputo matemático progresivo que degrada opacidad y empuja hacia abajo
                    const opacity = 1 - (scrollPos / 400);
                    const transformY = scrollPos * 0.4; // Multiplicador paralaje de retardo visual

                    heroContent.style.opacity = Math.max(0, opacity);
                    heroContent.style.transform = `translateY(${transformY}px)`;
                }
            }, { passive: true }); // Acelera rendimiento interno del motor JS
        }
    };

    /**
     * Publicación de interfaz de API pública
     */
    return {
        init
    };
})();
