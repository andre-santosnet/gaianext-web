import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }


  set(key, value) {
    window.localStorage[key] = value;
    return this;
  }
  get(key, defaultValue = null) {
    return window.localStorage[key] || defaultValue;
  }
  setObject(key, value: object) {
    window.localStorage[key] = JSON.stringify(value);
    return this;
  }
  getObject(key) {
    return window.localStorage[key] ? JSON.parse(window.localStorage[key]) : null;
  }

  remove(key) {
    window.localStorage.removeItem(key)
    return this;
  }

  clear() {
    window.localStorage.clear();
    return this;
  }


}
