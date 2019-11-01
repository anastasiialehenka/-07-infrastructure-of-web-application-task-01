function getFunc(key, storageType, callback) {
    let record;
    if (!storageType) {
        storageType = 'localStorage';
    }
    if (checkBrowserSupport(storageType)) {
        if (storageType === 'indexedDB') {
            if (typeof (callback) === 'function') {
                getItemFromDB(key).then((item) => {
                    record = item;
                    callback(record);
                });
            } else {
                // eslint-disable-next-line max-len
                console.log(new Error('Callback param required'));
            }
        } else {
            if (window[storageType][key]) {
                record = JSON.parse(window[storageType][key]);
                if (record.type === 'blob') {
                    record = dataURItoBlob(record.text);
                }
            }
            else {
                console.log(new Error('No item with such key'));
            }
            asyncCallback(callback, record);
        }
        return record;
    }
}