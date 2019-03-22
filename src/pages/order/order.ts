import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';
import { ToolsProvider } from '../../providers/tools/tools';

import { LoginPage } from '../login/login';
import { AddressPage } from '../address/address';
import { PeymentPage } from '../peyment/peyment';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  public LoginPage = LoginPage;
  public AddressPage = AddressPage;
  public userinfo = '';
  public orderlist = []; //
  public totalPrice = 0;  //总价
  public reduce = 0; //满减
  public carry = 0; //运费
  public payable = 0; //应付款
  public leaveWord = ''; //留言

  public defaultAddress = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServiceProvider, public tools: ToolsProvider, public config: ConfigProvider, public storage: StorageProvider) {

    this.orderlist = this.storage.get('order_data');
    console.log(this.orderlist)
    this.productPrice();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');

  }
  ionViewWillEnter() {
    this.userinfo = this.tools.getUserinfo();
    console.log(this.userinfo);
    this.addressList();
  }
  productPrice() {
    var price = 0;
    if (this.orderlist && this.orderlist.length > 0) {
      for (let i = 0; i < this.orderlist.length; i++) {
        price += this.orderlist[i].product_price * this.orderlist[i].product_num
      }
    }
    this.totalPrice = price;

    if (this.totalPrice > 5000) {
      this.reduce = 5;
      this.carry = 0;

    } else {
      this.reduce = 0;
      this.carry = 12;
    }
    this.payable = this.totalPrice - this.reduce - this.carry;
  }

  // 获取默认地址
  addressList() {
    // var userinfo = this.tools.getUserinfo();

    let userinfo: any = this.userinfo;
    console.log(userinfo);
    var json = {
      uid: userinfo['_id'],
      salt: userinfo.salt
    }
    let sign = this.tools.sign(json);
    console.log(sign);
    var api = "/api/oneAddressList?uid=" + userinfo['_id'] + '&sign=' + sign;
    this.httpService.getjsonpdata(api, (data) => {
      console.log(data);
      if (data.success) {
        this.defaultAddress = data.result[0];
      } else {
        this.defaultAddress = '';
      }
    })
  }

  // 立即下单
  placeOrder() {
    if (!this.userinfo) {
      this.navCtrl.push('LoginPage', {
        history: 'order'
      })
    } else if (!this.defaultAddress) {
      alert('没有选择收货地址')
    } else {
      console.log(this.userinfo);
      console.log(this.orderlist)
      console.log(this.defaultAddress);
      let userinfo: any = this.userinfo;
      var address = this.defaultAddress['address'];
      var phone = this.defaultAddress['phone'];
      var name = this.defaultAddress['name'];
      var price = this.payable;
      var products = JSON.stringify(this.orderlist);
      var leave_word = this.leaveWord
      let json = {
        uid: userinfo['_id'],
        salt: userinfo.salt,
        address: address,
        phone: phone,
        name: name,
        all_price: price,
        // products: products,
        // leave_word: leave_word
      }
      let sign = this.tools.sign(json);
      console.log(sign);

      let api = '/api/doOrder';
      this.httpService.postdata(api, {
        uid: userinfo._id,
        salt: userinfo.salt,
        address: address,
        phone: phone,
        name: name,
        all_price: price,
        sign: sign,
        products: products,
        // leave_word: leave_word
      }, (data) => {
        let orderdata = JSON.parse(data['_body']);
        if (orderdata.success) {
          this.navCtrl.push(PeymentPage)
        } else {
          alert(orderdata.message)
        }
        console.log(data);
      })
    }
  }
}
