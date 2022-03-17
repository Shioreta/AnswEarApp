import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.page.html',
  styleUrls: ['./create-exam.page.scss'],
})
export class CreateExamPage implements OnInit {
  customDayShortNames = ['s\u00f8n', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'l\u00f8r'];

  @Input() subjectDesc: String;
  userData;
  uName: string;
  examName;
  examType;
  startDate: Date;
  endDate: Date;
  lastExamID;
  subjMemberID;


  constructor(private modalCtrl: ModalController,
              private storage: Storage,
              private _apiService: ApiService,) { 
                
              }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  createExam() {
    
    this.storage.get('userData').then((res) => {
      this.userData = res;
      this.uName = this.userData.username;

      //const newStartDate = format(new Date(this.startDate), "yyyy-MM-dd");
      //const newEndDate = format(new Date(this.endDate), "yyyy-MM-dd");
      //console.log(newStartDate)

      let newExam = {
        examName: this.examName,
        examtype: this.examType,
        subjDesc: this.subjectDesc,
        startDate: this.startDate,
        endDate: this.endDate,
        username: this.uName
      }

      console.log(newExam);
      this._apiService.putNewExam(newExam).subscribe((res: any)=> {
        this._apiService.getLastEID().subscribe((res2:any) => {
          let lastexam = res2[0];
          this.lastExamID = lastexam.EID;
          // console.log(lastexam)
          let newExamMember = {
            username: this.uName,
            eid: lastexam.EID
          }

          // Add exam Creator as member
          this._apiService.putExamMember(newExamMember).subscribe((res3:any) => {})
          // Get usernames of subject members and add it on examMembers
          // console.log('subject is',this.subjectDesc)
          this._apiService.getSubjMembers(this.subjectDesc).subscribe((res4: any)=> {
            let subjMembers = res4;
            // console.log(res4);

            let i;
            for(i=0; i<res4.length; i++){
              this.subjMemberID = res4[i]

              let data = {
                username: this.subjMemberID.username,
                eid: this.lastExamID
              }
              // console.log(data)
              this._apiService.putExamMember(data).subscribe((res:any)=> {})
            }


          })

        })
        this.closeModal();
      })

      
    })

  }
}
