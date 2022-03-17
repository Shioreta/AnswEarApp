import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { QnaPage } from '../qna/qna.page';
import { QuestionPage } from '../question/question.page';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  eid;
  examName;
  subjDesc;
  questions;
  examType;
  examStatus;
  locked:boolean=false;
  unlocked:boolean=false;

  questionaire: boolean = false;
  public selectedSegment: string = 'examQuestions';

  examMembers;
  examResults;
  noExamResults
  totalItems;
  

  constructor(private _apiService: ApiService,private activatedRoute:ActivatedRoute,
              private modalCtrl: ModalController, public alertCtrl: AlertController,
              private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.eid = this.activatedRoute.snapshot.paramMap.get('eid');
    this.examName = this.activatedRoute.snapshot.paramMap.get('examName');
    this.subjDesc = this.activatedRoute.snapshot.paramMap.get('subjDesc');
    this.examType = this.activatedRoute.snapshot.paramMap.get('examType');
    this.examStatus = this.activatedRoute.snapshot.paramMap.get('status');
    // console.log(this.subjDesc);
    this.getQuestions();
    this.getExamResults();
    this.getExamineesNoResults();

    if(this.examStatus == 'Locked') {
      this.locked = true
    }else {
      this.unlocked = true;
    }
  }

  segmentChanged(ev: any) {
    this.selectedSegment=ev.target.value;
  }

  getQuestions() {
    this._apiService.getQuestionaire(this.eid).subscribe((res:any)=> {
      if(res.status == 'No QNA Available'){
        this.questionaire = false;
      }else{
        this.questions = res;
        this.questionaire = true;
      }
    });
  }

  async addQuestionForm() {
    const modal = await this.modalCtrl.create({
      component: QnaPage,
      componentProps: {
        'eid': this.eid,
        'subjDesc': this.subjDesc,
        'examType': this.examType
      }
    });
    await modal.present();
    await modal.onDidDismiss().then(() => {
      this.getQuestions();
    })
  }

  async displayQuestion(question) {
    // console.log(question)
    let data = { 
      eid: question.EID,
      qid: question.QID,
      answer: question.answer,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      question: question.question,
      subjDesc: question.subjDesc,
      examType: this.examType,
      examName: this.examName
    }
    // console.log(data)
    const modal = await this.modalCtrl.create({
      component: QuestionPage,
      componentProps: data
    });
    await modal.present();
    await modal.onDidDismiss().then(() => {
      this.getQuestions();
    })
  }

  async deleteQuestion(question) {
    console.log(question.QID);   

    const alert = await this.alertCtrl.create({
      header: 'Delete Question?',
      message: 'Press yes to delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            for (let i = 0; i < this.questions.length; i++) {
              if (this.questions[i] == question) {
                this.questions.splice(i, 1);
              }
            }
            
            let data = {
              qid: this.questions.QID,
              eid: this.questions.EID
            }
            let qidd = question.QID
            this._apiService.deleteQuestion(qidd).subscribe((res:any)=>{              
              this.presentToastDel();
            })
          }
        }
      ]
    });
    await alert.present();

  }

  async presentToastDel() {
    const toast = await this.toastCtrl.create({
      message: 'Question successfully deleted!',
      duration: 3000
    });
    toast.present();
  }

  async lockedExam() {
    const alert = await this.alertCtrl.create({
      header: 'Lock Exam?',
      message: 'NOTE: Once you locked the exam, you cannot add/edit/delete the question!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            // console.log('Confirm Okay');
            let data = {
              status: 'Locked'
            }
            this._apiService.lockExam(this.eid, data).subscribe((res:any)=>{
              // this.modalCtrl.dismiss();
              this.router.navigateByUrl('/subject/'+this.subjDesc);
              this.presentToast();
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async showLockExamMeaning() {
    const alert = await this.alertCtrl.create({
      header: 'Exam is Locked!',
      message: 'You cannot Add/Edit/Delete the questions!',
      buttons: [
        {
          text: 'Okay',
          role: 'okay',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Exam Successfully locked! <br>Please pull your screen down to refresh!',
      duration: 8000
    });
    toast.present();
  }

  // getExamMembers() {
  //   this._apiService.getSubjMembers(this.subjDesc).subscribe((res:any) => {
  //     this.examMembers = res;
  //     console.log(this.examMembers)
  //   })
  // }

  getExamResults() {
    this._apiService.getExamResults(this.subjDesc,this.eid).subscribe((res: any) => {
      this.examResults = res;
    })
  }

  getExamineesNoResults() {
    this._apiService.getNoResultsExaminees(this.subjDesc,this.eid).subscribe((res:any) => {
      this.noExamResults =res;
    })
  }
}
