import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// 签名
import { ToolsProvider } from '../../providers/tools/tools';

import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the EditaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editaddress',
  templateUrl: 'editaddress.html',
})
export class EditaddressPage {
  public editList = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public httphttpService: HttpServiceProvider,public tools: ToolsProvider) {
    console.log(this.navParams.get('item'))
    this.editList = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaddressPage');
  }

  // 确认修改
  confirmEdit() {
    var userinfo = this.tools.getUserinfo();
    var json = {
      uid: userinfo._id,
      salt: userinfo.salt,
      id: this.editList['_id'],
      name: this.editList['name'],
      phone: this.editList['phone'],
      address:this.editList['address']
    }

    var sign = this.tools.sign(json);
    
    var api = '/api/editAddress';
    this.httphttpService.postdata(api, {
      uid: userinfo._id,
      sign: sign,
      id: this.editList['_id'],
      name: this.editList['name'],
      phone: this.editList['phone'],
      address: this.editList['address']
    }, (data) => {
      console.log(data);
      var editdata= JSON.parse(data['_body'])
      if (editdata.success) {
        this.navCtrl.pop();
      } else {
        alert(editdata.message);
      }
    })
  }
}
