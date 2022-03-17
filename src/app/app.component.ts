import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProfilePage } from './profile/profile.page';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // public appPages = [
  //   { title: 'Home', url: '/thome', icon: 'home' },
  //   { title: 'My Monitoring', url: '/thome', icon: 'grid' },
  //   { title: 'My Subjects', url: '/subjects', icon: 'documents' },
  //   { title: 'My Profile', url: '/thome', icon: 'person' },
  //   { title: 'Settings', url: '/thome', icon: 'settings' },
  //   { title: 'Logout', url: '/login', icon: 'log-out' },
  // ];

  account;
  userData;
  userID;
  userName: String;
  userFullname: String;

  constructor(public storage: Storage,public router: Router,
              private modalCtrl: ModalController,
              private tts: TextToSpeech) {
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    this.initializeApp();
  }

  initializeApp() {
    // this.storage.get('session_storage').then((res)=>{
    //   if(res == null){
    //     this.router.navigate(['/login']);
    //   }else{
    //     this.router.navigate(['/home']);
    //   }
    // });
    this.storage.get('userData').then((res) => {
      this.userData = res;
      this.account = this.userData.usertype;
      
      if(res == null) {
        this.router.navigateByUrl('/login');
      }
      else if (this.account == 'Admin' || this.account == 'admin'  ){
        this.router.navigateByUrl('/admin');
      }
      else {
        this.router.navigateByUrl('/home');
        // this.userData = res[0];
        // this.userData = res;
        // console.log(this.userData);
        // this.userName = this.userData.username;
        // this.userFullname = this.userData.fname + ' ' + this.userData.lname;
      }
    })
  }

  logout() {
    this.storage.clear();
    this.router.navigateByUrl('/login');
  }

  async displayProfile() {
    this.tts.speak('Profile')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    const modal = await this.modalCtrl.create({
      component: ProfilePage
    });
    return await modal.present();
  }

  gotoHome() {
    this.tts.speak('Home')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    this.router.navigateByUrl('/home')
  }

  gotoSubjects(){
    this.tts.speak('Subjects')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    this.router.navigateByUrl('/subjects')

  }
  displayTodos() {
    this.tts.speak('To Dos')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    this.router.navigateByUrl('/todos');
  }

}
