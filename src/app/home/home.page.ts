import { Component, NgZone, OnInit } from '@angular/core';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer/ngx';
import { Stepcounter } from '@ionic-native/stepcounter/ngx';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  nrOfSteps = 0;
  startingOffset: any;
  data: IPedometerData;
  barcodeData: BarcodeScanResult;
  barcode: string;
  token: string;
  observer: any;
  subs = new Array<Subscription>();
  constructor(private zone: NgZone, private pedoMeter: Pedometer, private stepcounter: Stepcounter, private barcodeScanner: BarcodeScanner, private firebaseMessaging: FirebaseMessaging) {}

  ngOnInit() {
    const sub_1 = this.pedoMeter.startPedometerUpdates().subscribe((data: IPedometerData) => {
      this.data = data;
      this.zone.run(() => {
        this.nrOfSteps = this.data.numberOfSteps;
      });
    });
    this.firebaseMessaging.getToken().then(token => {
      this.token = token;
    });
    this.stepcounter.getTodayStepCount().then(stepCount => (this.startingOffset = stepCount));
    this.subs.push(sub_1);
  }

  ngOnDestroy() {
    if (this.subs) this.subs.forEach(sub => sub.unsubscribe());
  }

  somefunction = () => {
    this.pedoMeter
      .isDistanceAvailable()
      .then((available: boolean) => console.log(available))
      .catch((error: any) => console.log(error));
  };

  scanBardcode = () => {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.barcodeData = barcodeData;
        this.zone.run(() => {
          this.barcode = this.barcodeData.text;
        });
      })
      .catch(err => {
        console.log('Error', err);
      });
  };
}
