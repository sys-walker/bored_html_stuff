export class LStorage {
  static dbName = 'ExperimentOS';
  static storeName = 'Storage';
  static db = null;

  // Inicializa la base de datos si no está abierta
  static async init(dbName = this.dbName, storeName = this.storeName) {
    if (this.db) return true;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
      request.onerror = () => {
        alert('Error al abrir IndexedDB');
        return reject('Error al abrir IndexedDB');
      };
      request.onsuccess = () => {
        this.db = request.result;
        this.dbName = dbName;
        this.storeName = storeName;
        resolve(true);
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };
    });
  }

  static async setItem(key, value, dbName = this.dbName, storeName = this.storeName) {
    await this.init(dbName, storeName);
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      store.put(value, key);
      transaction.oncomplete = () => resolve(value);
      transaction.onerror = () => reject('Error al guardar el dato');
    });
  }

  static async getItem(key, dbName = this.dbName, storeName = this.storeName) {
    await this.init(dbName, storeName);
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result ?? undefined);
      request.onerror = () => reject('Error al obtener el dato');
    });
  }

  static async removeItem(key, dbName = this.dbName, storeName = this.storeName) {
    await this.init(dbName, storeName);
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      store.delete(key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject('Error al eliminar el dato');
    });
  }
}
