import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewStudCompletedExamResultsPageRoutingModule } from './view-stud-completed-exam-results-routing.module';

import { ViewStudCompletedExamResultsPage } from './view-stud-completed-exam-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewStudCompletedExamResultsPageRoutingModule
  ],
  declarations: [ViewStudCompletedExamResultsPage]
})
export class ViewStudCompletedExamResultsPageModule {}
