import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductinfPage } from '../productinf/productinf';

import { Http, Jsonp } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service'
/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  public ProductinfPage = ProductinfPage;
  public list = [];
  public cid;
  public num = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServiceProvider) {
  
    this.cid = this.navParams.get('cid');
    this.getProductlist('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }

  getProductlist(infiniteScroll) {
    var apiurl = '/api/plist?cid=' + this.cid + '&page=' + this.num;
    this.httpService.getjsonpdata(apiurl, (data) => {
      console.log(data);
      // this.list = data.result;
      this.list= this.list.concat(data.result);
      if (infiniteScroll) {
        // 数据完成
        infiniteScroll.complete();
        if (data.result < 10) { //没有数据
          infiniteScroll.enable(false);
        }
      }
      this.num++;
    })
  }
// 加载更多
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.getProductlist(infiniteScroll);
  }
}
