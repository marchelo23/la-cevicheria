/**
 * ==========================================================================
 * Menu JS - Lógica del Modal Flotante de Navegación
 * ==========================================================================
 * Módulo encargado de administrar el estado y la interactividad del
 * menú de navegación. Implementa funciones para abrir y cerrar el modal,
 * y se asegura de prevenir el scroll del fondo cuando está abierto.
 */

const MenuModule = (() => {
    // Referencias a los elementos del DOM necesarios para el menú
    let btnMenu;
    let btnClose;
    let modalOverlay;
    let navLinks;

    // Variable de estado para rastrear si el menú está visible
    let isMenuOpen = false;

    /**
     * Función para abrir el menú modal.
     * Muestra el overlay general y desactiva el scroll del body.
     */
    const openMenu = () => {
        isMenuOpen = true;
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevenir scroll excesivo
    };

    /**
     * Función para cerrar el menú modal.
     * Oculta el overlay principal y restaura el scroll en la página.
     */
    const closeMenu = () => {
        isMenuOpen = false;
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = ''; // Restaurar scroll normal
    };

    /**
     * Manejador de eventos para el click fuera del cuadro modal (background/overlay).
     * @param {Event} e - Evento de click generado por el usuario
     */
    const handleOverlayClick = (e) => {
        if (e.target === modalOverlay) {
            closeMenu();
        }
    };

    /**
     * Inicialización del módulo.
     * Recupera los elementos HTML, establece los EventListeners principales,
     * y las interacciones de teclado y click periférico.
     */
    const init = () => {
        // Enlazar elementos del DOM
        btnMenu = document.getElementById('btn-menu');
        btnClose = document.getElementById('btn-close-modal');
        modalOverlay = document.getElementById('nav-modal');
        navLinks = document.querySelectorAll('.nav-link');

        // Validar existencia de elementos antes de asignar eventos
        if (!btnMenu || !modalOverlay) return;

        // Asignación de interactividad fundamental
        btnMenu.addEventListener('click', openMenu);
        btnClose.addEventListener('click', closeMenu);
        modalOverlay.addEventListener('click', handleOverlayClick);

        // Asegurar cierre automátio al seleccionar cualquier enlace ancla
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Habilitar cierre de menú vía teclado usando la tecla "Escape"
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
    };

    // Exponer únicamente el método de inicialización públicamente
    return {
        init
    };
})();
