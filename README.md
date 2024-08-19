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

### Sección 4: Service Worker y Fetch Events

- _Para que un service worker funcione, debe estar instalado en el navegador del usuario y tener un certificado ssl la URL a visitar o donde está desplegado._
- _Es un archivo js que está pendiente de sucesos y tiene muchos AddEventListener() en dependencia de diferentes eventos: install, activate, push, fetch, sync, message._
- _El service worker trabaja en el background en su propio hilo, como un proxy entre la internet y la app web, también mantiene ejecutando en el background mandando notificaciones aunque se cierre el navegador y puede estar con una relación 1:1 o 1:muchos tabs abiertos. Nos permite hacer actualizaciones en el background, actualizar el cache, una base de datos, etc._

```sh
cd 02-service-worker
http-server -p 8080
open http://localhost:8080
```

- Código de ejemplo:

```js
//if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {
  // Chequear sí Service Worker está instalado en el navegador
  navigator.serviceWorker.register('/sw.js') // Instalar el SW que está en el archivo sw.js
  console.log('SW installed')

  self.addEventListener('fetch', (event) => {
    console.log('SW fetch event', event)
    // posibles respuestas (interceptada la respuesta):
    //const resp = fetch(event.request.url)
    //const resp = fetch('img/main.jpg') // se puede usar una imagen u otro archivo (style.css) como respuesta
    //const resp = fetch(event.request)

    // Otra forma de inteceptar una respuesta, por ejemplo, para cambiar los estilos
    if (event.request.url.includes('style.css')) {
        // const resp = fetch('style-sw.css') // cargar otro archivo de stilos
        const resp = new Response('body { background-color: red; }', headers: { Content-Type: 'text/css'});  // se genera una nueva respuesta con un nuevo estilo
        event.respondWith(resp);
    }

    // Manejo de errores (recuerda que el error 404 o resp.ok=false no se captura con el catch)
    const resp = fetch( event.request )
        .then( resp => {
            return resp.ok ? resp : fetch('img/main.jpg');  // en caso de que hay algún error, entonces carga una imagen
        });
    event.respondWith(resp) // Enviar respuesta o `return resp;` para devolver la respuesta sin interceptar como una promesa

  })
} else {
  console.log('SW not installed')
  // No se puede instalar el SW en el navegador, por lo que no se hace nada
}
```

_El archivo sw.js debe de estar ubicado junto con el archivo index.html para que tenga acceso a todos los archivos de la web._
_Sí ha habido al menos un cambio en al archivo del SW, el navegador intentará reinstalarlo._

#### Fuentes

- [Can I use Service Worker](https://caniuse.com/?search=service%20worker)
- [jshint generator o eslint extensión de VSCode](https://import.cdn.thinkific.com/643563/courses/2086052/renombrarajshintrc-230130-095406.zip)
- [MDN Response()](https://developer.mozilla.org/es/docs/Web/API/Response)
- [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)

### Sección 5: Ciclo de vida de un Service Worker y los listeners más comunes

Entre los listeners más comunes están:

- fetch `self.addEventListener('fetch', event => {` // FETCH: Manejo de peticiones HTTP y se aplican estrategias del caché
- sync `self.addEventListener('sync', event => {` // SYNC: Recuperamos la conexión a internet
- install `self.addEventListener('install', event => {` // Descargar assets y creamos un cache de assets
- activate `self.addEventListener('activate', event => {` // // Cuando el SW toma el control de la aplicación y es bueno borrar caché viejo
- push `self.addEventListener('push', event => {` // PUSH: Manejar las push notifications
  En la app se realiza `Notification.requestPermission().then( result => {` y `reg.showNotification(Mensaje-aquí-de-notificación);`

```js
// ---------------------------------------------
// sw.js

// Ciclo de vida del SW

self.addEventListener('install', (event) => {
  // Descargar assets
  // Creamos un cache
  console.log('SW: Instalando SW')

  const instalacion = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('SW: Instalaciones terminadas')
      self.skipWaiting() // no es lo más recomendable pues puede que el usuario esté en una conexión lenta descargando alguna información importante o haciendo un push y esto puede determinar que se pierda información
      resolve()
    }, 1)
  })

  event.waitUntil(instalacion) // Espera a que la promesa se resuelva para continuar con el SW
})

// Cuando el SW toma el control de la aplicación
self.addEventListener('activate', (event) => {
  // Borrar cache viejo

  console.log('SW2: Activo y listo para controlar la app')
})

// FETCH: Manejo de peticiones HTTP
self.addEventListener('fetch', (event) => {
  // Aplicar estrategias del cache
  // console.log( 'SW:', event.request.url );
  // if ( event.request.url.includes('https://reqres.in/') ) {
  //     const resp = new Response(`{ ok: false, mensaje: 'jajaja'}`);
  //     event.respondWith( resp );
  // }
})

// SYNC: Recuperamos la conexión a internet
self.addEventListener('sync', (event) => {
  console.log('Tenemos conexión!')
  console.log(event)
  console.log(event.tag) // cada tag es un evento que se dispara en el syncManager en el app.js
})

// PUSH: Manejar las push notifications
self.addEventListener('push', (event) => {
  console.log('Notificacion recibida')
})

// ---------------------------------------------
// app.js

// Detectar si podemos usar Service Workers
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    // setTimeout(() => {

    //     reg.sync.register('posteo-gatitos');
    //     console.log('Se enviaron fotos de gatitos al server');

    // }, 3000);
    Notification.requestPermission().then((result) => {
      console.log(result)
      reg.showNotification('Hola Mundo!')
    })
  })
}

// if ( window.SyncManager ) { }

// fetch('https://reqres.in/api/users')
//     .then( resp => resp.text() )
//     .then( console.log );
```

#### Fuentes

- [Can I Use : Sync Manager](https://caniuse.com/?search=syncmanager)
- [Service Worker Lifecycle](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API)

- [Fetch Event](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent)
- [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [Cache Storage API](https://developer.mozilla.org/es/docs/Web/API/CacheStorage)
- [Cache Keys](https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#cache_keys)
