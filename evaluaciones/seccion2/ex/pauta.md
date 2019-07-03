# Pauta Examen

## Pregunta 1 (15 pts): *The Zoo*

El zoológico requiere poder llevar un registro de qué animales están en cada zona de este. Para esto te han llamado para que los ayudes.

* (3 pts) Indica las entidades y relaciones para solucionar este problema.

* (6 pts) Implementa el método del router que permita obtener las zonas y animales del zoológico. La respuesta debe estar en formato JSON, con una propiedad para cada dato requerido. Supone que las zonas y animales cuentan con un nombre (`name`) y un identificador (`id`). Puedes elegir la ruta que quieres exponer.

* (6 pts) Implementa el método del router (`POST`) que permita agregar un registro de un animal en una zona. Ese método recibe como parámetros el identificador del animal y el identificador de la zona. Debes retornar un  `JSON` con el identificador de la reserva. Supone que no hay errores y puedes elegir la ruta que quieres exponer.

A continuación tienes un ejemplo para el router:

```js
router.get('orders', '/', async (ctx) => {
	[...]
});
```

### Solución

**Primera parte**:

Es necesario un modelo para los animales, uno para las zonas. Un animal puede estar en una zona y, en una zona, podría haber varios animales. Dado que es necesario entregar un número de reserva, debe ser añadido a otra entidad que guarde cuándo se hizo la reserva.

**Pauta:** Podrían existir otros tipos de relaciones que los alumnos podrían expresar.


**Segunda parte**:
```js
router.get('zoo-list', '/api/zoo/list', async (ctx) => {
  ctx.body = {
    zones: await ctx.orm.zone.findAll(),
    animals: await ctx.orm.animal.findAll(),
  }
});
```

**Pauta:** Importante que se espere a las funciones asíncronas. De no ser así, sólo asignar la mitad del puntaje.

**Tercera parte**:

```js
router.post('zoo-add', '/api/zoo/add', async (ctx) => {
  const { animalId, zoneId } = ctx.body;
  const [animal, zone] = await Promise.all([
    ctx.orm.animal.findById(animalId),
    ctx.orm.zone.findById(zoneId),
  ]);

  const [_, reservation] = await Promise.all([
    animal.addZone(zone),
    ctx.orm.reservation.create({ animal, zone })
  ]);

  ctx.body = reservation;
});
```
**Pauta:**

* 2 pts por extraer los valores del *body* (sólo se puede hacer desde el *body*)
* 2 pts por asignar un animal a una zona.(Depende de las relaciones descritas en el punto anterior)
* 2 pts por crear la reserva y retornarla.


## Pregunta 2 (15 pts): *React Zoo*

Escribe un componente `React` que:

* (3 pts) Despliegue un formulario con dos selectores: uno para animales y otro para las zonas. Además debes incluir un botón para enviar el formulario.

* (6 pts) Cargue desde la ruta que implementaste en la pregunta anterior (puedes suponer que funciona correctamente) la información para los selectores. En caso de que aún no esté disponible, se debe mostrar algún mensaje que indique que se está cargando.

* (6 pts) Envía el formulario a la ruta que implementaste en la pregunta anterior (puedes suponer que funciona correctamente). Luego de enviar los datos, y que el servidor responda, debes mostrar un mensaje de éxito con el identificador de la reserva.

### Solución

**Pauta:** No es necesario especificar los imports ni los props types.
 
```jsx
import React, { Component } from 'react';

export default class AddReservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animalId: undefined,
      zoneId: undefined,
      loading: true,
      animals: undefined,
      zones: undefined,
      message: '',
    }

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleAnimalSelectChange = this.handleAnimalSelectChange.bind(this);
    this.handleZoneSelectChange = this.handleZoneSelectChange.bind(this);
  }

  async componentDidMount() {
    const { animals, zones } = await fetch('url-data').then(response => response.json());
    this.setState({ animals, zones, loading: false });
  }

  async handleSubmitForm(event) {
    event.preventDefault();
    const { animalId, zoneId } = this.state;
    const reply = await fetch('url-post', {
      method: 'POST',
      body: JSON.stringify({ animalId, zoneId });
    }).then(response => response.json());

    this.setState({ message: `Reservation ID: ${reply.id}` });
  }

  handleAnimalSelectChange(event) {
    this.setState({ animalId: event.target.value });
  }

  handleZoneSelectChange(event) {
    this.setState({ zoneId: event.target.value });
  }

  render() {
    if (this.state.loading ) return <p>Loading...</p>;
    const { animals, zones, animalId, zoneId } = this.state;
    return (
      <form onSubmit={handleSubmitForm}>
        <p>{message}</p>
        <label for="animal">Animal</label>
        <select id="animal" name="animalId" value={animalId} onChange={this.handleAnimalSelectChange}>
          {animals.map(animal => <option key={animal.id} value={animal.id}>{animal.name}</option>)}
        </select>

        <label for="zone">Zone</label>
        <select id="zone" name="zoneId" value={zoneId} onChange={this.handleZoneSelectChange}>
          {zones.map(zone => <option key={zone.id} value={zone.id}>{zone.name}</option>)}
        </select>

        <input type="submit" value="Create" disabled={!animalId || !zoneId} />
      </form>
    )
  }
}

```

