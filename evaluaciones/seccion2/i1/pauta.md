# Pauta I1

## Parte 1 (20 pts): Preguntas teóricas

* (2 pts) Indique un ejemplo que demuestre que `CSS` tiene herencia.

**R:** El ejemplo mencionado en clases correspondía a la letra del sitio, pero también podrían haber otros.

* (2 pts) Comente la siguiente frase: Al resultado de una función marcada con `async` no puede aplicarse un método `then` ya que siempre devuelve un valor.

**R:** Lo que retorna una función `async` es una promesa, por eso sí se le puede aplicar la función `then`

* (2 pts) Indica si el siguiente código valida que siempre la propiedad indicada tiene valor:

```js
car && car.isOn
```

**R:** Lo que está validando el código anterior es que `car` esté definido. `isOn` igualmente podría ser `null` o `undefined`.

* (2 pts) ¿Por qué en el desarrollo actual se tiene la división de `frontend` y `backend`?

**R:** Debido a que ha crecido la complejidad tanto del lado del cliente como del servidor, por eso se ha dado esta división

* (2 pts) ¿Por qué posicionar elementos con tablas no es lo correcto?

**R:** Las tablas son para tabular datos, para el posicionamiento se debe utilizar `CSS`.

* (2 pts) Si una respuesta `HTTP` se lleva con éxito ¿Qué código (o familia) podría tener la respuesta?

**R:** Cualquier código 2XX.

* (2 pts) ¿Qué hace el siguiente código `CSS`?

```
section p {
  background-color: red,
}
```

**R:** Aplica la regla a todos los elementos `p` que están dentro de un elemento `section`

* (2 pts) ¿Dónde viajan (en el request `HTTP`) los datos de un formulario enviado con `POST`?

**R:** En el *body* del *request*

* (2 pts) Si dos reglas de `CSS` coinciden para un mismo elemento ¿Cuál se aplica si ya se ha descartado importancia y origen?

**R:** La más específica.

* (2 pts) ¿Por qué no se debe confiar en los datos que el usuario ingresa en un formulario?

**R:** Tal como vimos en clases, estos pueden ser manipulados maliciosamente pudiendo incluir campos no solicitados.



## Parte 2 (40 pts): Preguntas prácticas

**NOTA:** Parte A y B en hojas separadas.

### Parte A (15 pts): DCCar

`DCCar` es una planta de revisión técnica (RT), aquí llegan muchos autos mensualmente para realizar este proceso. Los pasos que debe pasar un vehículo son los siguientes:

* Revisión de alineación, Suspensión y Frenos
* Inspección Visual y Luces
* Emisiones

Deberás escribir una función que reciba un auto y retorne una promesa que debe resolverse, en caso de que el auto pase la revisión técnica, o rechazarse en caso de que el auto presente algún tipo de desperfecto. Debes indicar, si el proceso falla, en qué paso ocurrió esto. Además, el auto podría haber sido rechazado previamente, por lo que **sólo debe pasar** por aquellos pasos que fallaron.

Tendrás la siguiente librería disponible:

* `dccar.firstStage(car)`: Realiza la primera etapa de la RT. Retorna una promesa que se resuelve si el auto pasa esa etapa o falla en otro caso. En caso de error, entrega en un parámetro el error que incluye la etapa y puede ser impreso en consola.

* `dccar.secondStage(car)`: Realiza la segunda etapa de la RT. Retorna una promesa que se resuelve si el auto pasa esa etapa o falla en otro caso. En caso de error, entrega en un parámetro el error que incluye la etapa y puede ser impreso en consola.

* `dccar.thirdStage(car)`: Realiza la tercera etapa de la RT. Retorna una promesa que se resuelve si el auto pasa esa etapa o falla en otro caso. En caso de error, entrega en un parámetro el error que incluye la etapa y puede ser impreso en consola.

Además el objeto `Car` tiene las siguientes propiedades:

* `isFirstStageCompleted`: `true` si pasó la primera etapa. `false` en otro caso.
* `isSecondStageCompleted`: `true` si pasó la segunda etapa. `false` en otro caso.
* `isThirdStageCompleted`: `true` si pasó la tercera etapa. `false` en otro caso.

#### Una solución:

