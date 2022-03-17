import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectPage } from './subject.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectPageRoutingModule {}
