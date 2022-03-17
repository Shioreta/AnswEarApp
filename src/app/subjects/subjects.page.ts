import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AddSubjPage } from '../add-subj/add-subj.page';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {

  uName;
  userData;
  subjects;
  userType;
  fabButton: boolean=false;
  hasSubjects: boolean=false;

  constructor(public _apiService: ApiService, private storage: Storage, private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getSubjs();
  }

  getSubjs() {
    this.storage.get('userData').then((res) => {
      this.userData = res;
      // console.log(this.userData);
      this.uName = this.userData.username;
      this.userType = this.userData.usertype;

      if(this.userType == 'teacher'){
        this.fabButton = true;
      }else{
        this.fabButton = false;
      }
      // console.log(this.uName);
      this._apiService.getSubjects(this.uName).subscribe((res: any)=> {
        if(res.status == 'No Subjects Yet!'){
          this.hasSubjects = false;
        }else{
          this.subjects = res;
          this.hasSubjects = true;
        }
        // console.log(this.hasSubjects)
      })
    })
  }

  displaySubj(subjDesc) {
    this.router.navigateByUrl('/subject/'+subjDesc);
  }

  async addSubj() {
    let data = {
      username: this.uName
    }

    // console.log(data);

    const modal = await this.modalCtrl.create({
      component: AddSubjPage,
      componentProps: data
    });
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      this.getSubjs();
    })
  }
}
