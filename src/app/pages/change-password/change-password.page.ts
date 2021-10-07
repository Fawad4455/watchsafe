import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  oldPassword;
  newPassword;
  userName;

  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  onOldpasswordChange(ev: any) {
    this.oldPassword = ev.detail.value;
  }

  onNewpasswordChange(ev: any) {
    this.newPassword = ev.detail.value;
  }
  onNameChange(ev: any) {
    this.userName = ev.detail.value;
  }

  updatePassword() {

    if (localStorage.getItem('password') === this.oldPassword) {
      if (localStorage.getItem('userName') === this.userName) {
        if (this.newPassword !== null && this.newPassword !== undefined && this.userName !== null && this.userName !== undefined) {
          localStorage.setItem('userName', this.userName);
          localStorage.setItem('password', this.newPassword);
          this.presentAlert();
        }
      } else {
        this.errorAlert();
      }
    } else {
      this.errorAlert();
    }

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Password Changed Successfully.',
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
      message: 'Incorrect Information.',
      buttons: ['OK']
    });

    await alert.present();
  }


}
