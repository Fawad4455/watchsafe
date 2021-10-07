import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: "sanitizeUrl"
})

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.page.html',
  styleUrls: ['./video-page.page.scss'],
})
export class VideoPagePage {

  url: any;

  constructor(private router: ActivatedRoute, private dom: DomSanitizer) {
    this.router.params.subscribe(param => {
      console.log(param.video);
      this.url = this.dom.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + param.video + '?autoplay=0&rel=0');
      //console.log(this.url);

    });
  }

  getSafeUrl(url){
    return this.dom.bypassSecurityTrustResourceUrl(url['changingThisBreaksApplicationSecurity']);
  }

}
