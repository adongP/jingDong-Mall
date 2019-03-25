import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the RegsterpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regsterpassword',
  templateUrl: 'regsterpassword.html',
})
export class RegsterpasswordPage {
  public password = '';
  public repassword = ''
  public tel = '';
  public code = ''
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServiceProvider, public storage: StorageProvider) {
    this.tel = this.storage.get('tel');
    this.code = this.storage.get('code');
    console.log(this.tel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegsterpasswordPage');
  }
  gologin() {
    // this.navCtrl.push(LoginPage);
    // console.log(this.password);
    if (this.password != this.repassword) {
      alert('确认密码和密码不一样')
    } else if (this.password.length < 6) {
      alert('密码长度不能小于6位');
    } else {
      // this.storage.set('')'code':this.code,
      var api = "/api/register";
      this.httpService.postdata(api, {
        "tel": this.tel,
        "code": this.code,
        'password': this.password
      }, (data) => {
        console.log(data);
        if (JSON.parse(data['_body']).success = true) {
          this.storage.set('username', JSON.parse(data['_body']).userinfo[0])
          // this.navCtrl.push(LoginPage);
          this.navCtrl.popToRoot();

        }
      })

    }

  }

}
