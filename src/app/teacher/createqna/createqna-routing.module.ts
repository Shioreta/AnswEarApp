import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateqnaPage } from './createqna.page';

const routes: Routes = [
  {
    path: '',
    component: CreateqnaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateqnaPageRoutingModule {}
