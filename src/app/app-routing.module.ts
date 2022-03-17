import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'createqna',
    loadChildren: () => import('./teacher/createqna/createqna.module').then( m => m.CreateqnaPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('./subjects/subjects.module').then( m => m.SubjectsPageModule)
  },
  {
    path: 'subject/:subjDesc',
    loadChildren: () => import('./subject/subject.module').then( m => m.SubjectPageModule)
  },
  {
    path: 'addsubjectmember',
    loadChildren: () => import('./addsubjectmember/addsubjectmember.module').then( m => m.AddsubjectmemberPageModule)
  },
  {
    path: 'create-exam',
    loadChildren: () => import('./create-exam/create-exam.module').then( m => m.CreateExamPageModule)
  },  
  {
    path: 'qna',
    loadChildren: () => import('./qna/qna.module').then( m => m.QnaPageModule)
  },
  {
    path: 'attempts/:examName/:endDate/:eid/:examType',
    loadChildren: () => import('./attempts/attempts.module').then( m => m.AttemptsPageModule)
  },
  {
    path: 'examination/:eid/:examType',
    loadChildren: () => import('./examination/examination.module').then( m => m.ExaminationPageModule)
  },
  {
    path: 'exam-results',
    loadChildren: () => import('./exam-results/exam-results.module').then( m => m.ExamResultsPageModule)
  },
  {
    path: 'questions/:eid/:examName/:subjDesc/:examType/:status',
    loadChildren: () => import('./questions/questions.module').then( m => m.QuestionsPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'todos',
    loadChildren: () => import('./todos/todos.module').then( m => m.TodosPageModule)
  },
  {
    path: 'add-subj',
    loadChildren: () => import('./add-subj/add-subj.module').then( m => m.AddSubjPageModule)
  },
  {
    path: 'view-stud-completed-exam-results/:eid/:examName/:subjDesc/:examType/:status',
    loadChildren: () => import('./view-stud-completed-exam-results/view-stud-completed-exam-results.module').then( m => m.ViewStudCompletedExamResultsPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'account-list',
    loadChildren: () => import('./account-list/account-list.module').then( m => m.AccountListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
