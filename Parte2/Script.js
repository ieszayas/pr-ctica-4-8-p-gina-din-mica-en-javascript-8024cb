document.addEventListener('DOMContentLoaded', () => {
    
    //DATOS
    // 1. Array de objetos con los datos de las películas (incluye categoría para el resaltado)
    const peliculas = [
        { titulo: "Matrix", precio: 9.99, categoria: "sci-fi" },
        { titulo: "Avatar", precio: 12.50, categoria: "sci-fi" },
        { titulo: "Joker", precio: 8.99, categoria: "drama" }, // Categoría extra
        { titulo: "Alien", precio: 7.50, categoria: "horror" },
        { titulo: "Coco", precio: 10.00, categoria: "infantil" },
        { titulo: "Love Actually", precio: 10.00, categoria: "romcom" } // Para probar comedia romántica
    ];

    // Array para guardar los usuarios registrados
    const arrayUsuarios = [];

    // Referencias al DOM
    const tablaBody = document.getElementById('tablaPeliculas');
    const selectGenero = document.getElementById('genero');
    const formulario = document.getElementById('miFormulario');
    const btnModoOscuro = document.getElementById('btnModoOscuro');
    
    // Toasts
    const toastLimpiar = new bootstrap.Toast(document.getElementById('toastLimpiar'));
    const toastExito = new bootstrap.Toast(document.getElementById('toastExito'), { delay: 4000 });

    // --- FUNCIONES ---

    // 2. Función para generar la tabla dinámicamente
    // Recibe el género seleccionado para saber qué resaltar
    const cargarTabla = (generoResaltado = "") => {
        tablaBody.innerHTML = ""; // Limpiar tabla antes de renderizar

        peliculas.forEach(peli => {
            // Crear fila
            const fila = document.createElement('tr');
            
            // 3. Lógica de Resaltado: Si la categoría coincide, añadimos clase de Bootstrap
            if (generoResaltado === peli.categoria) {
                fila.classList.add('table-warning'); // Color amarillo/naranja para resaltar
                // Nota: En modo oscuro, table-warning se adapta si usas Bootstrap estándar, 
                // o puedes definir tu propia clase CSS.
            }

            fila.innerHTML = `
                <td>${peli.titulo}</td>
                <td>${peli.precio.toFixed(2)}€</td>
                <td><button class="btn btn-sm btn-outline-primary">Ver</button></td>
            `;
            
            tablaBody.appendChild(fila);
        });
    };

    // --- EVENTOS ---

    // Cargar tabla al inicio
    cargarTabla();

    // Evento para resaltar cuando el usuario cambia el género en el select
    selectGenero.addEventListener('change', (e) => {
        const generoSeleccionado = e.target.value;
        cargarTabla(generoSeleccionado);
    });

    // Evento Modo Oscuro (Parte 1)
    btnModoOscuro.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const esOscuro = document.body.classList.contains('dark-mode');
        
        btnModoOscuro.textContent = esOscuro ? 'Modo Claro' : 'Modo Oscuro';
        btnModoOscuro.classList.toggle('btn-light');
        btnModoOscuro.classList.toggle('btn-outline-light');
        
        localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
    });

    // Evento Reset (Parte 1)
    document.getElementById('btnLimpiar').addEventListener('click', () => {
        formulario.reset();
        formulario.classList.remove('was-validated');
        cargarTabla(""); // Quitar resaltado al limpiar
        toastLimpiar.show();
    });

    // Evento Submit (Parte 1 y 2)
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // --- VALIDACIONES (Parte 1) ---
        let esValido = true;
        const nombre = document.getElementById('nombre');
        const fecha = document.getElementById('fechaNacimiento');
        const terminos = document.getElementById('terminos');
        const genero = document.getElementById('genero');
        const email = document.getElementById('email');

        // Reset visual
        [nombre, fecha, terminos, genero].forEach(el => el.classList.remove('is-invalid'));

        // Val. Nombre
        if (!/^[a-zA-Záéíóú\s]+$/.test(nombre.value.trim())) {
            nombre.classList.add('is-invalid');
            document.getElementById('error-nombre').textContent = "Sin números ni símbolos.";
            esValido = false;
        }
        
        // Val. Fecha (+18)
        if (fecha.value) {
            const edad = new Date().getFullYear() - new Date(fecha.value).getFullYear();
            if (edad < 18) {
                fecha.classList.add('is-invalid');
                esValido = false;
            }
        } else {
            fecha.classList.add('is-invalid'); 
            esValido = false;
        }

        // Val. Términos
        if (!terminos.checked) {
            terminos.classList.add('is-invalid');
            esValido = false;
        }

        // --- ACCIONES SI ES VÁLIDO (Parte 2) ---
        if (esValido) {
            // 4. Crear Objeto Usuario
            const nuevoUsuario = {
                nombre: nombre.value,
                email: email.value,
                fechaNacimiento: fecha.value,
                generoFavorito: genero.value,
                suscripcion: document.querySelector('input[name="suscripcion"]:checked').value,
                fechaRegistro: new Date().toISOString()
            };

            // 5. Guardar en Array
            arrayUsuarios.push(nuevoUsuario);

            // 6. Mostrar por consola
            console.clear(); // Limpia consola para ver claro el último envío
            console.log("Usuario registrado correctamente:");
            console.table(arrayUsuarios);

            toastExito.show();
        }
    });

    // Cargar tema guardado
    if (localStorage.getItem('tema') === 'oscuro') {
        btnModoOscuro.click();
    }
});