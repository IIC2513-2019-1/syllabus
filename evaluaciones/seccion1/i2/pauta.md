# Pauta I2

## Parte 1 (20 pts): Preguntas teóricas

Responde, de forma precisa, las siguientes preguntas: 

* (2 pts) ¿Por qué la dirección `IP` no puede ser utilizada para identificar a un usuario?

**R:** Porque varios dispositivos pueden acceder a internet con una misma `IP` pública.

* (2 pts) ¿En qué se traduce el agregar una propiedad a `ctx.session` en el proyecto?

**R:** En enviar un valor como *cookie*

* (2 pts) ¿Por qué algunos navegadores definen sus propias reglas de `CSS`? ¿Cómo se identifican?

**R:** Para soportar ciertos comportamientos que aún nos están definidos en el estándar. En general, trae un prefijo `-moz-`, `-webkit-`, etc.

* (2 pts) ¿En qué se diferencian las posiciones `fixed` y `absolute` en `CSS`? Menciona un ejemplo.

**R:** Ambos colocan un objeto en la posición indicada, sin embargo, en `absolute` es relativo a la página, mientras que en `fixed` es relativo a la "ventana" (*viewport*). Ejemplo, banner autito de la página de un sitio de prensa.

* (2 pts) ¿Qué papel juega el `box model` en `CSS`? ¿Qué pasa con los elementos redondos que se ven en algunos sitios web?

**R:** El `box model` es la base de `CSS`, ya que todos los elementos lo siguen. Indica dónde esta el margen, margen interior, borde y contenido. Los elementos redondos son "ilusiones".

* (2 pts) Comenta la siguiente frase: Si tengo un elemento `HTML` con un atributo `id` y, en los estilos `CSS`, tengo una regla para ese elemento `HTML` y también para el `id`. En ese caso, sólo se aplicarán las reglas que están dentro del selector de `id`.

**R:** Se aplicarán las rutas de ambas reglas, sin embargo, si hay reglas repetidas "ganarán" las que estén especificada con `id`.

* (2 pts) ¿Por qué no es buena práctica guardar directamente el identificador de usuario en las *cookies*?

**R:** Porque podría ser modificada para aparentar ser otro usuario.

* (2 pts) Indica a qué elementos aplica el siguiente código `CSS`
```css
.space .title {
  color: blue;
}
```

**R:** Todos los elementos `HTML` que tengan la clase `title` y que estén dentro de un elemento que tenga la clase `space`.

* (2 pts) ¿Tiene sentido escribir esta regla `CSS`?¿Por qué?
```css
div #title {
  background-color: red;
}
```

**R:** No, ya que el `title` es el único elemento con ese identificador.

* (2 pts) Si ya se ha verificado importancia, origen y especificidad de una regla `CSS` ¿Cómo se define si se aplica o no?

**R:** Orden de código.


## Parte 2 (40 pts): Preguntas prácticas

**NOTA:** Parte A y B en hojas separadas.

### Parte A (10 pts): Mi contador

Escriba un *middleware* que actualice un contador de visitas que se mantiene a través de cookies.

**Una solución:**

```js
function updateCounter(ctx, next) {
  const { visits } = ctx.session;
  if (!visits) {
    ctx.session.visits = 1;
  } else {
    ctx.session.visits = visits + 1;
  }
  return next();
}
```

**Pauta**:

* 2 pts por encabezado de función y retorno
* 4 pts por caso en que la *cookie* no existe
* 4 pts por caso en que se deba actualizar


### Parte B (30 pts): Publicar notas

Deberás implementar una (o varias) vista(s) y una acción de router (como en tu proyecto semestral) que permita revisar las notas publicadas (en una tabla). En el caso de un alumno, sólo debería ver su nota, pero el profesor debería poder verlas todas.

Tendrás disponible las siguientes variables:

* `ctx.state.currentUser`: Objeto que tiene la propiedad `identifier` que corresponde al RUT del usuario y `role`, que indica el rol de usuario y puede tomar el valor de `teacher` o `student`.

* `ctx.state.students`: Arreglo que contiene varios objetos `student`. Estos últimos tiene una propiedad `identifier` con el RUT, y una propiedad `grades` que es un arreglo que contiene las notas de cada usuario. Puedes suponer que todos los alumnos tienen la misma cantidad de notas, que estas van de 1 a 7 y, al menos, hay una nota y un alumno.

En la tabla de notas deberás mostrar las columnas de identificador y una columna por cada evaluación. Puedes colocarle como título, por ejemplo, "Nota N" (con N el número de evaluación).

Además deberás adjuntar (en otra tabla) el mínimo, máximo y promedio de cada evaluación. Tendrás disponibles las funciones `getMaxArray`, que recibe un arreglo de números y entrega el máximo valor, `getMinArray`, que recibe un arreglo de números y entrega el valor mínimo; y finalmente `getAvgArray` que entrega el promedio del arreglo de números recibido. Si requieres de otras funciones auxiliares, puedes utilizarlas pero debes definirlas en algún lugar de tu respuesta.

