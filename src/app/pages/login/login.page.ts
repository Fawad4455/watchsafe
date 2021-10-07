import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password;
  cPassword;
  userName;
  constructor(public alertController: AlertController, public location: Location, private router: Router) { }

  ngOnInit() {
  }

  onpasswordChange(ev: any) {
    this.password = ev.detail.value;
  }

  onCpasswordChange(ev: any) {
    this.cPassword = ev.detail.value;
  }
  onNameChange(ev: any) {
    this.userName = ev.detail.value;
  }

  SavePassword(){
    let password  = this.password;
    let cpassword = this.cPassword;

    if (password !== '' && cpassword !== '' &&  password === cpassword &&
        password !== null && cpassword !== undefined && this.userName !== '' && this.userName !== undefined){
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('password', this.password);
      this.presentAlert();
    }else{
      this.errorAlert();

    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Password Added Successfully.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Wrong Password',
      buttons: ['OK']
    });

    await alert.present();
  }

}