**Pauta:**
* Primera parte: Un punto por cada control (dos selectores y botón)
* Segunda parte: 
  * 2 pts por hacer fetch y guardar en estado correctamente
  * 1 pt por mostrar caso de carga
  * 3 pts por agregar correctamente las opciones a los *select* (incluye los handles de eventos)
* Tercera parte: 
  * 1 pt por obtener los valores del estado
  * 3 pts por hacer el POST correctamente (incluye el hacer submit del formulario).
  * 2 pts por mostrar el mensaje una vez que se envió el formulario (0 en otro caso).


## Pregunta 3 (10 pts): *fashion emergency*

Escribe el código `CSS` necesario (y los cambios al código del formulario) para que, en pantallas menores a 768 `px`, los campos utilicen una fila completa cada uno y, las etiquetas de los campos, centren su texto. En tu respuesta puedes incluir sólo tu código `JSX` y `CSS`.

```jsx
  <form onSubmit={handleSubmitForm}>
    <p>{message}<p>
    <div class="field">
      <label for="animal">Animal</label>
      <select id="animal" name="animalId" value={animalId} onChange={this.handleAnimalSelectChange}>
        {animals.map(animal => <option key={animal.id} value={animal.id}>{animal.name}</option>)}
      </select>
    </div>

    <div class="field">
      <label for="zone">Zone</label>
      <select id="zone" name="zoneId" value={zoneId} onChange={this.handleZoneSelectChange}>
        {zones.map(zone => <option key={zone.id} value={zone.id}>{zone.name}</option>)}
      </select>
    </div>

    <input type="submit" value="Create" disabled={!animalId || !zoneId} />
</form>
```

```css
@media screen and (max-width: 768px) {
  .field {
    width: 100%;
  }

  .field label,select {
    width: 100%;
  }

  .field label {
    text-align: center;
  }
}
```

**Pauta:**
* 1 pt por la correcta condición para la media query
* 4 pts por la asignación de clases/identificadores en código HTML/JSX 
* 5 pts por las reglas para lograr lo solicitado


## Pregunta 4 (20 pts): Preguntas generales

Responde **brevemente** las siguientes preguntas:

* (2 pts) Menciona un ejemplo de cómo podrías incorporar `Web Assembly` en un formulario.

**R:** En un formulario con subida de archivos se podría comprimir ese archivo antes de ser enviado, de esta forma es menos la información enviada al servidor.

* (2 pts) ¿Cuál es la relación entre `Web Assembly` y `Javascript`?

**R:** Por ahora Javascript es el que está cargando los códigos de Web Assembly

* (2 pts) Indica, y explica en qué consiste, una de las características de una `PWA`.

**R:** Vimos 4: Arquitectura de capas (*shell architecture*), privacidad, worker y manifest file. Basta con explicar unos de esos.

* (2 pts) ¿Por qué utilizaríamos un *cloud storage* en vez de guardar localmente los datos?

**R:** Para evitar cosas como las que pasan en Heroku que es que, una vez que el contenedor se borra, se borran los datos. También es válido mencionar los beneficios que tiene la nube en esta área.

* (2 pts) ¿Dónde está la complejidad en una arquitectura de microservicios?

**R:** Cuando requiero datos de dos o más servicios, en ese escenario debo agregarlos de alguna forma en vez de tenerlos todos juntos.

* (2 pts) En el contexto del `cloud computing` ¿Cómo se clasifica `Heroku`?

**R:** Plataforma como Servicio (PaaS).

* (2 pts) Indica los necesario para que, tu actual aplicación en Heroku, pueda ser accedida a través de `http://miproyectodeweb.cl`

**R:** Adquirir el dominio y configurar el DNS. Se podría agregar una configuración de Heroku.


* (2 pts) ¿Qué aporta un certificado `SSL` a una aplicación web?

**R:** Que la información vaya segura. Además, permite que un cliente tenga la certeza de que un servidor es quien dice ser.

* (2 pts) ¿En qué consiste la vulnerabilidad de injección detectada por la `OWASP`?¿Cómo se explota?

**R:** Básicamente aprovecharse de que el desarrollador no protegió el input correctamente para inyectar ciertos valores y obtener datos de la base de datos. Generalmente se explota con parámetros GET.

* (2 pts) ¿Por qué no se realizan *tests* en las aplicaciones?¿Cuáles son sus beneficios?

**R:** Porque en algunos casos se ve como una pérdida de tiempo/dinero. Sin embargo, nos permite reducir la cantidad de errores en nuestra aplicación y tener la seguridad que, al agregar nuevos, no hayamos roto nada.