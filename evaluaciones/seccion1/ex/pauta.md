# Pauta Examen

## Pregunta 1 (15 pts): Agregando una luna desde el cliente

Tienes el siguiente componente de `React`:

```jsx
import React from 'react';

export default function AddMoon() {
  return (
    <form>
      <label for="name">Name</label>
      <input id="name" type="text" name="name" />
      
      <label for="distance">Distance from planet (km)</label>
      <input id="distance" type="number" name="distance" />
      
      <label for="area">Area (km^2)</label>
      <input id="area" type="number" name="area" />

      <input type="submit" value="Add" />
    </form>
  );
}
```

* (5 pts) Haz una función que valide los campos del formulario. El nombre debe estar presente y, tanto la distancia como el área, deben ser mayores que cero. Puedes hacer todos los cambios que necesites.

* (10 pts) El formulario debe ser enviado a `https://mymoon.com/planets/:planetId/moons`, mediante el método `POST`. Los valores a enviar deben estar validados y, luego de enviar los datos, el formulario debe borrarse. Puedes suponer que, si requieres datos no especificados, han sido entregados al componente dentro de las `props`, pero deja explícito qué datos estás utilizando. En caso de error de validación, debes mostrar un error general en el formulario.

### Solución

```jsx
import React, { Component } from 'react';

export default class AddMoon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      distance: 0,
      area: 0,
      message: '',
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDistance = this.handleChangeDistance.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFormData = this.validateFormData.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeDistance(event) {
    this.setState({ distance: event.target.value });
  }

  handleChangeArea(event) {
    this.setState({ area: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.validateFormData()) return this.setState({ message: 'Error in form fields' });
    const { name, distance, area } = this.state;
    const { planetId } = this.props;

    return fetch(`https://mymoon.com/planets/${planetId}/moons`, {
      method: 'POST',
      body: JSON.stringify({ name, distance, area }),
    })
      .then(() => this.setState({ name: '', distance: 0, area: 0 }));

  }

  validateFormData() {
    const { name, distance, area } = this.state;
    return name && distance > 0 && area > 0;
  }

  render() {
    const { name, distance, area } = this.state; 
    return (
      <form>
        <p>{message}</p>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" value={name} onChange={this.handleChangeName} />
        
        <label for="distance">Distance from planet (km)</label>
        <input id="distance" type="number" name="distance" value={distance} onChange={this.handleChangeDistance} />
        
        <label for="area">Area (km^2)</label>
        <input id="area" type="number" name="area" value={area} onChange={this.handleChangeArea} />

        <input type="submit" value="Add" />
      </form>
    );
  }
}
```

**Pauta:**
* Primera parte
  * 5 pts que valide los datos. Incluye obtenerlos desde el estado según corresponda.
* Segunda parte
  * 2 pts por caso de error, detectarlo y mostrarlo
  * 2 pts por borrar al final los campos del formulario
  * 2 pts por validar campos en el cliente antes de enviarlos.
  * 4 pts envío correcto de puntos.


## Pregunta 2 (15 pts): Agregando la luna del lado del servidor

Implementa la ruta`POST https://mymoon.com/planets/:planetId/moons`, para que los datos de tu componente `React` lleguen sin problemas.

* (3 pts) Indica claramente los modelos necesarios, y sus relaciones, para implementar la solución.

* (12 pts) Implementa el método del *router* que procesará los *requests* para la ruta anterior. Recuerda validar los datos tal como lo hiciste en la pregunta anterior e indicar si ocurre un error. La respuesta del método puede ser `JSON` y, en caso de éxito, retornar la luna creada.

A continuación tienes un ejemplo para el router:

```js
router.get('orders', '/', async (ctx) => {
	[...]
});
```

### Solución:

**Primera parte:**

Necesitamos Planetas y Lunas como modelos. Un planeta puede tener muchas lunas, una luna un planeta.

**Segunda parte:**

```js
router.post('add-moon', '/planets/:planetId/moons', async (ctx) => {
  const { planetId } = ctx.params;
  const { name, distance, area } = ctx.body;

  if (!name || distance <= 0 || area <= 0) {
    ctx.body = { error: 'Error in moon details' };
  } else {
    const [moon, planet] = await Promise.all([
      ctx.orm.moon.create({ name, distance, area }),
      ctx.orm.planet.findById(planetId),
    ]);

    await planet.addMoon(moon);
    ctx.body = moon;
  }
});
```

