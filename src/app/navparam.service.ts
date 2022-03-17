import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavparamService {
  navData:any;
  userLoggedIn;
  constructor() { }

  setNavData(navObj) {
    this.navData = navObj;
  }

  getNavData() {
    // if(isNullOrUndefined(this.navData))
    //   return 0;
    return this.navData;
  }

  setUserLoggedIn(uid) {
    this.userLoggedIn = uid;
  }

  getUserLoggedIn() {
    return this.userLoggedIn;
  }
}
