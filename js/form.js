/**
 * ==========================================================================
 * Form JS - Validación, Manejo y Animación del Formulario de Contacto
 * ==========================================================================
 * Este módulo contiene toda la lógica relacionada con el envío del
 * formulario en la sección Postulaciones. Realiza validaciones regex estrictas
 * y procesa la interactividad asíncrona (spinner visual).
 */

const FormModule = (() => {

    /**
     * Valida la estructura estricta del nombre proveído.
     * @param {string} name - Valor capturado del input.
     * @returns {boolean} Verdadero si compila conteniendo letras y longitud mínima.
     */
    const validateName = (name) => {
        const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return name.trim().length >= 3 && re.test(name);
    };

    /**
     * Valida un formato genérico de teléfono.
     * @param {string} phone - Valor capturado numérico/símbolos permitidos.
     * @returns {boolean} Verdadero si es telefónico legítimo.
     */
    const validatePhone = (phone) => {
        const re = /^[\d\s\-+]{8,15}$/;
        return re.test(phone.trim());
    };

    /**
     * Inicialización central de nodos vinculados a formulario HTML
     */
    const init = () => {
        // Declaración consts base formulario y campos
        const form = document.getElementById('job-form');
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const positionInput = document.getElementById('position');

        // Declaración consts UI visual y feedback del usuario
        const successMessage = document.getElementById('form-success');
        const btnSubmit = form?.querySelector('.btn-submit');
        const spinner = btnSubmit?.querySelector('.spinner');
        const btnText = btnSubmit?.querySelector('.btn-text');

        if (!form) return;

        /**
         * Utilidad para remover clases CSS de estado anormal (errores UI).
         * @param {HTMLElement} inputElement - El nodo erróneo interactuado.
         */
        function clearError(inputElement) {
            inputElement.closest('.form-group').classList.remove('has-error');
        }

        // Realtime Event Listeners para feedback fluído remoción error onType
        nameInput.addEventListener('input', () => clearError(nameInput));
        phoneInput.addEventListener('input', () => clearError(phoneInput));
        positionInput.addEventListener('change', () => clearError(positionInput));

        // Secuencia principal de intercepción del envío
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Suspensión de la acción natural navegador

            let isValid = true; // Declarar bandera optimista base

            // Validación bloque 1: Nombre
            if (!validateName(nameInput.value)) {
                nameInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validación bloque 2: Teléfono
            if (!validatePhone(phoneInput.value)) {
                phoneInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validación bloque 3: Puesto Requerido
            if (positionInput.value === '') {
                positionInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Solo proceder si todas las banderas regresaron éxito
            if (isValid) {
                // Iniciar flujo visual indicando procesamiento al usuario
                btnSubmit.disabled = true;
                btnText.classList.add('hidden');
                spinner.classList.remove('hidden');
                successMessage.classList.add('hidden');

                // Simular capa de red via timeout controlado (mocking future fetch API backend)
                setTimeout(() => {
                    // Restauración status botón inicial
                    btnSubmit.disabled = false;
                    btnText.classList.remove('hidden');
                    spinner.classList.add('hidden');

                    // Despachar el mensaje agradecimiento UI
                    successMessage.classList.remove('hidden');

                    // Reset nativo borrando todos los campos poblados en form
                    form.reset();

                    // Ocultar mensaje flash alert de éxito prolongando 5s su tiempo vida
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);

                }, 1500); // 1.5s visual network latency de espera fingida
            }
        });
    };

    // Publicación API module closure
    return {
        init
    };
})();
