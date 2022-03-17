import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-subj',
  templateUrl: './add-subj.page.html',
  styleUrls: ['./add-subj.page.scss'],
})
export class AddSubjPage implements OnInit {

  @Input() username: string;
  notMySubjs;
  newSubj: String;
  hasNotMySubjs: boolean = false;

  constructor(private modalCtrl: ModalController,
              private _apiService: ApiService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    // console.log(this.username);
    this.getNotMySubjs()
  }

  async noSubjSelected() {
    const alert = await this.alertCtrl.create({
      header: 'No Subject Selected!',
      message: 'Please select a subject first before saving!',
      buttons: ['OK']
    });

    await alert.present();
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }


  getNotMySubjs() {
    this._apiService.getNotMySubjs(this.username).subscribe((res: any)=>{
      // console.log(res); 
      if(res.status == 'No available subject to add on your account!'){
        this.hasNotMySubjs = false;
      }else{
        this.notMySubjs = res;
        this.hasNotMySubjs = true;
      }
    })
  }

  addSubj() {
    // console.log(this.newSubj);
    if(this.newSubj == '' || this.newSubj == undefined){
      // console.log('No subject selected',this.newSubj);
      this.noSubjSelected();
    }else{
      let newMember = {
        subjDesc: this.newSubj,
        uname: this.username
      }
      this._apiService.putSubjMember(newMember).subscribe((res:any) => {
        this.closeModal();
      })
    }
    // console.log(this.username);
    
  }
}
