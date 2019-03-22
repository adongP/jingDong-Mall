import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddadressPage } from './addadress';

@NgModule({
  declarations: [
    AddadressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddadressPage),
  ],
})
export class AddadressPageModule {}
