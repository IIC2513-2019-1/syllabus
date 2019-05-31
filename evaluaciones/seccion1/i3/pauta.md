# Pauta I3

## Parte 1 (20 pts): Preguntas teóricas

Responde, de forma precisa, las siguientes preguntas: 

* (2 pts) ¿Por qué el estado de un componente debe ser mutado con el método `setState`?

**R:** Porque de esa forma el componente también puede gatillar un *re-render* ante un cambio de estado (entre otras cosas).

* (2 pts) ¿Qué es el `DOM` y cuál es su importancia al utilizar `Javascript` en el lado del cliente?

**R:** El `DOM` es el *Document Object Model* y contiene la estructura de nuestro sitio. Es importante debido a que, con `Javascript` podemos interactuar con él para definir ciertos comportamientos.

* (2 pts) ¿A qué se le conoce como *obstrusive* `Javascript`? ¿Por qué no lo ocupamos?

**R:** Se le conoce así al `Javascript` que se encuentra junto con `HTML`. No lo ocupamos de esa forma ya que el contenido de comportamiento debe estar en su(s) propio(s) archivo(s).

* (2 pts) ¿Por qué en `React` se dice que las propiedades fluyen hacia abajo y las acciones hacia arriba?

**R:** Porque el componente recibe lo que se conocen como `props` (propiedades fluyen hacia abajo) para obtener lo necesario para funcionar. A su vez, si ocurre un evento que el componente no sabe como resolver, lo puede "enviar" a algún componente padre (las acciones fluyen hacia arriba).

* (2 pts) ¿Cuales son los efectos del *hoisting* en `Javascript`? Indica un ejemplo en que no se aplique ese efecto (porque no cumple con los requisitos).

**R:** En general es mover las declaraciones al tope del archivo. Un ejemplo: `var x = 2;` En este caso sube la declaración pero no la asignación (el valor).

* (2 pts) ¿Cuál es la forma de decirle a una aplicación web que espero una respuesta en un cierto formato?

**R:** A través del *header* `Accept`.

* (2 pts) Indica al menos 4 características que debería tener una `API RESTful`.

**R:** Que puede/tiene capas, que maneja el caché de la información, que no tiene estado y arquitectura cliente-servidor.

* (2 pts) ¿Cuál es el objetivo de una `API`?

**R:** Crear una interfaz para interactuar con otras aplicaciones.

* (2 pts) ¿Qué característica de una `API RESTful` viene a solucionar la especificación de `JSON:API`?

**R:** Interfaz uniforme

* (2 pts) ¿Qué son los `JSONWeb Tokens` (`JWT`) y por qué los ocupamos en el contexto de la autenticación a una `API`?

**R:** Es un estándar que permite enviar contenido seguro. Lo ocupamos en el caso de la autenticación en reemplazo de las *cookies*.


## Parte 2 (40 pts): Preguntas prácticas

**NOTA:** Parte A y B en hojas separadas.

### Parte A (10 pts): Aviones

Podemos dividir a los aviones en dos grandes tipos: de guerra o de transporte (tanto de pasajeros como de carga). Los aviones de guerra pueden disparar, mientras que los aviones de transporte pueden cargar sus bodegas.

Además, sabemos que todos los aviones pueden despegar y aterrizar.

Escribe las clases correspondientes (utilizando herencia) para representar esta situación. Para el caso de cada acción del avión, debe imprimir un mensaje en consola indicando qué es lo que se está realizando (despegar, aterrizar, disparar y cargar). En el caso de los dos primeros, se debe indicar si el avión corresponde a uno de guerra o de transporte.

**Solución**:

```js
class Plane {
  constructor(type) {
    this.type = type;
  }

  land() {
    console.log(`Land ${this.type} plane.`);
  }

  takeOff() {
    console.log(`Take Off ${this.type} plane.`);
  }
}

class WarPlane extends Plane {
  constructor() {
    super('war');
  }

  shoot() {
    console.log('Shooooot!');
  }
}

class LoadPlane extends Plane {
  constructor() {
    super('load');
  }

  load() {
    console.log('Load plane!');
  }
}


```

