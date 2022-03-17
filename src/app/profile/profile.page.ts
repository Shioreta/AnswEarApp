import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData;
  userName: String;
  userbday: Date;
  userGender: String;
  userlvl: String;
  userSchool: String;

  constructor(private modalCtrl: ModalController,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.get('userData').then((res) => {
      this.userData = res;
      this.userName = this.userData.fname + ' ' + this.userData.mname + ' ' + this.userData.lname;
      this.userlvl = this.userData.usertype;
      this.userSchool = this.userData.school;
      this.userGender = this.userData.gender;
      this.userbday = this.userData.bday;
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
