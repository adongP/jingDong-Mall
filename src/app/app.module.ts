import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// 服务
import { HttpModule, JsonpModule } from '@angular/http'

// 支付页面
import { PeymentPage } from '../pages/peyment/peyment';
// 修改地址页面
import { EditaddressPage } from '../pages/editaddress/editaddress';
// 地址页面
import { AddadressPage } from '../pages/addadress/addadress';
import { AddressPage } from '../pages/address/address';
// 确认 订单页面
import { OrderPage } from '../pages/order/order';
import { PersonalPage } from '../pages/personal/personal';
import { ProductinfPage } from '../pages/productinf/productinf';
import { ProductlistPage } from '../pages/productlist/productlist';
import { SearchPage } from '../pages/search/search';
import { RegistersignPage } from '../pages/registersign/registersign';
import { RegsterpasswordPage } from '../pages/regsterpassword/regsterpassword'
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';

@NgModule({
  declarations: [
    MyApp,
    PeymentPage,
    EditaddressPage,
    AddadressPage,
    AddressPage,
    OrderPage,
    PersonalPage,
    ProductinfPage,
    ProductlistPage,
    SearchPage,
    RegistersignPage,
    RegsterpasswordPage,
    RegisterPage,
    LoginPage,
    CartPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      tabsHideOnSubPages: 'true',
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PeymentPage,
    EditaddressPage,
    AddadressPage,
    AddressPage,
    OrderPage,
    PersonalPage,
    ProductinfPage,
    ProductlistPage,
    SearchPage,
    RegistersignPage,
    RegsterpasswordPage,
    RegisterPage,
    LoginPage,
    CartPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    HttpServiceProvider,
    StorageProvider,
    ToolsProvider
  ]
})
export class AppModule { }
