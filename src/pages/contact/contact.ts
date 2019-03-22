import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register';

import { PersonalPage } from '../personal/personal';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public PersonalPage = PersonalPage;
  public LoginPage = LoginPage;
  public RegisterPage = RegisterPage;
  public isLogin = true;
  public userinfo=''
  constructor(public navCtrl: NavController, public storage: StorageProvider) {

  }
  ionViewDidLoad() {
  
  }
  ionViewWillEnter() {
    var userinfo = this.storage.get('userinfo');
    if (userinfo && userinfo.username) {
      this.isLogin = false;
      this.userinfo = userinfo;
    } else {
      this.isLogin = true;
      this.userinfo=''
    }
  }
}
