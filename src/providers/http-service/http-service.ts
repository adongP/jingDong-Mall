import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Jsonp,Headers } from '@angular/http';

import { ConfigProvider } from '../config/config';
/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(public http: Http, public jsonp: Jsonp, public config: ConfigProvider) {
    console.log('Hello HttpServiceProvider Provider');
  }
  getjsonpdata(apiurl, callback) {
    if (apiurl.indexOf('?') == -1) {
      var api = this.config.apiUrl + apiurl + '?callback=JSONP_CALLBACK';
    } else {
      // tslint:disable-next-line:no-duplicate-variable
      var api = this.config.apiUrl + apiurl + '&callback=JSONP_CALLBACK';
    }

    this.jsonp.get(api).subscribe((data) => {

      //  var  mdata = JSON.parse(data['_body']);
      //   console.log(mdata);
      callback(data['_body']);
    }, (err) => {
      // console.log(err);
    })

  }

// post 请求
  postdata(apiurl, json, callback) {
    var api = this.config.apiUrl + apiurl;
    this.http.post(api, JSON.stringify(json), { headers: this.headers }).subscribe((data) => {
      // console.log(data);
      callback(data);
    })
  }

}
