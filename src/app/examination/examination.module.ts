import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExaminationPageRoutingModule } from './examination-routing.module';

import { ExaminationPage } from './examination.page';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExaminationPageRoutingModule,
    SwiperModule,
    HttpClientModule

  ],
  declarations: [ExaminationPage]
})
export class ExaminationPageModule {}
