import { Injectable, OnDestroy } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class DeviceService implements OnDestroy {

  private deviceConnection: ConnectionStatus;

  constructor() {
    this.deviceConnection = { 
      connected: false, 
      connectionType: 'unknown' 
    };
    this.initDeviceConnection();
  }

  initDeviceConnection(): void {
    Network.getStatus()
    .then((deviceConnection: ConnectionStatus) => {
      this.deviceConnection = deviceConnection;
      console.log('Device Connection initialized! - Status: ' + this.deviceConnection.connected + ' - Type: ' + this.deviceConnection.connectionType);
    }).catch(() => {
      this.deviceConnection.connected = false;
      this.deviceConnection.connectionType = 'unknown';
      console.log('Problem on Device Connection initialization! - Status: ' + this.deviceConnection.connected + ' - Type: ' + this.deviceConnection.connectionType);
    });
    Network.addListener('networkStatusChange', (deviceConnection) => {
      this.deviceConnection = deviceConnection;
      console.log('Network status changed! - Status: ' + this.deviceConnection.connected + ' - Type: ' + this.deviceConnection.connectionType);
    }).then(() => {
      console.log('Listener created! - Status: ' + this.deviceConnection.connected + ' - Type: ' + this.deviceConnection.connectionType);
    }).catch(() => {
      this.deviceConnection.connected = false;
      this.deviceConnection.connectionType = 'unknown';
      console.log('Problem creating listener! - Status: ' + this.deviceConnection.connected + ' - Type: ' + this.deviceConnection.connectionType);
    });
  }

  getDeviceConnectionStatus(): ConnectionStatus {
    return this.deviceConnection;
  }

  getDeviceNetworkStatus(): boolean {
    return this.deviceConnection.connected;
  }

  getDeviceNetworkType(): string {
    return this.deviceConnection.connectionType;
  }

  removeAllListeners(): void {
    Network.removeAllListeners().then(() => {
      console.log('All listeners removed!');
    });
  }

  ngOnDestroy(): void {
    this.removeAllListeners();
  }

}
