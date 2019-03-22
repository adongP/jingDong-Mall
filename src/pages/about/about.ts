import { Component } from '@angular/core';
import { NavController, Item } from 'ionic-angular';
// 商品列表页面
import { ProductlistPage } from '../productlist/productlist';
// 服务
import { Http, Jsonp } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config'
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public ProductlistPage = ProductlistPage;
  public leftList = [];
  public rightList = [];
  // public flag = false;
  constructor(public navCtrl: NavController, public config: ConfigProvider, public http: Http, public jsonp: Jsonp, public httpService: HttpServiceProvider) {
    this.getleft(this.leftList);

  }
  getleft(item: any) {
    this.httpService.getjsonpdata('/api/pcate', (data) => {
      console.log(data);
      this.leftList = data.result;
      // this.leftList['flag'] = false;
      // for (var i = 0; i < this.leftList.length; i++) {
      //   if (item.index == i) {
      //     this.leftList[i].flag = true;
      //   }

      // }

      this.getright(this.leftList[0]['_id']);
    })
  }
  getright(pid) {
    var apiUrl = '/api/pcate?pid=' + pid;
    this.httpService.getjsonpdata(apiUrl, (data) => {
      console.log(data);
      this.rightList = data.result;

    })
  }
}
