import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import {log} from 'util';
import {Router} from '@angular/router';
import * as jQuery from "jquery";



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  video: any = [];
  constructor( public dom: DomSanitizer, private router: Router) {

  }



  ionViewDidEnter(){
    if (localStorage.getItem('videos')){
      this.video = JSON.parse(localStorage.getItem('videos'));
      this.video.forEach((item, index) => {
        this.video[index] = this.dom.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item );
      });
    }

  }

  getSafeUrl(url){
    return this.dom.bypassSecurityTrustResourceUrl(url);
  }

  playVideo(url){
    url = url.changingThisBreaksApplicationSecurity;
    let splitUrl = url.split("embed");
    let urlPart  = splitUrl[1].split('/');
    this.router.navigate(['/video-page', {
      video: urlPart[1]
    }]);

  }



}
