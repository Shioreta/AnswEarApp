import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QnaPageRoutingModule } from './qna-routing.module';

import { QnaPage } from './qna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QnaPageRoutingModule
  ],
  declarations: [QnaPage]
})
export class QnaPageModule {}
