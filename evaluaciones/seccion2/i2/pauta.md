# Pauta I2

## Parte 1 (20 pts): Preguntas teóricas

Responde, de forma precisa, las siguientes preguntas: 

* (2 pts) ¿Cuál es la función del prototipo? Indica un ejemplo de aplicación.

**R:** Permite realizar herencia en Javascript. Un ejemplo puede ser el representar a todos los animales (como clase base) y después cada animal con su comportamiento particular.

* (2 pts) ¿En qué se traducen las clases en Javascript creadas con `class`?

**R:** En funciones finalmente.

* (2 pts) Indica las diferencias (al menos dos) entre una función declarada con `function` y una *arrow function*.

**R:** El `this` es distinto y también lo que ocurre con el `hoisting`.

* (2 pts) ¿Por qué es necesario utilizar un *cloud storage* en nuestro proyecto?

**R:** Porque al hacer `push` a Heroku se crea un nuevo contenedor que no tiene los archivos que han subido los usuarios.

* (2 pts) Comenta la siguiente frase: El `this` disponible en una función no se puede alterar porque depende del contexto de ejecución.

**R:** Hemos visto que sí se puede cambiar usando `call` o `apply`.

* (2 pts) Si bien en Javascript no existen elementos privados, en la declaración de una clase en forma de función ¿Por qué se consideran con acceso privado a los argumentos de la función?

**R:** Porque solo pueden ser accedidos dentro del scope de esa función.

* (2 pts) ¿Cuál es el rol de `nodemailer` en nuestro proyecto?

**R:** Se una capa de abstracción entre nuestro proyecto y los proveedores de envío de correo.

* (2 pts) ¿Cuál es el efecto de `hoisting` en Javascript?

**R:** "Mover" al inicio las definiciones de variables o funciones (declaradas con `function`).

* (2 pts) Escriba una línea de código que no sea afectada por `hoisting`, utilizando solo `var` o `function`.

**R:** Cualquier asignación sirve. `var a = 10;`.

* (2 pts) Si llamas a una función de un objeto en Javascript ¿Dónde se busca esta función y en qué orden?

**R:** Se busca en el objeto mismo, luego si no está ahí en el prototipo. Si no se encuentra en el prototipo, entonces en su prototipo y así.


## Parte 2 (40 pts): Preguntas prácticas

**NOTA:** Parte A y B en hojas separadas.

### Parte A (15 pts): ¿Importa el orden?

Analice el siguiente código e indique lo que imprime en consola. Si en alguna línea el código lanza una excepción, indique el por qué, coméntala y continúa con la ejecución.

```js
console.log(ab);
console.log(z);

myFunction(10);

function myNewFunction() {
  a = 10;
  var b = 5;
  return b;
}

myNewFunction();
console.log(a);
console.log(b);
console.log(addTwo(a));
console.log(addTwo(b));

console.log(ab);
ab = 5;
console.log(ab);

function addTwo(number) {
  return number + 2; 
}

console.log(myFunction(b));

var myFunction = test => console.log(test);

var z = 10;
var ab;
```

**Solución:**

```js
console.log(ab); // imprime undefined
console.log(z); // imprime undefined

myFunction(10); // Error - Función no definida en este punto

function myNewFunction() {
  a = 10;
  var b = 5;
  return b;
}

myNewFunction();
console.log(a); // imprime 10
console.log(b); // Error - b no está definido
console.log(addTwo(a)); // imprime 12
console.log(addTwo(b)); // Error - b no está definido

console.log(ab); // imprime undefined
ab = 5;
console.log(ab); // imprime 5

function addTwo(number) {
  return number + 2; 
}

console.log(myFunction(b)); // Error - b no está definido

var myFunction = test => console.log(test);

var z = 10;
var ab;
```

**Pauta**
* 1 pt por cada salida correcta (indicando los errores) - Total 10
* 1 pt adicional por cada error - Total 4
* 1 pt por no colocar salidas adicionales

### Parte B (25 pts): *I'm validator*

Deberás escribir un formulario que solicite el nombre, apellido, edad y correo electrónico al usuario. Además, para hacerlo entretenido, deberás validar cada campo en el cliente:

* El nombre debe tener al menos 2 caracteres
* El apellido debe tener al menos 2 caracteres
* La edad debe ser un número y mayor o igual a 18 años.
* El correo electrónico debe terminar en `@uc.cl`

En caso de que no cumpla con lo anterior, debes mostrar el error para cada campo. Además, si hay un error, no debes permitir el envío del formulario.

Puedes suponer lo siguiente:

* El campo `action` del formulario tiene el valor `/form.php` y se envía mediante el método `POST`.

* No te preocupes del estilo.

* `jQuery` se encuentra ya importado en caso de que lo requieras/uses

* Tu código Javascript será cargado en el `head` del sitio web. Puedes escribir sólo el `body` del sitio.

Para ayudarte un poco, aquí hay algunas cosas que podrían ser útiles:

* El evento que se lanza, al tener el `DOM` cargado, es `DOMContentLoaded`
* En el caso de jQuery, se puede hacer con `$ (function() { ... } )`
* `document.getElementById(id)`
* `document.getElementsByTagName(name)`
* `element.style`
* `element.setAttribute(name, value)`
* `element.getAttribute(name)`
* `element.addEventListener(name, function)`
* `$(selector).click(function).`
* `$(selector).change(function).`
* `$(selector).submit(function).`
* `$(selector).attr().`
* `isNaN(value)`
* `$.isNumeric(value)`
* `string.includes(text)`
* `string.endsWith(text)`
* El atributo `disabled` permite inhabilitar un campo del formulario.

**Una solución**

`HTML (body)`

```html
<form id="my-form" action="/form.php" method="POST">
  <div class="field">
    <input id="form-name" type="text" name="name" />
    <p id="form-name-error"></p>
  <div>
  <div class="field">
    <input id="form-lastname" type="text" name="lastname" />
    <p id="form-lastname-error"></p>
  <div>
  <div class="field">
    <input id="form-age" type="number" name="age" />
    <p id="form-age-error"></p>
  <div>
  <div class="field">
    <input id="form-email" type="text" name="email" />
    <p id="form-email-error"></p>
  <div>
</form>
```

`JS`

```js
$(function () {
    $('#my-form').submit(function (event) {
        var errors = false;

        var name = $('#form-name').value;
        if (!name || name.length < 2) {
            errors = true;
            $('#form-name-error').text('Tu nombre debe tener más de dos caracteres');
        }

        var lastname = $('#form-lastname').value;
        if (!lastname || lastname.length < 2) {
            errors = true;
            $('#form-lastname-error').text('Tu apellido debe tener más de dos caracteres');
        }

        var age = $('#form-age').value;
        if (!age || age < 18) {
            errors = true;
            $('#form-age-error').text('Debes ser mayor de edad');
        }

        var email = $('#form-email').value;
        // isValidEmail es una funcion que valida que el forma del email sea correcto (no existe)
        if (!email || !isValidEmail(email) || !email.endsWith('@uc.cl')) {
            errors = true;
            $('#form-email-error').text('Tu correo debe terminar en uc.cl');
        }

        if (errors) {
            event.preventDefault();
        }
    });
});
```

**Pauta**

**Nota:** Existen más soluciones a este problema. Puede cometer errores sintácticos menores y ocupar funciones con nombres descriptivos para ciertas operaciones.

* 3 pts por la validación de cada campo (JS)
* 3 pt por no enviar el formulario en caso de error (JS)
* 2 pts por colocar cada campo (incluyendo espacio de error) (HTML)
* 2 pts por escribir correctamente el formulario (HTML)
