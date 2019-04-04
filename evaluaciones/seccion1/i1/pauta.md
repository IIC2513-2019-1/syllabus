# Pauta I1

## Parte 1 (20 pts): Preguntas teóricas

Responde, de forma precisa, las siguientes preguntas: 

* (2 pts) Escriba un pequeño trozo de código que indique claramente la diferencia de scope entre `const/let` y `var`.

```js
// Un ejemplo

var a = 2;
function test1() {
  if (a === 2) {
    const test = 2; // esta variable estará solo disponible en este bloque
    var test2 = 3; // esta variable estará disponible después del bloque del if
  }
}

```

* (2 pts) ¿Por qué se dice que los objetos en Javascript mutan? De un ejemplo.

**R:** Porque a un mismo objeto le puedo agregar propiedades. Ejemplo:

```js
const a = { test: 'a' };
a.foo = 'bar';
```

* (2 pts) ¿Qué es el `Event Loop`?¿Por qué lo implementa Javascript?

**R:** El event loop es permite realizar el trabajo de registrar callback, procesar callback y funciones. Lo implementa Javascript para correr funciones de forma "asíncrona" (non blocking I/O), ya que corre en un *thread*

* (2 pts) ¿Puedo validar que un arreglo tenga algún elemento de esta forma? ¿Por qué?
```
if (arreglo.length) { ... }
```

**R:** Si `length` es 0, entonces toma un valor de `false`, pero si tiene algún elemento, `length` es >= 1 por lo tanto toma un valor de `true`.

* (2 pts) Si `test01` es una función que retorna una promesa, que al ser resuelta retorna el número `2` ¿Por qué, para mostrar ese resultado en consola, puedo hacer esto?

```
test01().then(console.log);
```
**R:** Sí, ya que dentro del `then` se espera una función de un parámetro, lo cual satisface la función `console.log`.

* (2 pts) Comenta la siguiente frase: Con await puedo esperar por promesas en cualquier parte de mi código.

**R:** Debería estar dentro de una función marcada con `async`, no puede ser en cualquier lado.

* (2 pts) ¿Cuál es el rol de componentes como `NodeJS`, `Ruby on Rails` y otros?¿Qué aportan a una aplicación web?

**R:** Aportan la lógica de la aplicación

* (2 pts) ¿Por qué no sería correcto ocupar un tag `<b></b>` para colocar las letras negras en nuestro HTML?

**R:** Porque es de estilo, y debería estar en el CSS.

* (2 pts) Explica cómo es el proceso, desde el punto de vista del protocolo HTTP, cuando un sitio te redirecciona a otro.

**R:** Se envía un request HTTP para un recurso que se movío, el servidor retorna un mensaje con código 3XX con la nueva ubicación. Para obtener el recurso es necesario hacer una nueva petición HTTP con esa nueva ubicación.

* (2 pts) ¿Qué permitió la aparición de AJAX en la historia de la web? Menciona un ejemplo.

**R:** Poder hacer request asíncronos, pudiendo cargar contenido sin tener que refrescar el sitio.


## Parte 2 (40 pts): Preguntas prácticas

**NOTA:** Parte A y B en hojas separadas.

### Parte A (20 pts): WualY

Eres un aficionado a la astronomía y crees que has descubierto un planeta. Para esto te pones a investigar cómo poder registrar tu descubrimiento. Después de leer bastante te topaste con una librería de la `NASA` llamada "WualY". La librería define lo siguiente:

* `wualy.checkDiscovery(X, Y, Z, callback)`: Función que recibe tres coordenadas y revisa si en esa posición hay algún planeta que no está descubierto. Al terminar llama a la función entregada como `callback` con dos parámetros: el primero es `true` si existe el planeta en esa posición y el segundo toma el valor del nombre del planeta en esa posición. En caso de que efectivamente sea un descubrimiento, el primer parámetro será `true` y el segundo `false`.


