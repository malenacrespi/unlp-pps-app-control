import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlPage } from './control.page';

import { ControlRoutingModule } from './control-routing.module';
import { LongPressDirective } from '../directives/long-press.directive';
import { DeviceStatusComponent } from './device-status/device-status.component';
import { RobotStatusComponent } from './robot-status/robot-status.component';
import { ControlButtonsComponent } from './control-buttons/control-buttons.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ControlRoutingModule,
    LongPressDirective,
    TranslateModule 
  ],
  declarations: [
    ControlPage,
    DeviceStatusComponent,
    RobotStatusComponent,
    ControlButtonsComponent
  ]
})
export class ControlPageModule {

}
