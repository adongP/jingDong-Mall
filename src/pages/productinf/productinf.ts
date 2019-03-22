import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';

import { CartPage } from '../cart/cart';
/**
 * Generated class for the ProductinfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productinf',
  templateUrl: 'productinf.html',
})
export class ProductinfPage {
  public CartPage = CartPage;
  @ViewChild('myattr') myattr: ElementRef;
  public tab = 'product';
  public productlist = [];

  public num = 1; //加减产品数量
  public cartnum = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServiceProvider, public storage: StorageProvider) {
    this.productInf(this.navParams.data.id);
    console.log(this.navParams)

    this.cartnum = this.getCartsNum();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductinfPage');
  }

  productInf(id) {
    var apiUrl = '/api/pcontent?id=' + id;
    this.httpService.getjsonpdata(apiUrl, (data) => {

      this.productlist = data.result;
      // console.log(this.productlist)
    })
  }
  // 点击加入购物车
  addCart() {
    // 获取当前产品的数据
    var ptitle = this.productlist['title'];
    var pprice = this.productlist['price'];
    var pic = this.productlist['pic'];
    var pid = this.productlist['_id'];
    var pnum = this.num;
    var pattr = '';
    // 获取当前商品的属性
    var dom = this.myattr.nativeElement;
    var active = dom.getElementsByClassName('active');
    // console.log(active);
    for (var i = 0; i < active.length; i++) {
      pattr += active[i].innerHTML;
    }
    // console.log(pattr);

    // console.log(this.productlist);
    var json = {
      product_id: pid,
      product_price: pprice,
      product_title: ptitle,
      product_pic: pic,
      product_num: pnum,
      product_attr: pattr,
      checked:true
    }
    // console.log(json);

    // 加入购物车保存到localstorage，如果存在当前数量加一，如果不存在加入
    var storageData = this.storage.get('cart_data');
    if (storageData) { //有数据
      if (this.hasdata(storageData, json.product_id)) {
        // tslint:disable-next-line:no-duplicate-variable
        for (var i = 0; i < storageData.length; i++) {
          if (storageData[i].product_id == pid) {
            // storageData[i].product_num += this.num;
            storageData[i].product_num += json.product_num;
          }

        }

      } else {
        storageData.push(json);
      }

      this.storage.set('cart_data', storageData);

      // this.cartnum += this.num;
      this.cartnum += json.product_num;
    } else { //没有数据
      var tempArr = [];
      tempArr.push(json);
      this.storage.set('cart_data', tempArr);
    }
    // this.cartnum += this.num;
    // this.storage.set('cart_data', storageData);
  }


  // 数量减
  recnum() {

    if (this.num <= 1) {
      this.num = 1;
    } else {
      this.num--;
    }
  }

  // 数量增加
  addnum() {
    this.num++;
  }
  // 属性选择
  chooseAttr() {
    // var dom = document.getElementsByClassName('attr')[0];
    var dom = this.myattr.nativeElement;
    console.log(dom);
    // var attr = dom.querySelectorAll('div');
    // console.log(attr);
    dom.onclick = function (e) {
      // console.log(e.target.nodeName);
      if (e.target.nodeName == "SPAN") {
        var parent = e.target.parentNode;
        var children = parent.children;
        for (var i = 0; i < children.length; i++) {
          children[i].className = '';
        }
        e.target.className = 'active'
      }
    }
  }

  // 判断购物车里面有没有数据
  hasdata(storageData, product_id) {
    if (storageData) {
      for (var i = 0; i < storageData.length; i++) {
        if (storageData[i].product_id == product_id) {
          return true
        }
      }
    }
    return false;
  }
  // 获取购物车数量
  getCartsNum() {
    var cartnum = 0;
    var storageData = this.storage.get('cart_data');
    if (storageData) { //有数据
      // tslint:disable-next-line:no-duplicate-variable
      for (var i = 0; i < storageData.length; i++) {
        cartnum += storageData[i].product_num
      }
    }
    return cartnum;
  }

}