**Pauta:**
* 2 pts por obtener todos los parámetros correctamente
* 3 pts por la validación de datos 
* 3 pts por crear la luna
* 3 pts por asociar la luna al planeta
* 1 pt por retornar la luna creada


## Pregunta 3 (10 pts): *fashion emergency*

Escribe el código `CSS` necesario (y los cambios al código del formulario) para mostrar el campo del nombre en una fila, utilizando la totalidad del espacio disponible y, los campos de área y distancia compartiendo otra fila; cada uno utilizando la mitad del espacio disponible.

### Solución

```jsx
  <form>
    <p>{message}</p>
    <div class="full-width">
      <label for="name">Name</label>
      <input id="name" type="text" name="name" value={name} onChange={this.handleChangeName} />
    </div>
    
    <div class="half-width">
      <label for="distance">Distance from planet (km)</label>
      <input id="distance" type="number" name="distance" value={distance} onChange={this.handleChangeDistance} />
    </div>
    
    <div class="half-width">
      <label for="area">Area (km^2)</label>
      <input id="area" type="number" name="area" value={area} onChange={this.handleChangeArea} />
    </div>

    <input type="submit" value="Add" />
  </form>
```

```css
.full-width {
  width: 100%;
}

.half-width {
  float: left;
  width: 50%;
}
```

**Pauta:**
* 3 pts por cada elemento bien posicionado
* 1 pt por cambios de clase/id en HTML/JSX

NOTA: Existen varias soluciones para este problema, por ejemplo usando flexbox u otro.


## Pregunta 4 (20 pts): Preguntas generales

Responde **brevemente** las siguientes preguntas:

* (2 pts) Menciona un ejemplo, distinto a los que aparecen en las diapositivas de clases, donde podrías incorporar Web Assembly a tu aplicación.

**R:** Al adjuntar un archivo en un formulario, este podría ser comprimido antes de ser enviado, lo cual disminuye la transferencia de datos.

* (2 pts) ¿`Web Assembly` reemplazará a `Javascript`?¿Por qué?

**R:** No, en el corto/mediano plazo. Actualmente se usa Javascript para llamar a las funciones.

* (2 pts) Indica un ejemplo, distinto a un chat, en donde podrías utilizar `websockets`.

**R:** Por ejemplo al hacer push a GitHub. Inmediatamente te muestra una alerta de ese push en el *home* del repositorio.

* (2 pts) ¿Por qué eligirías un `IaaS` en vez de un `PaaS` para una solución?

**R:** Cuando hay experiencia en el manejo de este tipo de recursos o se requiere un mayor control, más personalización, de la solución.

* (2 pts) ¿Cuál es el *trade-off* que se produce entre una aplicación monolítica y una *serverless*?

**R:** Complejidad. *serverless* es más compleja que una aplicación monolítica.

* (2 pts) En el contexto de tu proyecto, indica al menos un caso de uso de cómo utilizarías `Redux`.

**R:** Podría ser para guardar los datos del usuario actual de tu app.

* (2 pts) Indica los necesario para que, tu actual aplicación en Heroku, pueda ser accedida a través de `http://miproyectodeweb.cl`

**R:** Un dominio y la configuración del DNS. Se podría agregar una configuración de Heroku.

* (2 pts) ¿Es suficiente configurar un certificado `SSL` para asegurar nuestra aplicación?¿Por qué?

**R:** No, el certificado solo nos provee de una encriptación y de asegurarnos que estamos visitando al/los servidor/es que requerimos.

* (2 pts) Indica una vulnerabilidad detectada por la `OWASP` y cómo explotarla.

**R:** Aquí hay varias, pero podría ser injección SQL. Explotada a través de parámetros GET. 

* (2 pts) Indica dos tipos de `tests` que se pueden hacer a una aplicación web.

**R:** Amplia gama: carga, usabilidad, penetración, seguridad, unitarios, funcionales, etc.
