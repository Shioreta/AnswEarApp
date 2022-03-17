import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-addsubjectmember',
  templateUrl: './addsubjectmember.page.html',
  styleUrls: ['./addsubjectmember.page.scss'],
})
export class AddsubjectmemberPage implements OnInit {

  @Input() subjectDesc: String;
  students;
  userData;
  uname: string;
  studUsername;
  exams;
  examID;
  // userData;
  username;
  hasStudents: boolean=false;

  constructor(private modalCtrl: ModalController,
              private _apiService: ApiService,
              private storage: Storage,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getStudents();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  getStudents() {
    this._apiService.getStudents(this.subjectDesc).subscribe((res:any)=> {
      if(res.status == 'All students has been added!'){
        this.hasStudents = false;
      }else{
        this.students = res;
        this.hasStudents = true;
      }
    })
  }

  async noStudentSelected() {
    const alert = await this.alertCtrl.create({
      header: 'No student selected!',
      message: 'Please select a student first before saving!',
      buttons: ['OK']
    });

    await alert.present();
  }

  addsubjMember() {
    // console.log(this.uname);
    if(this.studUsername == '' || this.studUsername == undefined){
      this.noStudentSelected();
      // console.log('All students has been added',this.studUsername);
    }else{
      let newMember = {
        uname: this.studUsername,
        subjDesc: this.subjectDesc
      }
      // console.log(newMember)
      this._apiService.putSubjMember(newMember).subscribe((res:any) => {
        this.closeModal();
      })
  
      this._apiService.getExamIDs(this.subjectDesc).subscribe((res2: any) => {
        
        let i;
        for(i=0; i<res2.length; i++){
          this.examID = res2[i]
  
          let data = {
            username: this.studUsername,
            eid: this.examID.EID
          }
          // console.log(data)
          this._apiService.putExamMember(data).subscribe((res:any)=> {})
        }
      })
    }

  }


}