```js
async function dccCarCheck(car) {
  try { 
    if (!car.isFirstStageCompleted) {
      await dccar.firstStage(car);
    }

    if (!car.isSecondStageCompleted) {
      await dccar.secondStage(car);
    }

    if (!car.isThirdStageCompleted) {
      await dccar.thirdStage(car);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

**Pauta**:

Nota: Poner énfasis en el código asíncrono. La respuesta puede presentar errores menores de sintaxis o funciones con nombres "descriptivos". Considerar que puede existir más de una solución.

* 3 pts por que la función reciba el parámetro correcto y retorne 
* 3 pts por el error. Si no retorna el error o la promesa rechazada entonces restar 1 punto. Si no muestra en consola, restar 2 puntos.
* 3 pts por ejecutar la primera parte si es necesario
* 3 pts por ejecutar la segunda parte si es necesario
* 3 pts por ejecutar la tercera parte si es necesario


### Parte B (25 pts): Simple form

Para ahorrarte algunas líneas de código (en tu proyecto semestral) quieres hacer un formulario que sea dinámico, esto quiere decir que, ante ciertos argumentos debería "dibujarse" automáticamente.

Tendrás que escribir el trozo de *router*, con un ejemplo, para desplegar esta vista y esta última. Algunos detalles que tienes que implementar son:

* La vista deberá recibir un parámetro `fields` que tiene la siguiente estructura:

```
[
  {
    name: 'a-name',
    type: 'text',
    value: 'a-value',
  },
  { ... },
  { ... },
]
```

En `name` contiene el nombre del campo, en `value` tendrá un valor. En el caso de `type`, este puede ser: `text`, `password`, `submit`, `textarea` y `select`. En este último caso se incluye una propiedad adicional `options` que es un arreglo de objetos de la forma `{ label: 'option1', value: 1 }`. Si algún `value` de una opción corresponde al value del campo, debe marcarse como seleccionada.

* El formulario tendrá que enviarse a una ruta definida de antemano en la aplicación llamada `formSubmit` usando una acción `HTTP POST`. Puedes elegir la ruta y el nombre de la `URL` en la acción del *router* para desplegar el formulario .

* Deberás indicar la ruta de los archivos, relativa al *template* del curso.

* Puedes suponer que siempre te entregarán los datos que requieres correctamente y en el orden que se deben desplegar en el formulario.

Por si olvidaste como escribir un router:

```js
router.get('my-route', '/', async (ctx) => {
  [...]
});
```

Recuerda que para deplegar un `textarea`, se realiza de esta forma:
```html
<textarea name="{name}">{value}</textarea>.
```

En el caso de un `select`:

```html
<select name="cars">
  <option value="volvo">Volvo</option>
  <option value="saab" selected>Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
```

#### Una solución:

```js
/* /src/routes/forms.js */

router.get('myforms', '/forms', async (ctx) => {
  await ctx.render('forms/dynamic-form', {
    submitFormURL: ctx.router.url('formSubmit'),
    fields: [
      {
        name: 'test',
        type: 'text',
        value: 'testing fields'
      },
      {
        name: 'submit',
        type: 'submit',
        value: 'Send'
      },
      // Aqui pueden ir otros campos
    ],
  })
});

```

```html
<!-- /src/views/forms/dynamic-form.html.ejs -->

<form action="<%= submitFormURL %>" method="POST">
  <% fields.forEach((field) => { %>
    <% if (field.type === 'text' || field.type === 'password' || field.type === 'submit') { %>
      <input type="<%= field.type %>" name="<%= field.name %>" value="<%= field.value %>" />
    <% } else if (field.type === 'textarea') { %>
      <textarea name="<%= field.name %>"><=% field.value %></textarea>
    <% } else if (field.type === 'select') { %>
      <select name="<%= field.name %>">
        <% field.options.forEach((option) => {
          <option value="<%= option.value %>" <%= option.value === field.value ? 'selected' : undefined %>><%= option.label %></option>
        <% }); %>
      </select>
    <% } %>
  <% }); %>
</form>
```

**Pauta**:

Nota: La respuesta puede presentar errores menores de sintaxis o funciones con nombres "descriptivos". Considerar que puede existir más de una solución.

* 1 pt por la ruta de los archivos
* 4 pts por el router 
* 20 pts por la vista
  * 5 pts por inputs `text`, `password`, `submit`.
  * 5 pts por input `textarea`
  * 10 pts por input `select`
    * 2 pts por campo `select`
    * 8 pts por campos `options`
