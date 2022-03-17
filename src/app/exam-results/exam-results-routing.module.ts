import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamResultsPage } from './exam-results.page';

const routes: Routes = [
  {
    path: '',
    component: ExamResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamResultsPageRoutingModule {}
