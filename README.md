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

- Instalar servidor web de forma global (basado en nodejs): `npm install http-server -g`
- Ejecutar servidor en carpeta actual en el puerto 8080: `http-server -p 8080`
- Ejecutar cualquier archivo js: `node <archivo.js>`

#### Fuentes

- https://www.npmjs.com/package/http-server
- [Promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/prototype)
- [Promise.all()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/all)
- [Promise.race()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/race)
- [Promise.resolve()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/resolve)
- [Promise.reject()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/reject)
