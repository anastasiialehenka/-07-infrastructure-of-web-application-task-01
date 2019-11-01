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
            record = JSON.parse(window[storageType][key]);
            if (record.type === 'blob') {
                record = dataURItoBlob(record.text);
            }
            asyncCallback(callback, record);
        }
        return record;
    }
}