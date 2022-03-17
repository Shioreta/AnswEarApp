import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.page.html',
  styleUrls: ['./qna.page.scss'],
})
export class QnaPage implements OnInit {
  @Input() subjDesc: String;
  @Input() eid;
  @Input() examType;



  optionA:string = '';
  optionB:string = '';
  optionC:string = '';
  optionD:string = '';
  answer:string='';
  question;
  multipleChoice: boolean = false;
  identification: boolean = false;

  constructor(private modalCtrl: ModalController,private _apiService: ApiService) { }

  ngOnInit() {
    // console.log(this.examType);
    if(this.examType == 'Multiple Choice'){
      this.multipleChoice = true;
      // console.log(this.multipleChoice);
    }else{
      this.identification = true;
      // console.log(this.identification)
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveQuestion(){
    let data = {
      subjDesc : this.subjDesc,
      optionA: this.optionA,
      optionB: this.optionB,
      optionC: this.optionC,
      optionD: this.optionD,
      answer: this.answer,
      question: this.question,
      eid: this.eid
    }
    // console.log(data)

    this._apiService.putQuestionaire(data).subscribe((res: any) => {
      this.modalCtrl.dismiss();
    });
  }



}
