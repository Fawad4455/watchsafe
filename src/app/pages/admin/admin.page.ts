import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PasswordScreenComponent } from '../../components/password-screen/password-screen.component';
import  { DomSanitizer} from '@angular/platform-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import {Location} from '@angular/common';
import {CommonBrowserService} from '../../services/common-browser.service';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import {log} from 'util';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit {

  options1: ThemeableBrowserOptions = {
    statusbar: {
      color: '#ffffffff'
    },
    toolbar: {
      height: 44,
      color: '#f0f0f0ff'
    },
    title: {
      color: '#003264ff',
      showPageTitle: true
    },
    backButton: {
      image: 'back',
      imagePressed: 'back_pressed',
      align: 'left',
      event: 'backPressed'
    },
    forwardButton: {
      image: 'forward',
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
        image: 'share',
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


  youtube: any;
  video: any[] = [];
 constructor(public modalController: ModalController, public dom: DomSanitizer, public commonBrowserService: CommonBrowserService , private router: Router) {
      this.youtube = this.dom.bypassSecurityTrustResourceUrl('https://m.youtube.com/');
      if (localStorage.getItem('videos')){
        this.video = JSON.parse(localStorage.getItem('videos'));
      }
  }

  /*ionViewDidEnter(){
    this.presentModal();
  }
*/
  async presentModal() {
    const modal = await this.modalController.create({
      component: PasswordScreenComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }



  ngOnInit() {
    if (localStorage.getItem('videos')){
      this.video = JSON.parse(localStorage.getItem('videos'));
      this.video.forEach((item, index) => {
        this.video[index] = this.dom.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item );
      });
    }
  }
  playVideo(url){
    this.router.navigate(['/video-page', {
      video: JSON.stringify(url)
    }]);

  }

  openYoutube(){
    this.commonBrowserService.open_browser();
  }

    removeItem(url){
       let vid =  this.dom.bypassSecurityTrustResourceUrl(url['changingThisBreaksApplicationSecurity']);
      console.log(vid);
    }
}
