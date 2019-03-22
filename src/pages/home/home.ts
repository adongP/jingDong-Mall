import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// 服务
import { Http, Jsonp } from '@angular/http';
import { ConfigProvider} from '../../providers/config/config'
import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { SearchPage } from '../search/search';
import { ProductinfPage } from '../productinf/productinf';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public ProductinfPage = ProductinfPage;
  public foucsList = [];
  public recList = [];
  public listW = '';;
  public lickList = [];
  constructor(public navCtrl: NavController, public config: ConfigProvider, public http: Http, public jsonp: Jsonp, public httpService: HttpServiceProvider) {
    // var url = config.apiUrl + "/api/focus";
    // this.http.get(url).subscribe((data) => {
    //   // console.log(JSON.parse(data['_body']));
    //   this.recList = JSON.parse(data['_body']).result;
    // })

    this.getFocus();
    this.getBestP();
    this.getlikeP();
  }
  getItems() {
    this.navCtrl.push(SearchPage);
    // console.log(this.config.apiUrl)
  }
  // 轮播
  getFocus() {
    this.httpService.getjsonpdata("/api/focus",(data) => {
      console.log(data)
      this.foucsList =data.result;
    })
  }
  // 精品推荐
  getBestP() {
    this.httpService.getjsonpdata("/api/plist?is_best=1", (data) => {
      console.log(data)
      this.recList = data.result;
      this.listW = this.recList.length * 90 + 'px';
    })
  }
  // 猜你喜欢
  getlikeP() {
    this.httpService.getjsonpdata("/api/plist?is_hot=1", (data) => {
      console.log(data)
      this.lickList = data.result;
    })
  }

}
