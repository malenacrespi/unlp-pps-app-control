import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.scss'],
})
export class DeviceStatusComponent  implements OnInit {

  private deviceNetworkStatusColor: string;

  constructor(private deviceService: DeviceService) {
    this.deviceNetworkStatusColor = 'danger';
  }

  ngOnInit() {}

  getDeviceNetworkStatus(): boolean {
    return this.deviceService.getDeviceNetworkStatus();
  }

}
