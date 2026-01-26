# Documentación de la Práctica: CineFan Web

## 1. Tabla de Pruebas

A continuación se detallan las pruebas realizadas para verificar el correcto funcionamiento de los requisitos solicitados (Modo Oscuro, localStorage, Validaciones y Notificaciones).

| ID | Prueba | Pasos Realizados | Resultado Esperado | Estado |
|:--:|:-------|:-----------------|:-------------------|:------:|
| **01** | **Modo Oscuro y Texto Botón** | 1. Cargar la página.<br>2. Clic en "Modo Oscuro". | El fondo cambia a oscuro (#121212), los textos a blanco y el botón cambia a "Modo Claro". | ✅ PASÓ |
| **02** | **Persistencia (localStorage)** | 1. Activar Modo Oscuro.<br>2. Recargar la página (`F5`). | La página debe mantenerse en **Modo Oscuro** al recargar sin intervención del usuario. | ✅ PASÓ |
| **03** | **Botón Limpiar y Toast** | 1. Escribir datos en el formulario.<br>2. Clic en "Limpiar". | Se borran los campos, se eliminan errores visuales y aparece un **Toast (Notificación)** gris indicando "Limpiado". | ✅ PASÓ |
| **04** | **Validación Incorrecta** | 1. Dejar campos vacíos o poner números en el nombre.<br>2. Clic en "Registrarme". | El formulario **NO** se envía. Aparecen textos rojos de error bajo los campos inválidos. | ✅ PASÓ |
| **05** | **Validación Correcta y Envío** | 1. Rellenar todos los datos correctamente (Nombre texto, +18 años, Checkbox aceptado).<br>2. Clic en "Registrarme". | Aparece **Toast Verde** de éxito y se muestra el objeto usuario en la consola (F12). | ✅ PASÓ |
| **06** | **Tabla Dinámica y Resaltado** | 1. Seleccionar un género en el formulario (ej. Sci-Fi). | La tabla se repuebla y las filas de ese género se resaltan en color amarillo/naranja. | ✅ PASÓ |
| **07** | **Galería Modal (Zoom)** | 1. Hacer clic en una imagen del carrusel pequeño. | Se abre una ventana modal mostrando la imagen en tamaño grande. | ✅ PASÓ |
| **08** | **Personalización Color Tabla** | 1. Seleccionar un color en el input `type="color"`. | El encabezado de la tabla cambia instantáneamente al color seleccionado. | ✅ PASÓ |

---

## 2. Documentación Técnica y Capturas

### A. Implementación del Modo Oscuro
Se ha implementado una clase CSS `.dark-mode` que sobrescribe los colores de fondo y texto. Mediante JavaScript, se alterna esta clase en el `body` y se guarda la preferencia en `localStorage`.

**Captura del Modo Claro vs Modo Oscuro:**

> *[INSERTA AQUÍ TU CAPTURA DE PANTALLA MOSTRANDO LA WEB EN MODO OSCURO]*
> `![Modo Oscuro](img/modo_oscuro.png)`

---

### B. Validaciones y Formulario
El formulario cuenta con validaciones nativas de HTML5 (`type="email"`, `required`) y validaciones personalizadas en JavaScript:
1.  **Nombre:** Uso de `RegExp` para evitar números.
2.  **Edad:** Cálculo de fechas para asegurar que el usuario es mayor de 18 años.
3.  **Términos:** Verificación obligatoria del checkbox.

**Captura de Errores de Validación:**

> *[INSERTA AQUÍ TU CAPTURA MOSTRANDO LOS CAMPOS EN ROJO Y MENSAJES DE ERROR]*
> `![Validaciones](img/validaciones.png)`

---

### C. Notificaciones (Toasts)
Para mejorar la experiencia de usuario (UX) sin ser intrusivos (evitando `alert()`), se han utilizado los componentes **Toast de Bootstrap**.

1.  **Toast Gris:** Al limpiar el formulario.
2.  **Toast Verde:** Al enviar el formulario correctamente.

**Captura del Toast de Éxito:**

> *[INSERTA AQUÍ TU CAPTURA MOSTRANDO LA NOTIFICACIÓN VERDE DE "ENVIADO CORRECTAMENTE"]*
> `![Toast Exito](img/toast_exito.png)`

---

### D. Interactividad Avanzada (DOM)
Se añadieron funcionalidades extra para enriquecer la interfaz:
* **Tabla Dinámica:** Se genera mediante un Array de objetos (`peliculas`).
* **Modal de Imágenes:** Al hacer clic en el carrusel, la imagen se transfiere al `src` de un modal.
* **Selector de Color:** Permite cambiar el estilo del `thead` en tiempo real.

**Captura de la Consola (Array de Usuarios):**
> `![Consola Array](Array.png)`

### E. Depuración (Breakpoint)
Tal y como se solicitó en la práctica, se realizó una depuración para verificar la creación del objeto usuario.

**Explicación:**
Se colocó un *breakpoint* en la línea `arrayUsuarios.push(nuevoUsuario)`. Esto detuvo la ejecución y permitió inspeccionar en la sección **Scope** que las variables `nombre`, `email` y `suscripcion` tenían los valores correctos antes de guardarse.

**Captura del Breakpoint en DevTools:**
> `![Breakpoint](Breakpoint.png)`