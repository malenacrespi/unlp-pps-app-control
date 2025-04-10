import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentMapPage } from './environment-map.page';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentMapPageRoutingModule {}
