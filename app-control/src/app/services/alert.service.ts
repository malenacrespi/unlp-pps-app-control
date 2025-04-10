import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor
  (
    private alertController: AlertController,
    private translateService: TranslateService
  ) { }

  async showAlert(header: string, message: string, buttons: string[]): Promise<void> {
    const translatedHeader = this.translateService.instant(header);
    const translatedMessage = this.translateService.instant(message);
    const alert = await this.alertController.create({
      header: translatedHeader,
      message: translatedMessage,
      buttons: buttons.map(button => ({
        text: this.translateService.instant(button)
      }))
    });
    await alert.present();
  }

  async unableToConnect(): Promise<void> {
    await this.showAlert('ALERTS.ERROR_TITLE', 'ALERTS.ERROR_MESSAGE_UNABLE_TO_CONNECT',['OK']);
  }

  async featureUnderDevelopAlert(): Promise<void> {
    await this.showAlert('ALERTS.WARNING_TITLE', 'ALERTS.WARNING_MESSAGE_FEATURE_UNDER_DEVELOPMENT',['OK']);
  }

}
