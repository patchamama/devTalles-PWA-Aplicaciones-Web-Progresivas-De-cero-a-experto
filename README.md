# devTalles PWA: Aplicaciones Web Progresivas. De cero a experto

_https://cursos.devtalles.com/courses/take/PWA_

[LIVE APP - Aplicación en Github Pages ya deployed](https://patchamama.github.io/devTalles-PWA-Aplicaciones-Web-Progresivas-De-cero-a-experto/)

### Herramientas genéricas

- [PWABuilder - Chequea/test/valida página web PWA: manifest.json, service-worker.js con generadores y creador de logos y descarga de app](https://www.pwabuilder.com/)
- [Documentation de PWABuilder](https://docs.pwabuilder.com/#/)
- [PWA Icons & iOS Splash Screen Generator](https://progressier.com/pwa-icons-and-ios-splash-screen-generator)
- [Android Studios (incluye emulator para correr aplicaciones android)](https://developer.android.com/studio)
- [Adaptative Icons for Android](https://stackoverflow.com/questions/57662418/adaptive-icons-on-android-9-with-web-app-manifest) | [editor of maskable logos](https://maskable.app/editor) | [Documentación](https://web.dev/articles/maskable-icon?hl=es-419)
- [Pruebas antes de lanzar app en google play](https://support.google.com/googleplay/android-developer/answer/9842757?hl=es&ref_topic=7071528&sjid=15248319318831200482-EU)

## Secciones

### Sección 2: Fundamentos de las aplicaciones web progresivas

PWA: Aplicaciones Web Progresivas

_PWA no es: una extensión de navegadores web, un framework como React, Vue o Angular, un plugin o librería para los frameworks, no es parecido a React Native, Native Script ni ionic. Aunque están pensadas en *mobile first* no son necesariamente responsive_

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
  console.log('Notificación recibida')
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
- [How to make PWAs re-engageable using Notifications and Push](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Re-engageable_Notifications_Push)

### Sección 6: Estrategias de Cache y Offline Mode

_El alcance de los caches es por dominio (scope)._

- Crear un cache para almacenar los datos de la aplicación

```js
self.addEventListener('install', (event) => {
    console.log('Instalando Service Worker')
    if (window.caches) {
        const cacheName = 'v1';
        const cacheProm = caches.open(cacheName)
            .then(cache => { // Crea la key v1 en el caché y devuelve una promesa con el caché abierto
            //     cache.add('/index.html');

            const cacheAssets = [  // Archivos a almacenar en el caché
                '/', // es importante agregar el slash al final para que sea un caché de dominio
                '/index.html',
                '/assets/style.css',
                '/assets/icon.png',
                '/js/app.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' // se puede cachear una url
            ]
            return cache.addAll(cacheAssets).then(() => {  // Agrega los archivos a la cache
                console.log('Assets cargados en cache')
                cache.delete('/assets/style.css')  // Elimina un archivo de la cache

                cache.put('/index.html', new Response('Nuevo contenido')); // Actualiza un archivo en el caché
            });

            //event.waitUntil(cacheProm); // Espera a que se complete la operación

            cache.match('/index.html').then(response => { // I existe un archivo en el caché lo lee y devuelve una respuesta con el contenido del archivo
                response.text().then(text => console.log(text)) ) // Obtiene el texto de la respuesta
            });
        });

        // Listar los archivos en el caché (keys)
        caches.keys().then(keys => console.log('Keys', keys))

    }
});
```

_APP SHELL: es todo lo que la aplicación necesita para funcionar y puede ser conveniente dejarlo en el caché (css, index, ...)._

Estrategias del caché (en el elemento fetch del EventListener):

- **Cache Only**: solo se carga el archivo si existe en el caché.

```js
// 1 - Cache Only
self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request); // Si existe en el caché, devuelve una respuesta con el contenido del archivo
});
```

- **Cache with network fallback**: se carga el archivo si existe en el caché, sino se descarga del servidor y se almacena todo en el caché para después acceder a estos archivos desde este. El problema de esto es que podríamos mezclar en el caché contenido dinámico con contenido estático APP SHELL y quizás sería mejor crear diferentes caché para estos contenidos.

```js
// 2 - Cache with network fallback
const CACHE_NAME = 'cache-v1'
self.addEventListener('fetch', (e) => {
  const resp = caches
    .match(e.request) // Busca en todos los cachés existentes
    .then((res) => {
      if (res) return res // lee el archivo del caché y devuelve la respuesta con su contenido

      // No existe el archivo,
      // entonces hay que descargarlo de la web
      console.log('No existe en el caché, descargando del servidor...')
      return fetch(e.request).then((newResp) => {
        // Guarda el archivo en el caché
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, newResp) //   Guarda el contenido (newResp) del archivo o url (e.request) en el caché
        })
        return newResp.clone() // Hay que devolver la respuesta para que sea usada en el futuro usando clone
      })
    })
  e.respondWith(resp)
})
```

- **Inmutable cache**: Es un caché que se actualiza solo una vez, y luego es inmutable. Por ejemplo, una imagen de fondo en el navegador o un css como bootstrap. En este caso tendríamos que crear un nuevo caché para guardar los archivos que se actualicen una vez y luego no se actualicen más, teniendo al final tres cachés: uno para los archivos que se actualicen una vez (inmutable), otro para los archivos que se actualicen frecuentemente (dinámico) y otro para los archivos estáticos como los _APP SHELL_.

- **Network with cache fallback**: Siempre se responde a la solicitud del navegador, pero si el servidor no responde se intentará obtener una copia del caché.

```js
//3- Network with cache fallback
const CACHE_DYNAMIC_NAME = 'cache-dynamic-v1'
const CACHE_DYNAMIC_LIMIT = 50
self.addEventListener('fetch', (e) => {
  const respuesta = fetch(e.request)
    .then((res) => {
      if (!res) return caches.match(e.request)
      caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
        cache.put(e.request, res)
        limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT)
      })
      return res.clone()
    })
    .catch((err) => {
      return caches.match(e.request)
    })
  e.respondWith(resp)
})
```

- **Cache with network update**: Se responde con la copia del caché y se actualiza el mismo con la copia del servidor. En este caso es bueno cuando el rendimiento es crítico, pero siempre estarán un paso atrás de la copia del servidor al responderse con la copia anterior que es la actual del caché (antes de actualizarse).

```js
// 4- Cache with network update
const CACHE_STATIC_NAME = 'cache-static-v1'
self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('bootstrap')) {
    return e.respondWith(caches.match(e.request))
  }
  const respuesta = caches.open(CACHE_STATIC_NAME).then((cache) => {
    fetch(e.request).then((newRes) => cache.put(e.request, newRes))
    return cache.match(e.request)
  })
  e.respondWith(respuesta)
})
```

- **Cache & Network Race**: Es una mezcla que permite responder con la copia del caché o el servidor (copia de internet) de forma rápida, y sí las dos fallan entonces se devuelve un error (que puede ser una página personalizada html, jpg).

```js
self.addEventListener('fetch', (e) => {
  // 5- Cache & Network Race

  const respuesta = new Promise((resolve, reject) => {
    let rechazada = false

    const falloUnaVez = () => {
      if (rechazada) {
        if (/\.(png|jpg)$/i.test(e.request.url)) {
          resolve(caches.match('/img/no-img.jpg'))
        } else if (e.request.headers.get('accept').includes('text/html')) {
          resolve(caches.match('/pages/offline.html'))
        } else {
          reject('No se encontró respuesta')
        }
      } else {
        rechazada = true
      }
    }

    fetch(e.request)
      .then((res) => {
        res.ok ? resolve(res) : falloUnaVez()
      })
      .catch(falloUnaVez)

    caches
      .match(e.request)
      .then((res) => {
        res ? resolve(res) : falloUnaVez()
      })
      .catch(falloUnaVez)
  })

  e.respondWith(respuesta)
})
```

Todos los ejemplos están en la carpeta: [PWA/05-navegacion-offline](https://github.com/patchamama/devTalles-PWA-Aplicaciones-Web-Progresivas-De-cero-a-experto/tree/main/PWA/05-navegacion-offline)

#### Recursos

- [David Walsh - Cache](https://davidwalsh.name/cache)
- [Google Developers - Cache API](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api?hl=es)

### Sección 7: Despliegues a dispositivos móviles

- El archivo manifest.json

  - [Google Chrome manifest.json](https://web.dev/add-manifest/)
  - [material+de+clase+-+Manifest.zip](https://import.cdn.thinkific.com/643563/courses/2086052/materialdeclaseManifest-230130-114952.zip)
  - [El+manifiesto+Google+Developer.pdf](https://import.cdn.thinkific.com/643563/courses/2086052/ElmanifiestoGoogleDeveloper-230130-114952.pdf)
  - [MDN Web app Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) 

  - Generadores de Manifest.json
    - https://app-manifest.firebaseapp.com/ (recomendado)
    - https://tomitm.github.io/appmanifest/

- [LIVE APP - Aplicación en Github Pages ya deployed](https://patchamama.github.io/devTalles-PWA-Aplicaciones-Web-Progresivas-De-cero-a-experto/)

**Style.css. Código CSS para prevenir el pull to refresh, select, highlight y callouts así**

```css
/* for PwA prevent pull to refresh, select, highlight and callouts */
body {
  overscroll-behavior-y: contain;
  -webkit-user-select: none;
  -webkit-tag-highlight-color: transparent;
  -webkit-touch-callout: none;
}
```

### Recursos

- [Guía de estilos IOS - medium](https://medium.com/appscope/designing-native-like-progressive-web-apps-for-ios-1b3cdda1d0e8)
- [PDF con guía de estilos IOS](https://import.cdn.thinkific.com/643563/courses/2086052/Guiadeestilosios-230130-115131.pdf)

### Sección 8: IndexedDB - Reforzamiento de base de datos local

#### Recursos

- [MDN - IndexedDB](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API)
- [Getting Started Guide - PouchDB](https://pouchdb.com/guides/getting-started.html)
- [Getting+Started+Guide.pdf](https://import.cdn.thinkific.com/643563/courses/2086052/GettingStartedGuide-230130-133117.pdf)
- [pouchdb-getting-started-todo.zip](https://import.cdn.thinkific.com/643563/courses/2086052/pouchdbgettingstartedtodo-230130-133117.zip)

#### PouchDB - [API Reference - PouchDB](https://pouchdb.com/api.html). Ejemplo `CRUD`:

```js
// Agregar referencia de PouchDB en el proyecto desde cdn:
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js')
// y puede ser importado desde el html
// <script src="https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js"></script>

// Crear nueva base de datos con nombre "mydb"
const db = new PouchDB('mydb')
// Objeto a grabar en base de datos
const obj = {
  _id: new Date().toISOString(),
  title: 'My Todo',
  isComplete: false
}
// Grabar objeto en base de datos
db.put(obj).then(() => {
  // sí el objeto ya existe, se actualiza, normalmente sí la base de datos está vacía, se crea o sí el id no existe
  console.log('Todo added to database')
})
// Obtener todos los objetos de la base de datos
db.allDocs({ include_docs: true, descending: false }).then((doc) => {
  console.log('All docs :', doc)
})
// Obtener un solo objeto de la base de datos
db.get('1234567890').then((doc) => {
  console.log('Doc 1:', doc)
})
// Cambiar el valor de isComplete en cada uno de los objetos de la base de datos
db.allDocs({ include_docs: true, descending: false }).then((doc) => {
  doc.rows.forEach((row, index) => {
    let doc = row.doc // let {row} = doc;
    doc.isComplete = true
    db.put(doc)
  })
})
// Eliminar todos los registros de la base de datos que tengan isComplete = true
db.allDocs({ include_docs: true, descending: false }).then((doc) => {
  doc.rows.forEach((row, index) => {
    let doc = row.doc // let {row}  = doc;
    if (doc.isComplete === true) {
      db.remove(doc)
      console.log('Removed doc:', doc)
    }
  })
})
// Eliminar todos los registros de la base de datos
db.allDocs({ include_docs: true, descending: false }).then((doc) => {
  doc.rows.forEach((row, index) => {
    let doc = row.doc // let  {row}  = doc;
    db.remove(doc)
    console.log('Removed doc:', doc)
  })
})
```

### Sección 9: Sincronización sin conexión - Offline Synchronization

- Inicio del proyecto y backend server

```js
cd 09-twittor-offline-posting
rm package-lock.json
npm install
npm run dev
# abrir navegador en una nueva terminal
open localhost:3000
```

- Mostrar en consola sí está online o no la conexión

```js
importScripts(
  'https://cdn.jsdelivr.net/npm/md-toast@0.0.1-alpha.1/toast.min.js'
)
// agregar el toast.min.css en el index.html
// <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/dmuy/Material-Toast@{version}/dist/mdtoast.css">
// Detectar cambios de conexión
function isOnline() {
  if (navigator.onLine) {
    // tenemos conexión
    // console.log('online');
    // postear en la base de datos
    $.mdtoast('Online', {
      interaction: true,
      interactionTimeout: 1000,
      actionText: 'OK!'
    })
  } else {
    // No tenemos conexión
    $.mdtoast('Offline', {
      interaction: true,
      actionText: 'OK',
      type: 'warning'
    })
  }
}

window.addEventListener('online', isOnline)
window.addEventListener('offline', isOnline)

isOnline()
```

- Se puede grabar una acción de sync para cuando se recupere la conexión a internet con una instrucción:

```js
// ...
// Generar un registro para ser capturado después en el EventListener sí se ha perdido la conexión y por ejemplo, se desea grabar un post en la bds del navegador para después hacer el postear en el servidor al recuperarse la internet
self.registration.sync.register('nuevo-post')
// ...

// tareas asíncronas cuando se recupere la internet
self.addEventListener('sync', (e) => {
  console.log('SW: Sync')

  if (e.tag === 'nuevo-post') {
    // postear a BD cuando hay conexión
    const respuesta = postearMensajes()
    e.waitUntil(respuesta)
  }
})
```

### Recursos

- Material Notifications: https://github.com/dmuy/Material-Toast

### Sección 10: Notifications - Push Notifications - Push Server

- Permisos para notificaciones

```js
function enviarNotificacion() {
  const notificationOpts = {
    body: 'Este es el cuerpo de la notificación',
    icon: 'img/icons/icon-72x72.png'
  }

  const n = new Notification('Hola Mundo', notificationOpts)

  n.onclick = () => {
    console.log('Click')
  }
}

function notificarme() {
  if (!window.Notification) {
    console.log('Este navegador no soporta notificaciones')
    return
  }

  if (Notification.permission === 'granted') {
    new Notification('Hola Mundo! - granted')
    // enviarNotificacion()
  } else if (
    Notification.permission !== 'denied' ||
    Notification.permission === 'default'
  ) {
    Notification.requestPermission(function (permission) {
      console.log(permission)
      if (permission === 'granted') {
        new Notification('Hola Mundo! - pregunta')
        // enviarNotificacion()
      }
    })
  }
}

notificarme()
```

#### Recursos

- [npm web-push](https://www.npmjs.com/package/web-push)
- [npm urlsafe-base64](https://www.npmjs.com/package/urlsafe-base64)
- [Web-Push package](https://www.npmjs.com/package/web-push)
- [Web Fundamentals - Google Developers](https://web.dev/push-notifications-display-a-notification/)
- [Patrones de vibración](https://gearside.com/custom-vibration-patterns-mobile-devices/)

### Sección 11: Recursos Nativos

### Sección 12. React/PWA - Cache API (complemento adicional)

_Esta sección no existe en el curso pero lo he agregado con mis propias notas para lograr integrarlo en aplicaciones de react._

- Instalar react

  - Instalar React con CRA-PWA: `npx create-react-app --template cra-template-pwa` (en CRA se incluyen automáticamente todas las librerías necesarias para crear aplicaciones web progresivas). Sí se desea actualizar un proyecto ya existente de CRA, se pueden mudar los archivos de configuración de otro proyecto ya existente a la carpeta `public` y `src` del proyecto (serviceWorkerRegistration.js, service-worker.js, manifest.json, logos, la declaración de manifest.json en index,...).
  - Usando vite: `npm install -D vite-plugin-pwa` (probar esto)

- Editar `src/service-worker.js` y agregar el código de cacheo según nuestras necesidades, eligiendo los archivos que se actualicen frecuentemente y los que se actualicen una vez. Con `registerRoute` se puede lograr esto. También agregar el código de cacheo para los archivos estáticos como _APP SHELL_. Podemos elegir varias estrategias:
  - Cache with network fallback (CacheFirst): Primero se busca en el caché, si no está, se descarga del servidor y se brinda el contenido más se actualiza el caché.
  - Cache with Network update (StaleWhilerevalidate): Primero se busca en el caché, si no está, se descarga del servidor más se actualiza el caché. Si hay una respuesta de cache, se usa ese archivo.

_Sí se desea agregar código de registro de service worker en una aplicación que no cargue por defecto el código de react en la página de inicio, que puede ser en una página de login, en un index_wrapper.html o base.html de django. [Este](https://github.com/patchamama/devTalles-PWA-Aplicaciones-Web-Progresivas-De-cero-a-experto/blob/main/PWA/example-generic-code-serviceWorkerRegister.js) código de ejemplo puede servir._

Una vez creada la PWA, es posible crear los apk(s) para subirla a google play usando esta [guía](https://developers.google.com/codelabs/pwa-in-play?hl=es-419#1) o con [PWABuilder](https://pwabuilder.com). 

#### Fuentes

- [React - CRA - Making a Progressive Web App](https://create-react-app.dev/docs/making-a-progressive-web-app/)
- [Ejemplos](https://github.com/imranhsayed/react-workshop/blob/05-react-pwa-workbox-example/src/src-sw.js)
- [Cómo agregar tu app web progresiva a Google Play](https://developers.google.com/codelabs/pwa-in-play?hl=es-419#1) 
- [PWABuilder](https://pwabuilder.com)
