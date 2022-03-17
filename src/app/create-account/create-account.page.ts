import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  customDayShortNames = ['s\u00f8n', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'l\u00f8r'];

  userData;
  userName;
  password;
  firstName;
  midName;
  lastName;
  userType;
  gender;
  birthDate: Date;
  school;
  lastUserID;

  constructor(private modalCtrl: ModalController,
              private _apiService: ApiService, private toastCtrl: ToastController, public router: Router) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  createAccount() {
    let newAccount = {
      username: this.userName,
      pass: this.password,
      fname: this.firstName,
      mname: this.midName,
      lname: this.lastName,
      usertype: this.userType,
      gender: this.gender,
      bday: this.birthDate,
      school: this.school
    }

    //console.log(newAccount)

    this._apiService.putNewAccount(newAccount).subscribe((res: any)=> {
      this.modalCtrl.dismiss();       
      this._apiService.getLastUID().subscribe((res2:any) => {
        this.modalCtrl.dismiss(); 
        let lastaccount = res2[0];
        this.lastUserID = lastaccount.uid;
        //console.log(lastaccount)   
        this.presentToastAdd();
      })
    })
    setTimeout(() => {
      this.router.navigateByUrl('/admin');
    }, 1000)


  }

  async presentToastAdd() {
    const toast = await this.toastCtrl.create({
      message: 'User Successfully Added!',
      duration: 3000
    });
    toast.present();
  }
}
