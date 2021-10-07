import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-screen',
  templateUrl: './password-screen.component.html',
  styleUrls: ['./password-screen.component.scss'],
})
export class PasswordScreenComponent implements OnInit {
  password;
  userName;
  constructor(public modalController: ModalController, public location: Location, public router: Router, public alertController: AlertController) {
  }

  ngOnInit() {
  }

  onpasswordChange(ev: any) {
    this.password = ev.detail.value;
  }

  onNameChange(ev: any) {
    this.userName = ev.detail.value;
  }

  login(){
    if (localStorage.getItem('password') === this.password &&
        localStorage.getItem('userName') === this.userName &&
        this.password !== null && this.password !== undefined &&
        this.userName !== null && this.userName !== undefined) {
        this.modalController.dismiss();
           // this.router.navigate(['admin']);
    } else {
      this.errorAlert();
    }



     /*if (password === cpassword){
       localStorage.setItem('userName',this.userName);
       localStorage.setItem('password',this.password);
       this.modalController.dismiss();
       this.commonBrowserService.open_browser();

     }else{
       this.location.back();
       this.modalController.dismiss();

     }*/
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Incorrect Information.',
      buttons: ['OK']
    });

    await alert.present();
  }


}

