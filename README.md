# devTalles-PWA-Aplicaciones-Web-Progresivas-De-cero-a-experto

_https://cursos.devtalles.com/courses/take/PWA_

## Secciones

### Sección 2: Fundamentos de las aplicaciones web progresivas

PWA: Aplicaciones Web Progresivas

_PWA no es: una extensión de navegadores web, un framework como React, Vue o Angular, un plugin o librería para los frameworks, no es parecido a React Native, Native Script ni ionic. Aunque están pensadas en \_mobile first_ no son necesariamente responsive\_

_PWA es una aplicación web (también puede ser una página web) que puede implementar push notificación, puede tener una ubicación en el home screen de un dispositivo móvil, puede funcionar offline, usa características del dispositivo (uso de cámara, micrófono...), se actualiza en el dispositivo, es confiable, pesa poco, son por lo general pequeñas, rápida a la hora de cargar y confiable. Es diferente a una aplicación nativa (esta se actualiza en la app store y en la pwa no es necesario hacerlo así y se puede actualizar automáticamente sin permiso del usuario)._

Son importantes pues la mayoría de los visitantes usan un dispositivo móvil por lo que es importante tener una versión web para acceder a las páginas de las empresas.

Sí ya se tiene una aplicación web, no es necesario hacer una aplicación nativa desde cero para portarla a un dispositivo móvil, es suficiente con agregar un grupo de características y convertirla en un PWA:

- Push server (permite hacer notificaciones desde la pwa al dispositivo),
- indexedDB (permite guardar cambios offline o posteos en una base de datos aunque el usuario no tiene una internet),
- Manifest (es un archivo json que dice como va a lucir la app cuando esté en el homescreen del dispositivo),
- Service Worker (_el corazón de una PWA que es un archivo js plano -como sw.js-, al hacerse una petición a internet, este intercepta las peticiones como un proxy y este usa un cache que permite acceder a información de forma rápida o información cacheada sí está offline. Este corre en el background en un hilo independiente de la página web como si fuera una aplicación independiente. Al usarse o accederse a este sí no está instalado, se descarga el js, se parsea o revisa, se instala y activa sí no ha habido ningún error. Una vez instalado pasa al paso waiting en que espera a que se desactiven otros service worker para ejecutarse y tomar el control._)

Las aplicaciones PWA deben de service en un protocolo seguro HTTPS (con excepción del localhost que accede al dispositivo).
PWA solo funciona con localhost usando http (no con ips) o https.

#### Recursos

