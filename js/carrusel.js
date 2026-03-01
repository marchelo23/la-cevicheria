/**
 * ==========================================================================
 * Carousel JS - Lógica del Carrusel Escalable y Dinámico
 * ==========================================================================
 * Este módulo administra el comportamiento interactivo de dos componentes:
 * 1. Carrusel de Platillos (control manual mediante botones prev/next).
 * 2. Carrusel de Promociones (desplazamiento continuo estilo marquee/loop).
 */

const CarouselModule = (() => {

    /**
     * Inicializa el Carrusel Manual de Platillos Destacados.
     * Permite desplazamiento suave horizontal calculado dinámicamente según el tamaño de las tarjetas.
     */
    const initPlatillos = () => {
        const track = document.getElementById('platillos-track');
        const prevBtn = document.getElementById('platillos-prev');
        const nextBtn = document.getElementById('platillos-next');

        // Verificamos si los elementos existen para evitar errores en otras páginas
        if (!track || !prevBtn || !nextBtn) return;

        /**
         * Calcula el ancho exacto por el que se debe desplazar el carrusel.
         * Toma el ancho del primer elemento visible más el respectivo 'gap' definido en CSS.
         * @returns {number} Píxeles a desplazar.
         */
        const getScrollAmount = () => {
            const firstItem = track.firstElementChild;
            if (!firstItem) return 0;
            // Retornamos cliente width + gap (aprox 2rem ~ 32px)
            return firstItem.clientWidth + 32;
        };

        // Event listener para botón Anterior
        prevBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Event listener para botón Siguiente
        nextBtn.addEventListener('click', () => {
            track.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        /**
         * Actualiza el estado visual de los botones de control.
         * Si el carrusel está al inicio, desactiva el botón de "anterior".
         * Si llegó al final, desactiva el botón de "siguiente".
         */
        const updateButtons = () => {
            const isAtStart = track.scrollLeft <= 0;
            const isAtEnd = Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 5;

            // Manejo de Opacidad e Interactividad para el botón PREV
            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            prevBtn.style.cursor = isAtStart ? 'default' : 'pointer';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

            // Manejo de Opacidad e Interactividad para el botón NEXT
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            nextBtn.style.cursor = isAtEnd ? 'default' : 'pointer';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        };

        // Sincronizar actualización de botones al hacer scroll manual y resize
        track.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons, { passive: true });

        // Ejecución inicial deferida asegurando cálculos correctos post-renderizado flexbox
        setTimeout(updateButtons, 100);
    };

    /**
     * Inicializa el Carrusel de Promociones con Loop Infinito.
     * Genera un efecto fluido clonando elementos y simulando marquee interactivo
     * que pausa al interactuar.
     */
    const initPromos = () => {
        const track = document.querySelector('.snap-carousel');
        if (!track) return;

        let isHovered = false;
        let animationId;
        const scrollAmount = 1; // Unidades de píxeles avanzadas por cada frame renderizado

        // Clonamos los elementos DOM originales para construir la secuencia de bucle
        const currentItems = Array.from(track.children);
        currentItems.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        // Eliminamos scroll behaviors CSS nativos para ceder control granular preciso al JS
        track.style.scrollBehavior = 'auto';
        track.style.scrollSnapType = 'none';

        /**
         * Función recursiva que corre en cada ciclo del repintado de pantalla.
         * Avanza el nivel de scroll y reinicia fluidamente al superar el punto medio (clones).
         */
        const scrollAutomatically = () => {
            if (!isHovered) {
                track.scrollLeft += scrollAmount;
                // Si visualizamos toda la primera mitad original, resetear bruscamente sin animación
                // al punto inicial produciendo el loop perfecto invisible
                const maxScrollLeft = track.scrollWidth / 2;
                if (track.scrollLeft >= maxScrollLeft) {
                    track.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(scrollAutomatically);
        };

        // Gestión de eventos para soportar pausa al pasar el mouse por encima o tocar en mobile
        track.addEventListener('mouseenter', () => isHovered = true);
        track.addEventListener('mouseleave', () => isHovered = false);
        track.addEventListener('touchstart', () => isHovered = true, { passive: true });
        track.addEventListener('touchend', () => isHovered = false);

        // Disparo inicial de la animación infinita
        scrollAutomatically();
    };

    /**
     * Función principal de inicialización consolidata del módulo
     */
    const init = () => {
        initPlatillos();
        initPromos();
    };

    // Revealing Module Pattern API
    return {
        init
    };
})();
