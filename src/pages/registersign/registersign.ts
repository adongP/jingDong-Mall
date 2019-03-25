import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegsterpasswordPage } from '../regsterpassword/regsterpassword'

import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the RegistersignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registersign',
  templateUrl: 'registersign.html',
})
export class RegistersignPage {
  public RegsterpasswordPage = RegsterpasswordPage;
  public tel = '';
  public code = '';
  public num = 60;  //倒计时
  public flag = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServiceProvider, public storage: StorageProvider) {
    // console.log(this.navParams);
    this.tel = this.navParams.data.tel;
    console.log(this.tel);
    // var code = this.navParams.data.code;
    this.code = this.navParams.data.code; //没有短信接口，验证码直接填入
    console.log(this.code);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersignPage');
    this.cutdow();
  }


  // 倒计时
  cutdow() {
    var timer = setInterval(() => {
      this.num--;
      // console.log(this.num);
      if (this.num == 0) {
        this.num = 0;
        clearInterval(timer);
        this.flag = false;
      }
    }, 1000)
  }

  // 验证码验证接口
  goregsterpasswordPage() {
    // this.navCtrl.push(RegsterpasswordPage);
    // console.log(this.code);
    // if (this.code == this.navParams.data.code) {
    //   this.navCtrl.push(RegsterpasswordPage);
    // } else {
    //   alert('输入错误')
    // }
    this.flag = false;
    var api = '/api/validateCode';
    this.httpService.postdata(api, { 'tel': this.tel, 'code': this.code }, (data) => {
      console.log(data);
      if (JSON.parse(data['_body']).success) {
        // 验证成功，保存手机号
        this.storage.set('tel', this.tel);
        this.storage.set('code', this.code);
        this.navCtrl.push(RegsterpasswordPage);
      } else {
        alert('验证错误')
      }
    })

  }
  // 发送验证码
  sendcode() {


    var api = "/api/sendCode";
    this.httpService.postdata(api, { 'tel': this.tel }, (data) => {
      var Scode = JSON.parse(data['_body'])
      console.log(data);
      if (Scode.seccess) {
        this.flag = true;
        this.num = 60;
        this.cutdow();
      }
    })
  }
}
