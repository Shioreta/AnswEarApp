import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { NavparamService } from '../navparam.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username;
  password;
  countValue;
  userType;
  userData;
  userID;

  constructor(public _apiService: ApiService,
              public router: Router,
              public alertController: AlertController,
              public _navParams: NavparamService,
              private storage: Storage) { }

  ngOnInit() {}

  checkCredentials(user,pass) {
    // console.log(this.username,this.password);
    if(this.username == undefined || this.password == undefined) {
      this.enterUsernamePW();
    }else{
      let account = {
        username: this.username,
        password: this.password
      }
  
      this._apiService.checkCredentials(account).subscribe((res: any) => {
        // console.log("SUCCESS ====", res);
        let count = res[0];
        this.countValue = count.Count;
        // console.log(this.countValue);
        if(this.countValue == 1) {
          this._apiService.getLoginCredentials(account).subscribe((res: any) => {
            let user = res[0];
            // console.log(user);
            // this.userID = user.uid;

            this.storage.set('userData', user);
            //console.log("SUCCESS ====", res);

            //console.log(user.usertype);
            this.userType = user.usertype;
            if(this.userType == 'admin') {
              this.router.navigateByUrl('/admin');
            }

            else {
              this.router.navigateByUrl('/home');
            }

            /*
            this.storage.get('userData').then((res) => {
              this.userData = res;
              this.userType = this.userData.usertype;
              console.log(this.userType);
              
              if(this.userType == 'admin') {
                this.router.navigateByUrl('/admin');
              }
              //else {
              //  this.router.navigateByUrl('/home');
              //}
            })*/


            // console.log("SUCCESS ====", res);
            // this.storage.set('session_storage',res[0]);
            // this.userID = user.uid;
            // console.log(this.usertype);
            //if(this.usertype == 'student') {
            //   // this._navParams.setUserLoggedIn(this.userID);
            //   this.router.navigateByUrl('home');
            // }else if(this.usertype == 'teacher'){
            //   // this._navParams.setUserLoggedIn(this.userID);
            //   this.router.navigateByUrl('home');
            // }else{
  
            // }
          },(error: any) => {
            console.log("ERROR ====", error);
          })

        }else{
          this.presentAlert();
        }
      }, (error: any) => {
        console.log("ERROR ====", error);
      })
    }

    
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Message',
      message: 'Wrong username or password!',
      buttons: ['OK']
    });

    await alert.present();

  }
  async enterUsernamePW() {
    const alert = await this.alertController.create({
      header: 'Message',
      message: 'Please enter username or password!',
      buttons: ['OK']
    });

    await alert.present();

  }
}