**Pauta**:

* 5 pts por clase avión
  * 3 pts - Debe recibir el tipo en esta clase. Descontar la mitad del puntaje si no lo hace.
  * 1 pt por función de aterrizaje (considerar válido si imprime el tipo)
  * 1 pt por función de despegue (considerar válido si imprime el tipo)
* 2.5 pts por clase avión de guerra
  * 2 pts por inicializar correctamente la clase avión con su tipo. De no hacerlo no tiene este puntaje. No considerar como válido si en cada avión le coloca un tipo.
  * 0.5 por función de disparar
* 2.5 pts por clase avión de carga
  * 2 pts por inicializar correctamente la clase avión con su tipo. De no hacerlo no tiene este puntaje. No considerar como válido si en cada avión le coloca un tipo.
  * 0.5 por función de cargar

Considerar, adicionalmente, que puede estar escrito como funciones.


### Parte B (30 pts): Un paso a React

Quieres agregar, a tu sitio web, un selector que permita cambiar el color de un texto. Las opciones de color son rojo, verde y azul.

* (5 pts) Escriba un código en `jQuery` (o `Javascript` sin uso de librerías) que permita realizar lo antes mencionado. Para esto puedes suponer que `jQuery` ya se encuentra incluido y cualquier otro archivo javascript también (en el `head` del sitio web). En caso que requieras utilizar estilos, estos también serán cargados automáticamente. En el código `HTML`, basta con que escribas el *body* del sitio. Debes indicar claramente donde inicia y termina un archivo, incluye además si estás escribiendo `HTML`, `CSS` o `JS`. No puedes incluir en tu `HTML` contenido que no corresponda a la estructura de tu sitio.

