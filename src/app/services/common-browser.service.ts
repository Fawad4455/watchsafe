import { Injectable } from '@angular/core';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import {Location} from '@angular/common';
import { AlertController } from '@ionic/angular';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CommonBrowserService {

  options1: ThemeableBrowserOptions = {
    statusbar: {
      color: '#ffffff'
    },
    toolbar: {
      height: 44,
      color: '#ffffff'
    },
    title: {
      color: '#00CC00',
      showPageTitle: true
    },
    backButton: {
      image: 'back',
      imagePressed: 'back_pressed',
      align: 'left',
      event: 'backPressed'
    },
    forwardButton: {
      imagePressed: 'forward_pressed',
      align: 'left',
      event: 'forwardPressed'
    },
    closeButton: {
      image: 'close',
      imagePressed: 'close_pressed',
      align: 'left',
      event: 'closePressed'
    },
    customButtons: [
      {
        wwwImage: '/assets/menu.png',
        imagePressed: 'share_pressed',
        align: 'right',
        event: 'sharePressed',
      }
    ],
    menu: {
      image: 'menu',
      imagePressed: 'menu_pressed',
      title: 'Test',
      cancel: 'Cancel',
      align: 'right',
      items: [
        {
          event: 'helloPressed',
          label: 'Hello World!'
        },
        {
          event: 'testPressed',
          label: 'Test!'
        }
      ]
    },
    backButtonCanClose: true
  }
  video:any = [];
  constructor(private themeableBrowser: ThemeableBrowser,public alertController: AlertController) {
    if (localStorage.getItem('videos')){
      this.video = JSON.parse(localStorage.getItem('videos'));
    }

  }



  async presentAlertRadio(url) {

    let cateList: any = [];
    let radioButtons: any[] = [];
    if (localStorage.getItem('category')){
      cateList = JSON.parse(localStorage.getItem('category'));
    }
    if(cateList.length){
      cateList.forEach((item, index) => {
        radioButtons.push({
          name: item,
          type: 'radio',
          label: item,
          value: item,
          checked: index === 0 ? true : false
        });
      });
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: radioButtons ? radioButtons : [],
      message: radioButtons.length === 0 ? `Message <strong>No Category Found</strong>!!!` : '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (event) => {
            console.log('event');
            console.log(event);
            this.video.push(url)
            localStorage.setItem('videos', JSON.stringify(this.video)) ;
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }


    open_browser(){
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://m.youtube.com', '_self', this.options1);

    browser.on('helloPressed').subscribe((e) => {
      console.log(e.url);
      let url = e.url.split('v=');
      this.video.push(url[1])
      localStorage.setItem('videos', JSON.stringify(this.video));
      //this.presentAlertRadio(url[1]);

    });
    browser.on('sharePressed').subscribe((e) => {
      alert('helloo');
      console.log(e.url);
      let url = e.url.split('v=');
      this.video.push(url[1])
      localStorage.setItem('videos', JSON.stringify(this.video));
      //this.presentAlertRadio(url[1]);

    });
  }


}
