document.addEventListener('DOMContentLoaded', () => {
    
    // MODO OSCURO
    const btnModoOscuro = document.getElementById('btnModoOscuro');
    const body = document.body;

    // Función para aplicar el modo
    const activarModoOscuro = (activar) => {
        if (activar) {
            body.classList.add('dark-mode');
            btnModoOscuro.textContent = 'Modo Claro';
            btnModoOscuro.classList.replace('btn-outline-light', 'btn-light');
            localStorage.setItem('tema', 'oscuro');
        } else {
            body.classList.remove('dark-mode');
            btnModoOscuro.textContent = 'Modo Oscuro';
            btnModoOscuro.classList.replace('btn-light', 'btn-outline-light');
            localStorage.setItem('tema', 'claro');
        }
    };

    // Comprobar preferencia guardada al cargar
    if (localStorage.getItem('tema') === 'oscuro') {
        activarModoOscuro(true);
    }

    // Listener del botón
    btnModoOscuro.addEventListener('click', () => {
        const esOscuro = body.classList.contains('dark-mode');
        activarModoOscuro(!esOscuro);
    });


    // 2. GESTIÓN DEL FORMULARIO 
    const formulario = document.getElementById('miFormulario');
    const btnLimpiar = document.getElementById('btnLimpiar');

    // Inicializar Toasts de Bootstrap
    const toastLimpiarEl = document.getElementById('toastLimpiar');
    const toastExitoEl = document.getElementById('toastExito');
    const toastLimpiar = new bootstrap.Toast(toastLimpiarEl);
    const toastExito = new bootstrap.Toast(toastExitoEl, { delay: 4000 }); // Duración de 4s

    // Funcionalidad Botón Limpiar
    btnLimpiar.addEventListener('click', () => {
        formulario.reset();
        // Limpiar clases de validación visual si existen
        formulario.classList.remove('was-validated'); 
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        
        toastLimpiar.show();
    });

    // 3. VALIDACIONES Y ENVÍO 
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Detener envío por defecto
        
        let esValido = true;
        
        // Elementos a validar
        const inputNombre = document.getElementById('nombre');
        const inputFecha = document.getElementById('fechaNacimiento');
        const checkTerminos = document.getElementById('terminos');
        
        // Resetear estados visuales previos
        [inputNombre, inputFecha, checkTerminos].forEach(el => el.classList.remove('is-invalid'));

        // VALIDACIÓN 1: Nombre
        // Regex: Solo letras y espacios
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regexNombre.test(inputNombre.value.trim())) {
            inputNombre.classList.add('is-invalid');
            document.getElementById('error-nombre').textContent = "El nombre no puede contener números ni símbolos.";
            esValido = false;
        }

        // VALIDACIÓN 2: Rango de Fechas (Mayor de 18 años)
        if (!inputFecha.value) {
            inputFecha.classList.add('is-invalid');
            esValido = false;
        } else {
            const fechaNac = new Date(inputFecha.value);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNac.getFullYear();
            const diferenciaMes = hoy.getMonth() - fechaNac.getMonth();
            
            // Ajuste fino de edad por mes/día
            if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < fechaNac.getDate())) {
                edad--;
            }

            if (edad < 18) {
                inputFecha.classList.add('is-invalid');
                document.getElementById('error-fecha').textContent = "Debes ser mayor de 18 años para registrarte.";
                esValido = false;
            }
        }

        // VALIDACIÓN 3: Checkbox obligatorio
        if (!checkTerminos.checked) {
            checkTerminos.classList.add('is-invalid');
            esValido = false;
        }

        // VALIDACIÓN 4: Select no puede estar en la opción por defecto
        const selectGenero = document.getElementById('genero');
        selectGenero.classList.remove('is-invalid');
        if (selectGenero.value === "") {
            selectGenero.classList.add('is-invalid');
            esValido = false;
        }

        // Si todo es correcto
        if (esValido) {
            toastExito.show();
        }
    });
});