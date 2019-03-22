import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { StorageProvider } from '../../providers/storage/storage';

import { Md5 } from 'ts-md5/dist/md5';
/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(public http: Http, public storage: StorageProvider) {
    console.log('Hello ToolsProvider Provider');
  
  }

  // 用户 信息
  getUserinfo() {
    var userinfo = this.storage.get("userinfo");
    if (userinfo) {
      return userinfo;
    } else {
      return '';
    }
   
  }

  sign(json) {

    var tempArr = [];
    for (var attr in json) {
      tempArr.push(attr)
    }
   
    // 排序
    tempArr = tempArr.sort();
    console.log(tempArr);
    // 
    var tempStr = '';
    for (var i = 0; i < tempArr.length; i++){
      tempStr += tempArr[i] + json[tempArr[i]]
    }
    console.log(tempStr);
    console.log(Md5.hashStr(tempStr));

    return Md5.hashStr(tempStr);
  }

}
