import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private storage: Storage,
              private router: Router,
              private platform: Platform,
              private alertCtrl: AlertController) { 

                this.platform.backButton.subscribeWithPriority(10, () => {
                  console.log('Handler was called!');
                  // this.backButtonisDisabled();
                });
              }

  ngOnInit() {}

  adminLogout() {
    this.storage.clear();
    this.router.navigateByUrl('/login');
  }

  async displayProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfilePage
    });
    return await modal.present();
  }

  displayAccounts() {
    this.router.navigateByUrl('/account-list');
  }

  createAccount() {
    this.router.navigateByUrl('/create-account');
  }

  async backButtonisDisabled(){
    const alert = await this.alertCtrl.create({
      header: 'Do you want to logout?',
      buttons: [ {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
