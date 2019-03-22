import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Content } from 'ionic-angular';
// 服务
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service'
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild(Content) content: Content;
  public flag = true;
  public hasdata = true;
  public keywords = '';
  public list = [];
  public num = 1;
  // 历史记录
  public historylist = <any>[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public config: ConfigProvider, public httpService: HttpServiceProvider, public alertCtrl: AlertController) {
    this.getHistory();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');

  }
  getSearchlist(infiniteScroll) {
    // console.log(this.keywords);

    if (!infiniteScroll) {
      this.num = 1;
      this.hasdata = true;
      this.content.scrollToTop(0);
      this.saveHistory();//调用保存历史记录

    }
    var url = "/api/plist?search=" + this.keywords + "&page" + this.num;

    this.httpService.getjsonpdata(url, (data) => {
      // console.log(data);
      // this.list = this.list.concat(data.result);
      if (this.num == 1) {
        this.list = data.result;

      } else {
        this.list = this.list.concat(data.result);
      }
      this.flag = false;  /*显示商品列表*/
      // 显示高亮
      for (var i = 0; i < this.list.length; i++) {
        // console.log(this.list[i].title)
        var text = this.list[i].title.split(this.keywords);
        // console.log(text);
        var textj = text.join('<span class="red">' + this.keywords + '</span>');
        // console.log(textj)
        this.list[i].title = textj;
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
        if (data.result.length < 10) {
          //   infiniteScroll.enable(false);
          this.hasdata = false;
        }
      }
      this.num++;
    })

  }
  // 加载更多
  doInfinite(infiniteScroll) {
    this.getSearchlist(infiniteScroll);
  }
  // 保存历史记录
  saveHistory() {
    var history = String(this.storage.get('historyData'));
    if (history) { //有数据
      // this.storage.set(this.keywords, this.historylist);
      if (history.indexOf(this.keywords) == -1) { //历史记录没有这个数据
        this.historylist.push(this.keywords);
        // 重新写入
        this.storage.set('historyData', this.historylist);
      } else {
        this.historylist = this.historylist;
      }
    } else { //没有数据
      this.historylist.push(this.keywords);
      // 写入localstorge
      this.storage.set('historyData', this.historylist);
    }

  }
  // 获取历史记录
  getHistory() {
    var history = this.storage.get('historyData');
    if (history) {
      this.historylist = history;
    }

  }

  // 点击历史记录=》搜索页面
  goSearch(item) {
    this.keywords = item;
    console.log(this.keywords);
    this.getSearchlist('');
  }
  // 长按历史记录=》删除
  removeitem(key) {

    // console.log(key)
    const confirm = this.alertCtrl.create({
      title: '确认删除',
      message: '删除点击是，不删除点击否',
      buttons: [
        {
          text: '否',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            this.historylist.splice(key, 1)
          }
        }
      ]
    });
    confirm.present();
  }
}

