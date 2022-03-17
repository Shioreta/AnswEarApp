import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class AccountListPage implements OnInit {

  uid;
  userData;
  users;
  fname;
  lname;

  constructor(private _apiService: ApiService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getUsers();
  }

  
  
  getUsers() {
    this._apiService.getUsers().subscribe(res => {
      //console.log(res);
      this.users = res;
      //this.uid = this.users.uid;
      this.fname = this.users.fname;
      this.lname = this.users.lname;
      //console.log(this.userData);      
    })
    this.closeModal();
  }
  closeModal() {
    this.modalCtrl.dismiss();
   }

}
