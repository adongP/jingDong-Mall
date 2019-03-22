import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';

import { OrderPage } from '../order/order';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public list = [];
  public show = false;
  public isAllChecked = true;
  public allPrice = 0;
  public isEdit = false;
  public hasData = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public storage: StorageProvider) {
    var cartData = this.storage.get('cart_data');
    if (cartData && cartData.length>0) {
      this.list = cartData;
      this.hasData = true;
    } else {
      this.list = [];
      this.hasData = false;
    }
    this.totalPrice();
    console.log(this.list);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    // this.hasData = true;
    // this.totalPrice();
  }

  // 减
  recnum(item) {
    if (item.product_num > 1) {
      item.product_num--;
    }
    this.totalPrice();
  }
  // 加
  addnum(item) {
    item.product_num++;
    this.totalPrice();
  }

  // 商品选择
  toggleChecked() {
    console.log(this.list)
    if (this.checkedNum() == this.list.length) {
      this.isAllChecked = true;
    } else {
      this.isAllChecked = false;
    }
    this.totalPrice();
  }

  // 选择产品的数量
  checkedNum() {
    let sum = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked == true) {
        sum++;
      }
    }
    return sum;

  }

  // 是否全选
  allchecked() {
    if (this.isAllChecked) {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].checked = false
      }
      this.isAllChecked = false;
    } else {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].checked = true
      }
      this.isAllChecked = true;
    }
  }

  // 总价
  totalPrice() {
    var ampallPrice = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked == true) {
        ampallPrice += this.list[i].product_price * this.list[i].product_num;
      }

    }
    this.allPrice = ampallPrice;
  }

  // 结算

  pay() {
    var temppay = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked == true) {
        temppay.push(this.list[i]);
      }
      
    }

    if (temppay.length > 0) {
      this.storage.set("order_data", temppay);
      this.navCtrl.push(OrderPage)
    } else {
      alert('还没有选择数据')
    }
  }

  // 删除操作
  edit() {
    this.isEdit = !this.isEdit;

  }
  del() {
    var Editlist = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked == false) {
        Editlist.push(this.list[i]);
      }

    }
    this.list = Editlist;
    // console.log(Editlist);
    // console.log(this.list);
    this.list.length > 0 ? this.hasData = true : this.hasData = false;
    this.storage.set('cart_data', this.list)
  }
  ionViewWillEnter() {
    var storagelist = this.storage.get('cart_data');
    if (storagelist) {
      if (this.checkedNum() == storagelist.length) {
        this.isAllChecked = true;
      } else {
        this.isAllChecked = false;
      }
    }
  }
  ionViewWillLeave() {
    this.storage.set('cart_data', this.list)
  }
}