* (10 pts) Escribe un componente de `React` que realice lo mismo (no es necesario que sea utilizando *dumb*/*smart* *components*).

* (15 pts) Escribiste una `API` que permite obtener el listado de opciones de colores (ya no son estáticos). Puedes consultarla en `https://iic2513.myapi.cl/colors` y entrega como respuesta (en formato `JSON`) un arreglo de objetos que tienen la forma `{ label: 'Rojo', class: 'red-text' }`, en donde `label` es el texto que debe mostrar la opción del selector y, en `class`, se encuentra la clase `CSS` que debe ser aplicada al texto. Puedes suponer que estas clases se han definido con anterioridad. Escribe, utilizando *dumb*/*smart* *components*, componentes `React` que puedan cargar las opciones y lograr el objetivo planteado.

Para ayudarte un poco, aquí hay algunas cosas que podrían ser útiles:

* El evento que se lanza, al tener el `DOM` cargado, es `DOMContentLoaded`
* En el caso de jQuery, se puede hacer con `$ (function() { ... } )`
* `document.getElementById(id)`
* `document.getElementsByTagName(name)`
* `element.setAttribute(name, value)`
* `element.getAttribute(name)`
* `$(selector).attr(name).`
* `$(selector).attr(name, newValue).`
* `element.addEventListener(name, function)`
* `$(selector).click(function).`
* `$(selector).change(function).`
* `componentDidMount` es una función del ciclo de vida de un componente `React`.
* `event.target.value` permite obtener el valor desde el evento.

Para hacer un selector (`select`):

```html
<select name="cars">
  <option value="volvo">Volvo</option>
  <option value="saab" selected>Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
```


**Solución**

Primera Parte:

```html
<!-- HTML -->

<select id="color-selector">
  <option value="text-red" selected>Red</option>
  <option value="text-green">Green</option>
  <option value="text-blue">Blue</option>
</select>

<p id="text" class="text-red">Example text</p>
```

```css
/* CSS */

.text-red {
  color: red;
}

.text-green {
  color: green;
}

.text-blue {
  color: blue;
}
```

```js
/* JS */

$(function () {
  $('#color-selector').change(function() {
    $('#text').attr('class', this.value);
  });
});
```

Pauta

* 2 pt HTML
  * 1.5 pts por selector
  * 0.5 pts por texto
* 1 pt CSS
  * Considerar 0 puntos si no escribe `CSS` o utiliza atributo `HTML style`.
* 2 pts JS
  * 0.5 pts Cargar `Javascript` al terminar de cargar el sitio
  * 0.5 pts Detectar el cambio del selector
  * 1 pt Actualizar atributo del texto


Segunda Parte:

* Utilizaremos el CSS de la primera parte.

```jsx
// No es necesario realizar los imports
import React, { Component } from 'react';

export default class ColorSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'text-red',
    };

    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  handleChangeColor(event) {
    this.setState({ color: event.target.value });
  }

  render() {
    return (
      <div>
        <select onChange={this.handleChangeColor}>
          <option value="text-red" selected>Red</option>
          <option value="text-green">Green</option>
          <option value="text-blue">Blue</option>
        </select>

        <p class={this.state.color}>Example text</p>
      </div>
    );
  }
}
```

Pauta

* 1 pt por estructura general de componente.
* Constructor (3 pts)
  * 1 pt por hacer `super(props)`
  * 1 pt por definir el estado
  * 1 pt por hacer `bind` para hacer la función de cambio. (pueden ocupar *arrow functions*)
* Función que actualiza estado al realizar un cambio (3 pts)
  * 1 pt por recibir el evento.
  * 2 pts por actualizar estado correctamente (usando `setState`) - 0 pt en otro caso
* Render (3 pts)
  * 2 pts por pasar la función que cambia el valor y selector
  * 1 pts por pasar el valor del estado 


Tercera Parte:

```jsx
/* Dumb component */

// No es necesario realizar imports
import React from 'react';
import PropTypes from 'prop-types';

export default function ColorSelector({ classValue, colorOptions, onColorChange }) {
  return (
    <div>
      <select onChange={onColorChange}>
        {colorOptions.map(option => <option key={option.class} value={option.class}>{option.label}</option>)}
      </select>

      <p class={classValue}>Example text</p>
    </div>
  );
}

ColorSelector.propTypes = {
  classValue: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  colorOptions: PropTypes.arrayOf(PropTypes.shape({
    class: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};
```

Pauta (5 pts):

* 2 pts recibir props apropiadas (opciones, color y función de cambio de color) y asignar en el caso de las dos últimas
* 2 pts por hacer render correctamente de las opciones
* 1 pt por `PropTypes` (solo corregir la del valor de la clase y función de cambio)


```jsx
/* Smart component */

// No es necesario realizar imports
import React, { Component } from 'react';
import ColorSelector from './ColorSelector';

export default class ColorSelectorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      loading: true,
      options: [],
    };

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  async componentDidMount() {
    const options = await fetch('https://iic2513.myapi.cl/colors').then(response => response.json());
    const color = options[0].class;
    this.setState({ color, loading: false, options });
  }

  handleColorChange(event) {
    this.setState({ color: event.target.value });
  }
  
  render() {
    if (loading) return <p>Loading...</p>;
    const { color, options } = this.state;
    return <ColorSelector colorOptions={options} classValue={color} onColorChange={this.handleColorChange} />;
  }
}
```

Pauta (10 pts):

* 2 pts definir estado correctamente y hacer bind (puede utilizar *arrow functions*)
* 4 pts por usar *lifecycle method* 
  * 2 pts por hacer fetch
  * 2 pts por actualizar estado
* 4 pts por hacer render correctamente
  * 1 pt por caso de loading
  * 3 puntos por hacer render correcto de *dumb component*
    * 1 pt por return de componente
    * 2 pts por paso correcto de `props`