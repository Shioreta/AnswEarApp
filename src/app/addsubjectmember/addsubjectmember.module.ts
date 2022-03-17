import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsubjectmemberPageRoutingModule } from './addsubjectmember-routing.module';

import { AddsubjectmemberPage } from './addsubjectmember.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsubjectmemberPageRoutingModule
  ],
  declarations: [AddsubjectmemberPage]
})
export class AddsubjectmemberPageModule {}
