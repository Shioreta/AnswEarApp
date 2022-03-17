import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ExaminationPage } from '../examination/examination.page';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.page.html',
  styleUrls: ['./attempts.page.scss'],
})
export class AttemptsPage implements OnInit {

  examName: string;
  examType: string;
  endDate;
  eid;
  items;

  constructor(private activatedRoute:ActivatedRoute,
              private _apiService: ApiService,
              private modalCtrl: ModalController,
              private router: Router,
              public platform: Platform) {
    
    this.examName = this.activatedRoute.snapshot.paramMap.get('examName');
    this.examType = this.activatedRoute.snapshot.paramMap.get('examType');
    this.endDate = this.activatedRoute.snapshot.paramMap.get('endDate');
    this.eid = this.activatedRoute.snapshot.paramMap.get('eid');

    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
    });
  }

  ngOnInit() {
    this.getNumberofItems()
  }

  getNumberofItems() {
    this._apiService.getQuestionaire(this.eid).subscribe((res:any) => {
      let questions = res;
      if(questions == null) {
        this.items = 0;
      }else{
        this.items = questions.length;
      }
    })
  }

  startExamNow(){
    this.router.navigateByUrl('/examination/'+this.eid+'/'+this.examType)
  }
}