- [1- que son las pwas.pdf](https://import.cdn.thinkific.com/643563/courses/2086052/1quesonlaspwas-230127-134659.pdf)
- [2- Por que construir una pwa.pdf](https://import.cdn.thinkific.com/643563/courses/2086052/2Porqueconstruirunapwa-230127-134659.pdf)
- [3- Conceptos clave de las PWA.pdf](https://import.cdn.thinkific.com/643563/courses/2086052/3ConceptosclavedelasPWA-230127-134659.pdf)

### Sección 3: Reforzamiento Promesas, Fetch API y HttpServer

_CALLBACK_

```js
const sumarUno ( numero, callback ) => {
    if (numero >= 7) {
    callback('El número es muy alto');
    return;
    }
    setTimeOut(()=> callback (null, numero + 1), 800);
}


sumarUno( 5, function (error, nuevoValor) {
    ir (error) {
        console.log(error);
        return;
    }
    sumarUno( nuevoValor, function (error, nuevoValor2) {
        ir (error) {
            console.log(error);
            return;
        }
        sumarUno( nuevoValor, function (error, nuevoValor3) {
            ir (error) {
                console.log(error);
                return;
            }
            console.log(nuevoValor3)
        }
    }
})
```

_PROMESAS_

- Instalar servidor web de forma global (basado en nodejs): `npm install http-server -g`
- Ejecutar servidor en carpeta actual en el puerto 8080: `http-server -p 8080`
- Ejecutar cualquier archivo js: `node <archivo.js>`

Algunas equivalencias:

```js
const sumarUno ( numero ) => {
    return new Promise( (resolve, reject) => {
         if (numero >= 7) {
            reject('El número es muy alto')
         }
         setTimeOut(()=>{resolve(numero+1)}, 800)
    })
}
// 1
sumarUno( 5 )
    .then( function (nuevoValor) {
        return sumarUno( nuevoValor )    // devuelve una nueva promesa cuyo resultado puede ser capturado en el próximo .then()
    })
// 2 conversión a función de flecha function | (arg) {sentence(arg)} | (arg) => {sentence(arg)} | arg => sentence(arg) | sentence
sumarUno( 5 )
    .then( nuevoValor  => sumarUno( nuevoValor ) )
// 3  arg => sentence(arg) | sentence
sumarUno( 5 )
    .then( sumarUno )
    .catch( error => console.log(error))
// 4 forma completa simplificada
sumarUno( 5 )
    .then( sumarUno )
    .then( sumarUno )
    .catch( console.log )

// --- prom-3.js
sumarUno(3).then(console.log)
sumarUno(5).then(console.log) // node prom-3.js > 4 y 6
// -- usando Promise.all
Promise.all([sumarUno(3), sumarUno(5), true, 'Hola mundo'])
    .then( respuestas => {
        console.log(respuestas)
    }) // o mejor .then(console.log)
    .catch(console.log)
    // Respuesta: array [4, 5, true, 'Hola mundo']
    // Sí alguna de las promesas devuelve un error (reject) entonces el catch mostraría este
    // y no se obtendrían más resultados como aquí al ser el número del argumento >=7:
 Promise.all([sumarUno(3), sumarUno(7), true, 'Hola mundo'])
    .then( respuestas => {
        console.log(respuestas)
    }) // o mejor .then(console.log)
    .catch(console.log)
    // Respuesta del catch: El número es muy alto

// El Promise.race() a diferencia del Promise.all() devuelve la primera respuesta obtenida (la más rápida)
```

_FETCH API_

[API de pruebas para peticiones - reqres.in](https://reqres.in/)

```js
fetch('https//reqres.in/api/users')
  .then((resp) => resp.json())
  .then((respObj) => {
    console.log(respObj)
    console.log(respObj.page)
  })
```

- Petición POST

```js
let usuario = {
  nombre: 'Fernando',
  edad: 32
}

fetch('https://reqres.in/api/users', {
  method: 'POST', // PUT, DELETE,...
  body: JSON.stringify(usuario), // data
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then((resp) => resp.json())
  .then(console.log)
  .catch((error) => {
    console.log('Error en la petición')
    console.log(error)
  })
```

- Response.clone() y manejo de respuestas y errores

```js
fetch('https://reqres.in/api/users/1000')
    .then( resp => {
        if ( resp.ok ) {  // resp.ok = true and resp.status = 200
            resp.clone().json()  // Clona la respuesta para que se pueda volver a usar en otro resp.json() u otro tipo de llamada
                .then( { console.log } ); // Respuesta normal que se devuelve y se puede usar para trabajar con los resultados como objetos para actualizar el caché, localStore...
            // Sí fuera necesario más capturas de respuestas, sería necesario agregar más:
            // resp.clone().json().then( { ...código aquí adicional... } );
            return resp.json();
        } else {  // resp.ok = false and resp.status = 404 (not found) u otro error.
            // Los errores como el 404 (no existe) no generan un reject, sino un resolve con el valor de resp.clone()
            // que contiene el status y los headers de la respuesta original.
            // console.log('No existe el usuario 1000');
            throw new Error('No existe el usuario 1000'); // Esto genera un reject, que se captura por el catch
        }
    })
    .then( console.log )  // se captura aquí el resultado de la respuesta resp.json(), ya sea el objeto o el texto.
    .catch( error => {
        console.log('Error en la petición');
        console.log(error);
    });
```

- Leer archivos HTML

```js
fetch('no-encontrado.html')
  .then((resp) => {
    if (resp.ok) {
      // resp.ok = true and resp.status = 200 (ok).
      return resp.text()
    } else {
      // resp.ok = false and resp.status = 404 (not found) u otro error.
      throw new Error(`No existe el archivo ${resp.url}`) // Esto genera un reject, que se captura por el catch pues el error 404 no genera un reject
    }
  })
  .then((html) => {
    let body = document.querySelector('body')
    body.innerHTML = html
  })
  .catch((error) => {
    console.log('Error en la petición')
    console.log(error)
  })
```

_`resp => resp.json()` serializa los datos de un resultado de tipo ReadeableStream como un JSON._

#### Fuentes

- https://www.npmjs.com/package/http-server
- [Promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/prototype)
- [Promise.all()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/all)
- [Promise.race()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/race)
- [Promise.resolve()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/resolve)
- [Promise.reject()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/reject)
- [Fetch Methods](https://developer.mozilla.org/en-US/docs/Web/API/Response)
- [Chrome Cors Plugin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
- [URL - CreateObjectUrl](https://developer.mozilla.org/en-US/docs/Web/API/URL)
- [XmlHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
- [Methods del response](https://developer.mozilla.org/es/docs/Web/API/Response#methods)
- [Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Utilizando_Fetch)
