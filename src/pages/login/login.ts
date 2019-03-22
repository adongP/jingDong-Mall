import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';

import { RegisterPage } from '../register/register'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public RegisterPage = RegisterPage;
  public history = '';
  public userinfo = {
    username: '',
    password: ''

  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServiceProvider, public storage: StorageProvider) {
    this.history = this.navParams.get('history');
    console.log(this.history);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  tologin() {
    console.log(this.userinfo.username, this.userinfo.password);

    var api = '/api/doLogin';
    this.httpService.postdata(api, this.userinfo, (data) => {
      console.log(data);
      var muserinf = JSON.parse(data['_body']);
      if (muserinf.success) {
        this.storage.set('userinfo', muserinf.userinfo[0]);
        if (this.history=="order") {
          this.navCtrl.pop();
        } else {
          this.navCtrl.popToRoot();
        }


      }
    })
  }
}
