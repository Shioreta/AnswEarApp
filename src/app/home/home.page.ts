import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile.page';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
// const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userType;
  userData;
  constructor(private modalCtrl: ModalController,
              private storage: Storage,
              private router: Router,
              private platform: Platform,
              private alertCtrl: AlertController,
              private tts: TextToSpeech) { 
                
                this.platform.backButton.subscribeWithPriority(10, () => {
                  console.log('Handler was called!');
                  // this.backButtonisDisabled();
                });
              }

  ngOnInit() {}

  async displayProfile() {
    this.tts.speak('Profile')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    const modal = await this.modalCtrl.create({
      component: ProfilePage
    });
    return await modal.present();
  }

  displaySubjects() {
    //this.router.navigateByUrl('/subjects');
    this.tts.speak('Subjects')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    this.router.navigateByUrl('/subjects');
  }

  displayTodos() {
    this.tts.speak('To Dos')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    this.router.navigateByUrl('/todos')
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
