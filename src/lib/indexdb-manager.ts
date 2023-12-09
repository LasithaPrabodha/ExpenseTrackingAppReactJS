type callback = (data?: any) => void;

export default class IndexDbManager {
  private static expDbName = "expenses-db";
  private static version = 1;
  public static expStoreName = "exp-store";
  public static catStoreName = "cat-store";

  static openDB(callback: callback) {
    let db: IDBDatabase;
    const request = indexedDB.open(this.expDbName, this.version);

    request.onerror = (event: Event) => {
      console.log("ExpenseApp isn't allowed to use IndexedDB?!" + (event.target as any)?.errorCode);
    };

    request.onupgradeneeded = (event: Event) => {
      db = request.result;

      if (!db.objectStoreNames.contains(this.expStoreName)) {
        db.createObjectStore(this.expStoreName, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(this.catStoreName)) {
        db.createObjectStore(this.catStoreName, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      db = (event.target as any)?.result;

      callback && callback(db);
    };
  }

  static addToStore(expense: any, storeName: string = this.expStoreName) {
    this.openDB((db) => {
      // start a transaction
      const transaction = db.transaction(storeName, "readwrite");

      // create an object store
      const store = transaction.objectStore(storeName);

      if (Array.isArray(expense)) {
        expense.forEach((e) => this.addToDb(store, e));
      } else {
        this.addToDb(store, expense);
      }

      transaction.onerror = function (event: Event) {
        console.log("transaction failed", event);
      };

      transaction.oncomplete = (event: Event) => {
        db.close();
      };
    });
  }

  private static addToDb(store: any, expense: any) {
    // add key and value to the store
    const request = store.put(expense);

    request.onerror = function () {
      console.log("Error did not save to store", request.error);
    };
  }

  static getFromStore(storeName: string = this.expStoreName) {
    return new Promise((resolve, reject) => {
      this.openDB((db) => {
        // start a transaction
        const transaction = db.transaction(storeName, "readonly");
        // create an object store
        const store = transaction.objectStore(storeName);

        // get key and value from the store
        const request = store.getAll();

        request.onsuccess = function (event: Event) {
          resolve((event.target as any)?.result);
        };
        request.onerror = function () {
          console.log("Error did not read to store", request.error);
        };

        transaction.onerror = function (event: Event) {
          console.log("transaction failed", event);
        };
      });
    });
  }
}
