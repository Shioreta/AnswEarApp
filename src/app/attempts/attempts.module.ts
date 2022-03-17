import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttemptsPageRoutingModule } from './attempts-routing.module';

import { AttemptsPage } from './attempts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttemptsPageRoutingModule
  ],
  declarations: [AttemptsPage]
})
export class AttemptsPageModule {}
