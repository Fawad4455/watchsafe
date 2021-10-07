import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoPagePage } from './video-page.page';

describe('VideoPagePage', () => {
  let component: VideoPagePage;
  let fixture: ComponentFixture<VideoPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
