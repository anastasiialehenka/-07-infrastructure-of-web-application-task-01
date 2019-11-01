function checkBrowserSupport(storageType) {
    if (storageType === 'indexedDB') {
        // eslint-disable-next-line max-len
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (!window.indexedDB) {
            // eslint-disable-next-line max-len
            throw new Error('Browser doesn\'t support IndexedDB');
        }
    } else if (!window[storageType]) {
        // eslint-disable-next-line max-len
        throw new Error(`${storageType} type not supported`);
    }
    return true;
}

function getProps(storageType) {
    const obj = {};
    for (let key in window[storageType]) {
        if (window[storageType].hasOwnProperty(key)) {
            obj[key] = JSON.parse(window[storageType][key]);
        }
    }
    return obj;
}

function asyncCallback(callback, item) {
    if (callback) {
        setTimeout(function () {
            callback(item);
        }, 0);
        return true;
    }
}

function openIDB(name, version) {
    return new Promise((res, rej) => {
        const openRequest = indexedDB.open(name, version);
        let db;
        openRequest.onsuccess = () => {
            db = openRequest.result;
            res(db);
        }
        openRequest.onerror = () => {
            db = openRequest.result;
            rej(db);
        }
        openRequest.onupgradeneeded = () => {
            db = openRequest.result;
            if (!db.objectStoreNames.contains('store')) {
                db.createObjectStore('store');
            }
        }
    });
}

function addItemToDB(key, value) {
    return new Promise((res, rej) => {
        Storage._IDB_CONNECTION.then((db) => {
            // eslint-disable-next-line max-len
            const transaction = db.transaction('store', 'readwrite');
            const store = transaction.objectStore('store');
            const request = store.put(value, key);
            request.onerror = () => {
                // eslint-disable-next-line max-len
                console.log(new Error(Storage._IDB_CONNECTION.error.name));
                rej(request.result);
            };
            request.onsuccess = () => {
                res(request.result);
            };
        });
    });
}

function getItemFromDB(key) {
    return new Promise((res, rej) => {
        Storage._IDB_CONNECTION.then((db) => {
            // eslint-disable-next-line max-len
            const transaction = db.transaction('store', 'readonly');
            const store = transaction.objectStore('store');
            const request = store.get(key);
            request.onerror = () => {
                // eslint-disable-next-line max-len
                console.log(new Error(Storage._IDB_CONNECTION.error.name));
                rej(request.result);
            };
            request.onsuccess = () => {
                res(request.result);
            };
        });
    });
}

function getAllValuesFromDB() {
    return new Promise((res, rej) => {
        Storage._IDB_CONNECTION.then((db) => {
            // eslint-disable-next-line max-len
            const transaction = db.transaction('store', 'readonly');
            const store = transaction.objectStore('store');
            const request = store.getAll();
            request.onerror = () => {
                // eslint-disable-next-line max-len
                console.log(new Error(Storage._IDB_CONNECTION.error.name));
                rej(request.result);
            };
            request.onsuccess = () => {
                res(request.result);
            };
        });
    });
}

function getAllKeysFromDB() {
    return new Promise((res, rej) => {
        Storage._IDB_CONNECTION.then((db) => {
            // eslint-disable-next-line max-len
            const transaction = db.transaction('store', 'readonly');
            const store = transaction.objectStore('store');
            const request = store.getAllKeys();
            request.onerror = () => {
                // eslint-disable-next-line max-len
                console.log(new Error(Storage._IDB_CONNECTION.error.name));
                rej(request.result);
            };
            request.onsuccess = () => {
                res(request.result);
            };
        });
    });
}

function uniteKeysAndValues(keys, values) {
    const obj = {};
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = values[i];
    }
    return obj;
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString
        = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}