import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(public navCtrl: NavController) { }

  navigateToHome(): void {
    console.log('Navigating to home!');
    this.navCtrl.navigateBack('');
  }

}
