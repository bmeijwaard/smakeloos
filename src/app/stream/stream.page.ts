import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavController, LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Component({
  selector: 'app-stream',
  templateUrl: 'stream.page.html',
  styleUrls: ['stream.page.scss']
})
export class StreamPage implements OnInit {
  video: any = {
    url: 'https://www.youtube.com/embed/5u15qvfxLNM'
  };

  trustedVideoUrl: SafeResourceUrl;
  loading: HTMLIonLoadingElement;
  constructor(private player: YoutubeVideoPlayer, public navCtrl: NavController, public loadingCtrl: LoadingController, private domSanitizer: DomSanitizer) {}
  ngOnInit() {}
  playVideo = () => {
    this.player.openVideo('5u15qvfxLNM');
  };

  ionViewWillEnter(): void {
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.video.url);
  }
}
