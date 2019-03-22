import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AddadressPage } from '../addadress/addadress';
import { EditaddressPage } from '../editaddress/editaddress';

// 签名
import { ToolsProvider } from '../../providers/tools/tools';


import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  public AddadressPage = AddadressPage;
  public checked = true;
  public addresslist = [];
  userinfo: any;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public httphttpService: HttpServiceProvider, public tools: ToolsProvider) {
    // this.tools.sign();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
    // this.getAddressList();
  }
  ionViewDidEnter() {
    this.getAddressList();
  }

  // 获取地址列表
  getAddressList() {

    // this.http.postdata(api,{})
    //获取需要签名的数据
    var userinfo = this.tools.getUserinfo();

    // 根据uid去数据库查询当前的salt
    let json = {
      uid: userinfo._id,  //用户id
      salt: userinfo.salt
    }
    // 签名
    let sign = this.tools.sign(json);
    console.log(sign);
    var apiurl = "/api/addressList?uid=" + userinfo._id + '&sign=' + sign;
    this.httphttpService.getjsonpdata(apiurl, (data) => {
      console.log(data);
      if (data.success) {
        this.addresslist = data.result
      } else {
        alert('非法请求')
      }

    })

  }

  // 修改默认地址
  changeAddress(id) {
    console.log(id);
    var userinfo = this.tools.getUserinfo();
    console.log(userinfo)
    var json = {
      uid: userinfo['_id'],
      salt: userinfo['salt'],
      id: id
    }

    var sign = this.tools.sign(json);

    var api = '/api/changeDefaultAddress';
    this.httphttpService.postdata(api, {
      uid: userinfo['_id'],
      sign: sign,
      id: id
    }, (data) => {
      var jsondata = JSON.parse(data['_body'])
      console.log(JSON.parse(data['_body']));
      if (jsondata.success) {
        this.navCtrl.pop();
      } else {
        alert(jsondata.message);
      }
    })
  }

  // 修改收货地址
  editAddress(item) {
    this.navCtrl.push(EditaddressPage, {
      item: item
    })
  }

  // 删除地址
  delAddress(key, id) {
    console.log(key, id);
    var userinfo = this.tools.getUserinfo();
    var json = {
      uid: userinfo._id,
      salt: userinfo.salt,
      id: id
    }
    var sign = this.tools.sign(json);

    var api = '/api/deleteAddress';
    this.httphttpService.postdata(api, {
      uid: userinfo._id,
      sign: sign,
      id: id
    }, (data) => {
      console.log(data);
      var deladdress = JSON.parse(data['_body']);
      if (deladdress.success) {

        const prompt = this.alertCtrl.create({
          title: '确认删除',
          message: "确认点击是，否则点击否",
          buttons: [
            {
              text: '否',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: '是',
              handler: data => {
                this.addresslist.splice(key, 1);
                console.log(this.userinfo);
              }
            }
          ]
        });
        prompt.present();


      } else {
        alert(deladdress.message);
      }
    })
  }
}
