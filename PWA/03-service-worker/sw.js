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
