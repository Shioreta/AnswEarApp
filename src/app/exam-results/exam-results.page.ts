import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.page.html',
  styleUrls: ['./exam-results.page.scss'],
})
export class ExamResultsPage implements OnInit {

  userData;
  uName: string;
  eid;
  examResults;

  subjDesc: string;
  examName: string;
  score;
  dateToday;
  total;
  status: string;

  constructor(private modalCtrl: ModalController,private router: Router,
              private _apiService: ApiService, private storage: Storage,
              private navParams: NavParams,
              private tts: TextToSpeech) { }

  ngOnInit() {
    this.eid = this.navParams.get('eid');
    this.total = this.navParams.get('total');

    this.getExamResults();
  }

  readResults(){
    // console.log(this.examResults);
    if(this.examResults){
      this.tts.speak('Thank you for taking the exam, here\'s your exam results.').then(()=> {
        this.tts.speak('Examination Name: "'+this.examName+'", Total number of items: "'+this.total+'".Your Score: '+this.score).then(() => {
          if(this.examResults.score >= (this.total/2)){
            this.status = "Passed";
            this.tts.speak('Congratulations You Passed the Exam!');
          }else {
            this.status = "Failed";
            this.tts.speak('Sorry, you failed!');
          }
        })
      });
    }else{

    }
  }

  closeModal() {
    this.modalCtrl.dismiss();

    if(this.score > (this.total/2)){
      this.status = "Passed";
    }else{
      this.status = "Failed";
    }

    let result = {
      eid: this.eid,
      examName : this.examName,
      totalItems : this.total,
      studScore : this.score,
      status: this.status,
      subjDesc: this.subjDesc,
      username: this.uName
    }
    // console.log(result);
    this._apiService.putExamResult(result).subscribe((res: any) => {})
  }

  getExamResults() {
    this.storage.get('userData').then((res:any)=> {
      this.userData = res;
      this.uName = this.userData.username;

      this._apiService.getexamResults(this.eid,this.uName).subscribe((res:any)=>{
        this.examResults = res[0];
        this.subjDesc = this.examResults.subjDesc;
        this.examName = this.examResults.examName;
        this.score = this.examResults.score;
        this.dateToday = this.examResults.dateToday;

        this.readResults();

        // console.log(this.examResults);
        let data = {
          eid: this.eid,
          username: this.uName
        }
        this._apiService.putExamAttempt(data).subscribe((res:any) => {})
      })
    })
  }
}
