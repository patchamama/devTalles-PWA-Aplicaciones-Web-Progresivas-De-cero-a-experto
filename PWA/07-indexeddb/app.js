// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1)

// Se actualiza cuando se crea o se sube de versión
request.onupgradeneeded = (event) => {
  console.log('Actualización de BD')

  let db = event.target.result

  db.createObjectStore('heroes', {
    keyPath: 'id'
  })
}

// Manejo de errores
request.onerror = (event) => {
  console.log('DB error:', event.target.error)
}

// Insertar datos
request.onsuccess = (event) => {
  let db = event.target.result
  let heroesData = [
    { id: '111', heroe: 'Spiderman', mensaje: 'Aqui su amigo Spiderman' },
    { id: '222', heroe: 'Ironman', mensaje: 'Aqui en mi nuevo Mark 50' }
  ]

  let heroesTransaction = db.transaction('heroes', 'readwrite')
  heroesTransaction.onerror = (event) => {
    console.log('Error guardando', event.target.error)
  }

  let heroesStore = heroesTransaction.objectStore('heroes')

  for (let heroe of heroesData) {
    heroesStore.add(heroe)
  }

  heroesTransaction.oncomplete = (event) => {
    console.log('Heroes guardados en BD')
  }
}

// Leer datos
request.onsuccess = (event) => {
  let db = event.target.result
  let heroesTransaction = db.transaction('heroes', 'readonly')
  let heroesStore = heroesTransaction.objectStore('heroes')

  let heroeRequest = heroesStore.get('111')

  heroeRequest.onsuccess = () => {
    console.log(heroeRequest.result)
  }
}

// Leer todos los datos
request.onsuccess = (event) => {
  let db = event.target.result
  let heroesTransaction = db.transaction('heroes', 'readonly')
  let heroesStore = heroesTransaction.objectStore('heroes')

  let heroesRequest = heroesStore.openCursor()

  heroesRequest.onsuccess = (event) => {
    let cursor = event.target.result

    if (cursor) {
      console.log(cursor.value)
      cursor.continue()
    } else {
      console.log('No hay más registros')
    }
  }
}

// Actualizar registros
request.onsuccess = (event) => {
  let db = event.target.result
  let heroesTransaction = db.transaction('heroes', 'readwrite')
  let heroesStore = heroesTransaction.objectStore('heroes')

  let heroeRequest = heroesStore.get('111')

  heroeRequest.onsuccess = () => {
    let heroe = heroeRequest.result
    heroe.mensaje = 'Nuevo mensaje'
    heroesStore.put(heroe)
  }
}

// Borrar registros
request.onsuccess = (event) => {
  let db = event.target.result
  let heroesTransaction = db.transaction('heroes', 'readwrite')
  let heroesStore = heroesTransaction.objectStore('heroes')

  heroesStore.delete('111')
}

// Borrar base de datos
let deleteRequest = window.indexedDB.deleteDatabase('mi-database')

deleteRequest.onsuccess = () => {
  console.log('Database eliminada')
}

deleteRequest.onerror = () => {
  console.log('Error eliminando DB')
}

deleteRequest.onblocked = () => {
  console.log('Eliminación bloqueada, cierre todas las conexiones abiertas')
}