Además deberás agregar a cada tabla ciertos estilos, solo debes escribir el código, no realizar configuraciones adicionales (puedes usar Sass):

Para la tabla con las notas

* Tanto los títulos como los datos deben tener un `padding` de `10px`.
* Los títulos deben tener de color de fondo `yellow` y color de letras `blue`.

Para la tabla con el resumen

* Tanto los títulos como los datos deben tener un `padding` de `10px`.
* Los títulos deben tener de color de fondo `wheat` y color de letras `green`.

La tabla de notas deberá tener un margen inferior de `15px`.

Adicionalmente tendrás que indicar las rutas de los archivos que generes.

Por si olvidaste como escribir un router:

```js
router.get('my-route', '/', async (ctx) => {
	[...]
});
```


**Una solución:**

```js
/* /src/routes/courses.js */

router.get('grades', '/grades', async (ctx) => {
	const { currentUser, students } = ctx.state;

  const summary = { min: [], max: [], avg: [] };
  students[0].grades.forEach((grade, index) => {
    const gradesPerEval = students.map(student => student.grades[index]);
    summary.min.push(getMinArray(gradesPerEval));
    summary.max.push(getMaxArray(gradesPerEval));
    summary.avg.push(getAvgArray(gradesPerEval));
  });

  if (currentUser.role === 'teacher') {
    await ctx.render('courses/all-grades', {
      students,
      summary,
    });
  }

  const student = students
    .find(currentStudent => currentStudent.identifier === currentUser.identifier);
  await render('courses/student-grades', {
    student,
    summary,
  });
});
```

```html
<!-- /src/views/courses/student-grades.html.ejs -->
<table id="grades">
  <thead>
    <tr>
      <th>Identificador</th>
      <% student.grades.forEach((grade, index) => { %>
        <th>Nota <%= index + 1 %></th>
      <% }) %>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><%= student.identifier %></td>
      <% student.grades.forEach((grade) => { %>
        <td><%= grade %></td>
      <% }) %>
    </tr>
  </tbody>
</table>

<%- include('./summary-grades') %>
```

```html
<!-- /src/views/courses/all-grades.html.ejs -->
<table id="grades">
  <thead>
    <tr>
      <th>Identificador</th>
      <% students[0].grades.forEach((grade, index) => { %>
        <th>Nota <%= index + 1 %></th>
      <% }) %>
    </tr>
  </thead>
  <tbody>
    <% students.forEach((student) => { %>
      <tr>
        <td><%= student.identifier %></td>
        <% student.grades.forEach((grade) => { %>
          <td><%= grade %></td>
        <% }) %>
      </tr>
    <% }) %>
  </tbody>
</table>

<%- include('./summary-grades') %>
```

```html
<!-- /src/views/courses/summary-grades.html.ejs -->
<table id="summary-grades">
  <thead>
    <tr>
      <th>Indicador</th>
      <% summary.min.forEach((grade, index) => { %>
        <th>Nota <%= index + 1 %></th>
      <% }) %>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mínimo</td>
      <% summary.min.forEach((grade) => { %>
        <td><%= grade %></td>
      <% }) %>
    </tr>
    <tr>
      <td>Máximo</td>
      <% summary.max.forEach((grade) => { %>
        <td><%= grade %></td>
      <% }) %>
    </tr>
    <tr>
      <td>Promedio</td>
      <% summary.avg.forEach((grade) => { %>
        <td><%= grade %></td>
      <% }) %>
    </tr>
  </tbody>
</table>
```

```css
/* /src/assets/styles/courses.scss */

#grades th,td {
  padding: 10px;
}

#grades th {
  background-color: yellow;
  color: blue;
}

#summary-grades th,td{
  padding: 10px;
}

#summary-grades th {
  background-color: wheat;
  color: green;
}
```

**Pauta**:

**NOTA:** La respuesta puede tener errores menores de sintaxis, o nombres descriptivos para ciertos métodos (o propiedades) olvidado(a)s.

Las vistas deben estar bien conformadas, con todos sus elementos de apertura y cierre, al igual que el CSS.

* 10 pts por router
  * 6 pts por calcular las estadísticas (trasladar a donde se haya hecho. Descontar 2 pts si no lo hizo en el router)
  * 1.5 pts por el caso de render a todas las notas
  * 1.5 pts por el caso de render a un alumno en particular
  * 1 pt por router bien conformado

* 5 pts por vista para todas las notas
* 5 pts por vista para las notas de un alumno
* 5 pts por la tabla de resumen
* 4 pts por CSS
* 1 pt por nombres de archivos
