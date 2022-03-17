import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExaminationPage } from './examination.page';

const routes: Routes = [
  {
    path: '',
    component: ExaminationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationPageRoutingModule {}
