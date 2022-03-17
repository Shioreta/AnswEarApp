import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewStudCompletedExamResultsPage } from './view-stud-completed-exam-results.page';

describe('ViewStudCompletedExamResultsPage', () => {
  let component: ViewStudCompletedExamResultsPage;
  let fixture: ComponentFixture<ViewStudCompletedExamResultsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudCompletedExamResultsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewStudCompletedExamResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
