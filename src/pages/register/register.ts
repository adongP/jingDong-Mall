import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistersignPage } from '../registersign/registersign';

import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public RegistersignPage = RegistersignPage;
  public tel = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServiceProvider, public storage: StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  goRegistersignPage() {
    // this.navCtrl.push(RegistersignPage);
    // console.log(this.tel);
    var api = '/api/sendCode';
    // this.httpService.postdata(api, { 'tel': this.tel }, (data) => {
    //   console.log(data);

    //   if (/^[1][3,5,7,8]{1}\d{9}$/.test(this.tel)) {
    //     this.navCtrl.push(RegistersignPage, {
    //       tel: this.tel,
    //       code: JSON.parse(data['_body']).code
    //     });
    //   } else {
    //     alert('格式错误')
    //   }
    // })
    if (/^[1][3,5,7,8]{1}\d{9}$/.test(this.tel)) {
      this.httpService.postdata(api, { 'tel': this.tel }, (data) => {
        var mstatus = JSON.parse(data['_body']).success;
        console.log(mstatus);

        if (mstatus) {
          this.navCtrl.push(RegistersignPage, {
            tel: this.tel,
            code: JSON.parse(data['_body']).code
          });
        } else {
          alert(JSON.parse(data['_body']).message)
        }
      })
    } else {
      alert('格式错误')
    }


  }
}
