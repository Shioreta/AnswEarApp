import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-stud-completed-exam-results',
  templateUrl: './view-stud-completed-exam-results.page.html',
  styleUrls: ['./view-stud-completed-exam-results.page.scss'],
})
export class ViewStudCompletedExamResultsPage implements OnInit {

  eid;
  examName;
  subjDesc;
  questions;
  examType;
  examStatus;
  userData;
  uName;
  examResults;
  score = 0;
  dateToday;

  totalItems;
  dateAttempted;
  examStatusResult:boolean=false;
  hasTakenExam: boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
              private _apiService: ApiService,
              private storage: Storage) { 
    
  }

  ngOnInit() {
    this.eid = this.activatedRoute.snapshot.paramMap.get('eid');
    this.examName = this.activatedRoute.snapshot.paramMap.get('examName');
    this.examType = this.activatedRoute.snapshot.paramMap.get('examType');
    this.getExamResultsSummary();
    this.getExamTotal();

    if(this.score > (this.totalItems / 2)) {
      this.examResults = true;
    }else{
      this.examResults = false;
    }
  }

  getExamResultsSummary(){
    this.storage.get('userData').then((res:any)=> {
      this.userData = res;
      this.uName = this.userData.username;
      // console.log(this.eid);
      // console.log('Username '+this.uName);

      this._apiService.getexamResults(this.eid,this.uName).subscribe((res:any)=>{
        this.examResults = res[0];
        // console.log(this.examResults);
        this.subjDesc = this.examResults.subjDesc;
        this.score = this.examResults.score;
      })

      this._apiService.getDateAttempted(this.uName, this.eid).subscribe((res:any) => {
        // console.log(res);
        if(res.status == 'No attempts Yet!'){
          this.hasTakenExam = false;
        }else{
          this.dateAttempted = res[0].dateAttempted;
          this.hasTakenExam = true;
        }
      })
    })
  }

  getExamTotal() {
    this._apiService.getTotalExamItems(this.eid).subscribe((res:any) => {
      // console.log(res);
      this.totalItems = res[0].totalNoOfItems;
    })
  }


}
