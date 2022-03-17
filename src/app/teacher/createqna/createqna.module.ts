import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateqnaPageRoutingModule } from './createqna-routing.module';

import { CreateqnaPage } from './createqna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateqnaPageRoutingModule
  ],
  declarations: [CreateqnaPage]
})
export class CreateqnaPageModule {}
