import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// 签名
import { ToolsProvider } from '../../providers/tools/tools';


import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Md5 } from 'ts-md5';
/**
 * Generated class for the AddadressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addadress',
  templateUrl: 'addadress.html',
})
export class AddadressPage {
  public addresslist = {
    myname: '',
    phone: '',
    address: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServiceProvider, public tools: ToolsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddadressPage');
  }
  addAddress() {
    let userinfo = this.tools.getUserinfo();
    console.log(userinfo);
    let json = {
      uid: userinfo._id,
      salt: userinfo.salt,
      name: this.addresslist.myname,
      phone: this.addresslist.phone,
      address: this.addresslist.address
    }

    let sign = this.tools.sign(json);
    console.log(sign);
    var api = '/api/addAddress';
    this.httpService.postdata(api, {
      uid: userinfo._id,
      sign: sign,
      name: this.addresslist.myname,
      phone: this.addresslist.phone,
      address: this.addresslist.address
    }, (data) => {
      console.log(data);
      var addAddress = JSON.parse(data['_body']);
      if (addAddress.success) {
        this.navCtrl.pop();
      }
    })

  }

  // 修改默认收货地址
  changeAddress() {
    
  }
}
