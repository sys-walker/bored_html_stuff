function storage_setItem(key, value){
    if(typeof(key) !== 'string'){
        key = JSON.stringify(key)
    }
    if (typeof (value) !== 's') {
        value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
}
function storage_getItem(key){
    let value = localStorage.getItem(key);
    return value === null ? undefined : value;
}
function storage_removeItem(key){
    localStorage.removeItem(key);
}