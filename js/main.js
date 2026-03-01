/**
 * ==========================================================================
 * Main JS - Punto de Entrada Principal
 * ==========================================================================
 * Este módulo sirve como orquestador central de la aplicación.
 * Se encarga de inicializar todos los submódulos independientes (Menú,
 * Carrusel, Formulario, Efectos de Scroll) una vez que el DOM está listo.
 * De esta forma, mantiene un código organizado y libre de dependencias
 * globales innecesarias.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Log inicial para verificar la ejecución correcta del script
    console.log("🌊 La Cevichería App Inicializada");

    /**
     * Inicialización del Módulo de Menú
     * Controla la apertura y cierre del menú modal flotante.
     */
    if (typeof MenuModule !== 'undefined') {
        MenuModule.init();
    }

    /**
     * Inicialización del Módulo de Carrusel
     * Controla tanto el carrusel de platillos destacados como el
     * loop infinito de la sección de promociones.
     */
    if (typeof CarouselModule !== 'undefined') {
        CarouselModule.init();
    }

    /**
     * Inicialización del Módulo de Formulario
     * Controla las validaciones de campos (nombre, teléfono) y
     * la simulación de envío en la sección de Bolsa de Trabajo.
     */
    if (typeof FormModule !== 'undefined') {
        FormModule.init();
    }

    /**
     * Inicialización del Módulo de Efectos de Scroll
     * Controla el Fade-In de los elementos a medida que el usuario
     * baja en la página y el efecto paralaje del Hero.
     */
    if (typeof ScrollEffectsModule !== 'undefined') {
        ScrollEffectsModule.init();
    }
});
