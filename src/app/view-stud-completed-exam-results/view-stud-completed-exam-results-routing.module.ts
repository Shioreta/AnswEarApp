import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewStudCompletedExamResultsPage } from './view-stud-completed-exam-results.page';

const routes: Routes = [
  {
    path: '',
    component: ViewStudCompletedExamResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewStudCompletedExamResultsPageRoutingModule {}