* `wualy.registerDiscovery(X, Y, Z, callback)`: Función que recibe tres coordenadas y registra tu descubrimiento. Al terminar, llama a la función entregada como `callback` y le entrega como parámetro el identificador del descubrimiento. Es extremadamente importante notar que la documentación de la `NASA` indica que, si llamas a esta función con coordenadas erróneas, serás bloqueado para siempre!

* `wualy.addDiscoveryAuthor(discoveryId, author, callback)`: Función que recibe al autor del descubrimiento para registrarlo. Al terminar, llama a la función entregada como `callback` y le entrega como parámetro `true` si se registró correctamente y `false` en otro caso.

* `wualy.addDiscoveryName(discoveryId, name, callback)`: Función que recibe un nombre para el descubrimiento y lo registra. Al terminar, llama a la función entregada como `callback` y le entrega como parámetro `true` si se registró correctamente y `false` en otro caso.

* `wualy.addDiscoveryImage(discoveryId, image, callback)`: Función que recibe una imagen para el descubrimiento y la registra. Al terminar, llama a la función entregada como `callback` y le entrega como parámetro `true` si se registró correctamente y `false` en otro caso.



#### Preguntas:

* (15 pt) Escribe una función que reciba 3 coordenadas, un nombre del descubrimiento, un autor y una imagen y resuelva este proceso automáticamente. Debe indicar en consola si cada paso se llevó con éxito o no. Si todo se lleva a cabo correctamente, también debes indicarlo en consola.

* (5 pts) Explica, con palabras, desde qué paso podrías "paralelizar" las tareas y el por qué. Indica además si existiría algún problema al implementar una solución de este estilo. 


#### Una solución (a):

```js
function checkMyDiscovery(X, Y, Z, name, author, image) {
  wualy.checkDiscovery(X, Y, (existPlanet, namePlanet) => {
    if (!existPlanet) return console.log('No existe planeta en esa posición');
    if (existPlanet && namePlanet) return console.log('El planeta ya existe');
  
    console.log('Hiciste un descubrimiento!');
    wualy.registerDiscovery(X, Y, X, (discoveryId) => {
      console.log('Registraste tu descubrimiento');
      wualy.addDiscoveryAuthor(discoveryId, author, (isOk) => {
        if (!isOK) return console.log('Error al agregar autor');
        console.log('Autor agregado');
        wualy.addDiscoveryName(discoveryId, name, (isOk) => {
          if (!isOK) return console.log('Error al agregar el nombre');
          console.log('Nombre agregado');
          wualy.addDiscoveryImage(discoveryId, image, (isOk) => {
            if (!isOK) return console.log('Error al agregar la imagen');
            console.log('Imagen agregada');
            console.log('Proceso de registro completado');
        });
      })
    });
  });
}
```

**Pauta**:

Nota: Poner énfasis en el código asíncrono. La respuesta puede presentar errores menores de sintaxis o funciones con nombres "descriptivos". Considerar que puede existir más de una solución.

Esta solución no podía realizarse en forma paralela por que debía mostrar un mensaje al final que indicaba que todo se había realizado correctamente.

* 5 pts por realizar todos los procesos de forma secuencial y correcta
* 5 pts por desplegar todos los mensajes necesarios
* 5 pts por detectar los errores

#### Una solución (b):

Después de obtener el id se podrían hacer esos pasos en paralelo, sin embargo, se pierde el mensaje del final ya que no podríamos saber cuando terminan.

**Pauta**:

* 2,5 pts por detectar el punto de paralelismo
* 2,5 pts por mencionar alguna desventaja


### Parte B (20 pts): DCCSI

Estás en el negocio de la investigación de escenas del crimen y has creado un software para que tus agentes no olviden ningún paso en sus investigaciones. Ellos tienen lentes especiales que permiten recibir y enviar mensajes.

Cuando llegan a la escena del crimen, tu equipo se debe dividir en 3 grupos: los que revisan el exterior, interior y el cuerpo. Todo esto se realiza al mismo tiempo.

Al terminar todos, se reunen y comparten sus ideas. Podría salir de esta reunión que alguno deba revisar nuevamente sus hallazgos.

Una vez terminado lo anterior, se juntan a revisar los hallazgos y emiten un primer análisis si fue asesinato o no.

#### Preguntas:

* (20 pt) Escribe una función que reciba un arreglo con tus agentes (puedes suponer que siempre serán 9 personas) y realicen este proceso. La función debe retornar una promesa que, al ser resuelta, retorne `true` si tus agentes piensan que fue un asesinato o `false` en caso contrario.

Los detalles de la interfaz de tus agentes son los siguientes:

Puedes suponer que ninguna falla.

* `agent.checkInside()`: función que ordena a un agente a revisar dentro de una casa. Retorna una promesa que se resuelve cuando el agente termina. 

* `agent.checkOutside()`: función que ordena a un agente a revisar fuera de una casa. Retorna una promesa que se resuelve cuando el agente termina.

* `agent.checkBody()`: función que ordena a un agente a revisar el cuerpo. Retorna una promesa que se resuelve cuando el agente termina. 

* `agent.checkAgain()`: función que ordena a un agente a revisar nuevamente sus hallazgos. Retorna una promesa que se resuelve cuando el agente termina. 

* `agent.shareIdeas()`: función que hace que el agente comparta sus ideas. Retorna una promesa que, al resolverse, retorna `true` si está listo con sus hallazgos o `false` si debe revisarlos de nuevo. 

* `agent.voteIsMurder()`: función que hace que el agente indique si vota que la escena es de un homicidio . Retorna una promesa que, al resolverse, retorna `true` si cree que es homicidio o `false` en otro caso. 

Puedes ocupar la siguiente función que te puede ayudar:

* `waitForAllPromises([p1, p2, ...])`: Función que espera a que todas las promesas se resuelvan (permite el funcionamiento "en paralelo"). Retorna una promesa que, al ser resuelta, contiene en un arreglo las respuestas de cada promesa en el orden en que se indicaron. **NOTA:** Es equivalente a `Promise.all()`.


#### Una solucion

```js
async function checkCrimeScene(agents) {
  // agentes que revisan el exterior
  const checkOutside = Promise.all([
    agent[0].checkOutside(),
    agent[1].checkOutside(),
    agent[2].checkOutside(),
  ]);

  // agentes que revisan el interior
  const checkInside = Promise.all([
    agent[3].checkInside(),
    agent[4].checkInside(),
    agent[5].checkInside(),
  ]);

  // agentes que revisan el cuerpo
  const checkBody = Promise.all([
    agent[6].checkBody(),
    agent[7].checkBody(),
    agent[8].checkBody(),
  ]);

  // los esperamos a todos
  await Promise.all([
    checkOutside,
    checkInside,
    checkBody,
  ]);

  // todos comparten sus ideas
  const checkAgentIdeas = agents.map(agent =>
    agent.shareIdeas()
      .then((isOk) => {
        // Si alguno no esta ok con sus hallazgos
        if (!isOk) {
          // Revisa nuevamente
          return agent.checkAgain();
        }
        return isOk;
      });
  });
  await Promise.all(checkAgentIdeas);

  // todos votan
  const agentVotes = await Promise.all(agents.map(agent => agent.voteIsMurder()));
  const yesVotes = agentVotes.reduce((total, vote) => {
    if (vote) {
      total = total + 1;
    }
  });

  // votos por mayoria simple
  if (yesVotes > (agents.length / 2)) {
    return true;
  }
  
  return false;
}
```

**Pauta**:

Nota: Poner énfasis en el código asíncrono. La respuesta puede presentar errores menores de sintaxis o funciones con nombres "descriptivos". Considerar que puede existir más de una solución.

* 1 pts por que la función retorne una promesa

* 5 pts por el proceso de examinar la escena del crimen. En caso de problemas de asincronía descontar 3 puntos.

* 4 pts por el proceso de compartir ideas. En caso de problemas de asincronía descontar 2 puntos.

* 5 pts por volver a revisar la escena (parte de la anterior). En caso de problemas de asincronía descontar 3 puntos.

* 5 pts por el proceso de votación. En caso de problemas de asincronía descontar 3 puntos.

