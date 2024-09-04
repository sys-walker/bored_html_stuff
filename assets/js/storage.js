function storage_setItem(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify({
      value: value,
    })
  );
}
function storage_getItem(key) {
  let jsonValue = localStorage.getItem(key);

  return jsonValue ? JSON.parse(jsonValue).value : undefined;
}
function storage_removeItem(key) {
  localStorage.removeItem(key);
}
