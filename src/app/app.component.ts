import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { Component, NgZone } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Thuis',
      url: '/thuis',
      icon: 'home'
    },
    {
      title: 'Cards',
      url: '/cards',
      icon: 'card'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];
  observer: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseMessaging: FirebaseMessaging,
    private toastCtrl: ToastController,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.firebaseMessaging.onMessage().subscribe(next => {
      this.observer = next;
      this.zone.run(async () => {
        const toast = await this.toastCtrl.create({
          message: `${this.observer.gcm.title}: ${this.observer.gcm.body}`,
          duration: 3000
        });
        toast.present();
      });
    });
  }
}
