function setItem(key, value){
    if(typeof(key) !== 'string'){
        key = JSON.stringify(key)
    }
    if (typeof (value) !== 's') {
        value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
}
function getItem(key){
    let value = localStorage.getItem(key);
    return value === null ? undefined : value;
}
function removeItem(key){
    localStorage.removeItem(key);
}