import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-control',
  templateUrl: 'control.page.html',
  styleUrls: ['control.page.scss']
})
export class ControlPage {

  constructor(
    public navCtrl: NavController,
    private alertService: AlertService
  ) {}

  navigateToSettings(): void {
    console.log('Navigating to settings!');
    this.navCtrl.navigateForward('settings');
  }

  navigateToEnvironmentMap(): void {
    this.alertService.featureUnderDevelopAlert();
  }

}
