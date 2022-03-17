import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  @Input() examType: String;
  @Input() question: String;
  @Input() answer: String;
  @Input() optionA: String;
  @Input() optionB: String;
  @Input() optionC: String;
  @Input() optionD: String;
  @Input() subjDesc: String;
  @Input() eid;
  @Input() qid;

  editQuestion;
  editAnswer;
  editOptionA;
  editOptionB;
  editOptionC;
  editOptionD;

  multipleChoice: boolean=false;
  identification: boolean=false;

  constructor(private modalCtrl: ModalController,private _apiService: ApiService) { }

  ngOnInit() {
    // console.log(this.examType);
    if(this.examType == 'Multiple Choice'){
      this.multipleChoice = true;
    }else {
      this.identification = true;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  //update question

  updateQuestion() {
    
    this.editQuestion = this.question;
    let editAnswer = this.answer;
    let editOptionA = this.optionA;
    let editOptionB = this.optionB;
    let editOptionC = this.optionC;
    let editOptionD = this.optionD;
    
    let data = {
      question: this.editQuestion,
      answer: editAnswer,
      optionA: editOptionA,
      optionB: editOptionB,
      optionC: editOptionC,
      optionD: editOptionD,
      qid: this.qid

    }

    this._apiService.updateQuestionnaire(data).subscribe((res: any) => {
      this.modalCtrl.dismiss();
    });
  
  }

  
}
