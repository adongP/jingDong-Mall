import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: Http) {
    console.log('Hello StorageProvider Provider');
  }
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key) {
   return JSON.parse(localStorage.getItem(key));
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}
