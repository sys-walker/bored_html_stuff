export class Storage {
  static  setItem(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value: value,
      })
    );
    return value;
  }
  static  getItem(key) {
    let jsonValue = localStorage.getItem(key);

    return jsonValue ? JSON.parse(jsonValue).value : undefined;
  }
  static  removeItem(key) {
    localStorage.removeItem(key);
  }
}
