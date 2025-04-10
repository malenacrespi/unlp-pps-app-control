import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentMapPageRoutingModule } from './environment-map-routing.module';

import { EnvironmentMapPage } from './environment-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentMapPageRoutingModule
  ],
  declarations: [EnvironmentMapPage]
})
export class EnvironmentMapPageModule {}
