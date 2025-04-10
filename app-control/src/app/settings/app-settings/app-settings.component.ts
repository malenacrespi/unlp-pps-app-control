import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent implements OnInit {

  constructor
  (
    private alertService: AlertService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {}

  changeLanguage(event: CustomEvent): void {
    let language = event.detail.value;
    this.translateService.use(language);
  }

  getCurrentLanguageName(): string {
    switch(this.translateService.currentLang) {
      case 'en': 
        return this.translateService.instant('LANGUAGES.ENGLISH');
      case 'es':
        return this.translateService.instant('LANGUAGES.SPANISH');
      case 'pt':
        return this.translateService.instant('LANGUAGES.PORTUGUESE');
      case 'it': 
        return this.translateService.instant('LANGUAGES.ITALIAN');
      case 'tr':
        return this.translateService.instant('LANGUAGES.TURKISH');
      default:
        return this.translateService.instant('LANGUAGES.ENGLISH');
    }
  }

  showHelp(): void {
    this.alertService.featureUnderDevelopAlert();
  }

  showAboutApp(): void {
    this.alertService.featureUnderDevelopAlert();
  }

}
