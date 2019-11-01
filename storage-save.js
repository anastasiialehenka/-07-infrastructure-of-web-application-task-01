function saveFunc(key, value, storageType, callback) {
    let strValue;
    const reader = new FileReader();
    // eslint-disable-next-line max-len

    if (!storageType) {
        storageType = 'localStorage';
    }

    if (checkBrowserSupport(storageType)) {
        if (storageType === 'indexedDB') {
            if (typeof (callback) === 'function') {
                if (value instanceof Blob) {
                    // eslint-disable-next-line max-len
                    reader.readAsDataURL(value);
                    // eslint-disable-next-line max-len
                    reader.addEventListener('loadend', (e) => {
                        addItemToDB(key, value).then(() => {
                            callback();
                        });
                    })
                } else {
                    addItemToDB(key, value).then(() => {
                        callback();
                    });
                }
            } else {
                // eslint-disable-next-line max-len
                console.log(new Error('Callback param required'));
            }
        } else {
            if (value instanceof Blob) {
                // eslint-disable-next-line max-len
                reader.readAsDataURL(value);
                // eslint-disable-next-line max-len
                reader.addEventListener('loadend', (e) => {
                    const obj = {
                        text: e.target.result,
                        type: 'blob'
                    };
                    strValue = JSON.stringify(obj);
                    console.log(strValue);
                    // eslint-disable-next-line max-len
                    window[storageType].setItem(key, strValue);
                    asyncCallback(callback);
                });
            } else {
                if (typeof (value) !== 'string') {
                    strValue = JSON.stringify(value);
                } else {
                    strValue = value;
                }
                window[storageType].setItem(key, strValue);
                asyncCallback(callback);
            }
        }
    }
}
