function getAllFunc(storageType, callback) {
    let recordsObj;
    let values;
    let keys;
    if (!storageType) {
        storageType = 'localStorage';
    }
    if (checkBrowserSupport(storageType)) {
         if (storageType === 'indexedDB') {
            if (typeof (callback) === 'function') {
                getAllValuesFromDB().then((item) => {
                    values = item;
                });
                getAllKeysFromDB().then((item) => {
                    keys = item;
                    // eslint-disable-next-line max-len
                    recordsObj = uniteKeysAndValues(keys, values);
                    callback(recordsObj);
                });
            } else {
                // eslint-disable-next-line max-len
                console.log(new Error('Callback param required'));
            }
         } else {
             recordsObj = getProps(storageType);
             for (const prop in recordsObj) {
                 if (recordsObj[prop].type === 'blob') {
                     // eslint-disable-next-line max-len
                     recordsObj[prop] = dataURItoBlob(recordsObj[prop].text);
                 }
             }
             asyncCallback(callback, recordsObj);
         }
        return recordsObj;
    }
}