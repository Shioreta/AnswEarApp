import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSubjPageRoutingModule } from './add-subj-routing.module';

import { AddSubjPage } from './add-subj.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSubjPageRoutingModule
  ],
  declarations: [AddSubjPage]
})
export class AddSubjPageModule {}
