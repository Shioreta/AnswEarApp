import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AddsubjectmemberPage } from '../addsubjectmember/addsubjectmember.page';
import { ApiService } from '../api.service';
import { CreateExamPage } from '../create-exam/create-exam.page';
import { ExamResultsPage } from '../exam-results/exam-results.page';
import { QnaPage } from '../qna/qna.page';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
  
  userData;
  uName;
  upcomingExams;
  completedExams;
  subjDesc: String;
  userlvl: String;
  examName: String;
  examType: String;
  fabButton;
  subjMembers;

  examResults;

  student;
  teacher;

  exams: boolean = false;
  hasupcomingExam: boolean = false;
  hascompletedExam: boolean = false;
  hasTakenExams: boolean = false;

  takenExams;



  public selectedSegment: string = 'upcoming';
  constructor(private storage: Storage,
              private _apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              private modalCtrl: ModalController,
              private router: Router,
              private alertCtrl: AlertController) { }
  
  ngOnInit() {
    this.getExams();
    this.getSubjMembers();
    this.cleanExams();
  }
  cleanExams(){
    this._apiService.cleanExams().subscribe((res:any)=>{})
  }

  getExams() {
    this.subjDesc = this.activatedRoute.snapshot.paramMap.get('subjDesc');
    this.storage.get('userData').then((res)=> {
      this.userData = res;
      this.uName = this.userData.username;
      this.userlvl = this.userData.usertype;
      // console.log(this.userlvl);
      if(this.userlvl == 'teacher'){
        this.fabButton = true;
        this.teacher = true;
        this._apiService.getUpcomingExams(this.uName,this.subjDesc).subscribe((res:any)=> {
          // this.upcomingExams = res;
          // console.log(this.upcomingExams);

          if(res.status == 'No Upcoming Exams!'){
            this.hasupcomingExam = false;
          }else{
            this.upcomingExams = res;
            this.hasupcomingExam = true;
          }
          // console.log(this.hasupcomingExam);
        })
  
        this._apiService.getCompletedExams(this.uName,this.subjDesc).subscribe((res:any)=> {
          
          if(res.status == 'No Completed Exams!'){
            this.hascompletedExam = false;
          }else{
            this.completedExams = res;
            this.hascompletedExam = true;
          }
        })
      }else{
        this.fabButton = false;
        this.student = true;

        this._apiService.getUpcomingExamsStudent(this.uName,this.subjDesc).subscribe((res:any) => {
          if(res.status == 'No Upcoming Exams'){
            this.exams = false;
            // console.log(res.status);
            this.hasupcomingExam = false;

          }else{
            this.upcomingExams = res;
            this.exams = true;
            this.hasupcomingExam = true;
          }
          // console.log(this.exams);
        })

        this._apiService.getCompletedExamsStudent(this.uName,this.subjDesc).subscribe((res:any)=> {
          if(res.status == 'No Completed Exams!'){
            this.hascompletedExam = false;
          }else{
            this.completedExams = res;
            this.hascompletedExam = true;
          }
        })

        this._apiService.getTakenExam(this.uName, this.subjDesc).subscribe((res:any)=>{
          if(res.status == 'No Taken Exams!'){
            this.hasTakenExams = false;
          }else{
            this.takenExams = res;
            this.hasTakenExams = true;
          }
        })
      }
      
    })
  }

  segmentChanged(ev: any) {
    this.selectedSegment=ev.target.value;
  }

  getSubjMembers() {
    this._apiService.getSubjMembers(this.subjDesc).subscribe((res: any)=> {
      this.subjMembers = res;
    })
  }


  async addMember() {
    let data = {
      username: this.uName,
      subjectDesc: this.subjDesc
    }
    // console.log(data);
    const modal = await this.modalCtrl.create({
      component: AddsubjectmemberPage,
      componentProps: data
    });
    await modal.present();

    await modal.onDidDismiss().then(()=>{
      this.getSubjMembers();
    })
  }

  async createExam() {

    let data = {
      username: this.uName,
      subjectDesc: this.subjDesc
    }

    // console.log(data)
    const modal = await this.modalCtrl.create({
      component: CreateExamPage,
      componentProps: data
    });
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      this.getExams();
      // console.log('refresh list');
    })
  }


  displayExamQuestions(completedExam) {
    // console.log(completedExam);
    this.router.navigateByUrl('/questions/'+completedExam.eid+'/'+completedExam.examName+'/'+this.subjDesc+'/'+completedExam.examtype+'/'+completedExam.status)
  }

  // for Student
  displayStudentView(upcomingexam) {
    // console.log(upcomingexam)
    if(upcomingexam.status == 'Unlocked'){
      this.examIsNotYetAvailable();
    }else {
      this.router.navigateByUrl('/attempts/'+upcomingexam.examName+'/'+upcomingexam.endDate+'/'+upcomingexam.eid+'/'+upcomingexam.examType);
    }
  }

  async displayStudCompletedExamDeteils(completedexam) {
    // console.log(completedexam);
    this.router.navigateByUrl('/view-stud-completed-exam-results/'+completedexam.eid+'/'+completedexam.examName+'/'+this.subjDesc+'/'+completedexam.examtype+'/'+completedexam.status)
  }


  doRefresh(event) {
    setTimeout(() => {
      // console.log('Async operation has ended');
      this.getExams();
      event.target.complete();
    }, 2000);
  }

  async examIsNotYetAvailable() {
    const alert = await this.alertCtrl.create({
      header: 'NOTE',
      message: 'Exam is not yet available for taking!',
      buttons: ['OK']
    });

    await alert.present();

    await alert.onDidDismiss().then(()=> {
      this.getExams();
    });
    // console.log('onDidDismiss resolved with role', role);
  }

  
}
