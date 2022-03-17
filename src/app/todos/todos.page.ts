import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  userData;
  uName;
  userlvl;
  teacher;
  student;
  fname;
  upcomingExams;
  todos: boolean = false;
  constructor(private storage: Storage,
              private _apiService: ApiService,
              private router:Router,
              public alertCtrl: AlertController,
              private tts: TextToSpeech) { }

  ngOnInit() {
    this.getUpcoming();
  }

  getUpcoming() {
    this.storage.get('userData').then((res)=> {
      this.userData = res;
      this.fname = this.userData.fname;
      this.uName = this.userData.username;
      this.userlvl = this.userData.usertype;
      if(this.userlvl == 'teacher'){
        this.teacher = true;
        this._apiService.getUpcomingExamsAllSubjs(this.uName).subscribe((res:any)=> {
          // console.log(res);
          if(res.status == 'No Upcoming Exams!'){
            this.tts.speak('It seems like you completed all of your tasks!');
            this.todos = false;
          }else{
            this.upcomingExams = res;
            this.todos = true;
          }
          // console.log(this.todos);
        })
      }else{
        this.student = true;
        this._apiService.getUpcomingExamsStudentAllSubjs(this.uName).subscribe((res:any)=> {
          // console.log(res);
          if(res.status == 'No Upcoming Exams'){
            this.tts.speak('It seems like you completed all of your tasks!');
            this.todos = false;
          }else{
            this.upcomingExams = res;
            this.todos = true;
          }
          // console.log(this.todos);
        })
      }
      
    })
  }

  displayStudentView(upcomingexam){
    if(upcomingexam.status == 'Unlocked') {
      this.examIsNotYetAvailable();
    }else{
      this.router.navigateByUrl('/attempts/'+upcomingexam.examName+'/'+upcomingexam.endDate+'/'+upcomingexam.eid+'/'+upcomingexam.examType);
    }
  }

  async examIsNotYetAvailable() {
    const alert = await this.alertCtrl.create({
      header: 'NOTE',
      message: 'Exam is not yet available for taking!',
      buttons: ['OK']
    });

    await alert.present();

    await alert.onDidDismiss().then(()=> {
      this.getUpcoming();
    });
  }


  displayExamQuestions(upcomingexam) {
    // console.log(upcomingexam)
    this.router.navigateByUrl('/questions/'+upcomingexam.eid+'/'+upcomingexam.examName+'/'+upcomingexam.subjDesc+'/'+upcomingexam.examType+'/'+upcomingexam.status)
  }

  doRefresh(event) {
    setTimeout(() => {
      // console.log('Async operation has ended');
      this.getUpcoming();
      event.target.complete();
    }, 2000);
  }
}
