import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSubjPage } from './add-subj.page';

const routes: Routes = [
  {
    path: '',
    component: AddSubjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSubjPageRoutingModule {}
