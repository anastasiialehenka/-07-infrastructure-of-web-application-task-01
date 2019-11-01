const Storage = {
    save: saveFunc,
    get: getFunc,
    getAll: getAllFunc,
    LOCAL_STORAGE: 'localStorage',
    SESSION_STORAGE: 'sessionStorage',
    INDEXED_DB: 'indexedDB',
    _IDB_CONNECTION: openIDB('db', 1)
};