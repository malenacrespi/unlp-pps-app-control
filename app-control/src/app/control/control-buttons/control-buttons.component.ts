import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DeviceService } from 'src/app/services/device.service';
import { HttpService } from 'src/app/services/http.service';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.scss'],
})
export class ControlButtonsComponent  implements OnInit {

  private isAutonomyMode: boolean;
  private autonomyModeButtonColor: string;

  private controlMode: number;
  private controlModeIcon: string;
  private controlModeColor: string;

  constructor(
    private deviceService: DeviceService,
    private robotService: RobotService,
    private alertService: AlertService,
    private httpService: HttpService,
  ) {
    this.isAutonomyMode = false;
    this.autonomyModeButtonColor = 'primary';
    this.controlMode = 1; // 0: Autonomy - 1: Manual
    this.controlModeIcon = 'thumbs-up';
    this.controlModeColor = '';
  }

  ngOnInit() {}

  getAutonomyMode(): boolean {
    return this.isAutonomyMode;
  }

  setAutonomyMode(isAutonomyMode: boolean): void {
    this.isAutonomyMode = isAutonomyMode;
  }

  getAutonomyModeButtonColor(): string {
    return this.autonomyModeButtonColor;
  }

  setAutonomyModeButtonColor(autonomyModeButtonColor: string): void {
    this.autonomyModeButtonColor = autonomyModeButtonColor;
  }

  getControlMode(): number {
    return this.controlMode;
  }

  setControlMode(controlMode: number): void {
    this.controlMode = controlMode;
  }

  getControlModeIcon(): string {
    return this.controlModeIcon;
  }

  setControlModeIcon(controlModeIcon: string): void {
    this.controlModeIcon = controlModeIcon;
  }

  getControlModeColor(): string {
    return this.controlModeColor;
  }

  setControlModeColor(controlModeColor: string): void {
    this.controlModeColor = controlModeColor;
  }

  getDeviceNetworkStatus(): boolean {
    return this.deviceService.getDeviceNetworkStatus();
  }

  controlDisable(): boolean {
    return (!(!this.isAutonomyMode && this.deviceService.getDeviceNetworkStatus() && this.robotService.getConnectionStatus()));
  }

  controlDisableAutonomy(): boolean {
    return (!(this.deviceService.getDeviceNetworkStatus() && this.robotService.getConnectionStatus()));
  }

  toggleAutonomyMode(): void {
    this.isAutonomyMode = !this.isAutonomyMode;
    if (this.isAutonomyMode) {
      this.autonomyModeButtonColor = 'warning';
      this.controlMode = 0;
      this.controlModeIcon = 'accessibility';
      this.controlModeColor = 'warning';
      console.log('Autonomy mode ON.');
      this.alertService.featureUnderDevelopAlert();
    } else {
      this.autonomyModeButtonColor = 'primary';
      this.controlMode = 1;
      this.controlModeIcon = 'thumbs-up';
      this.controlModeColor = '';
      console.log('Autonomy mode OFF.');
    }
  }

  async robotCommand(robotCommand: string): Promise<void> {
    console.log('Is device connected? ' + this.deviceService.getDeviceNetworkStatus());
    console.log('Command to robot: ' + robotCommand);
    if (this.deviceService.getDeviceNetworkStatus()) {
      console.log('Protocol: HTTP');
      try {
        let response: any = await this.httpService.httpPost({ task: robotCommand }, 'http://192.168.1.104:1880/commands');
        response = this.httpService.httpResponseHandle(response);
        if (robotCommand == 'autonomia') { 
          this.toggleAutonomyMode(); 
        }
      } catch(error: any) { 
        error = this.httpService.httpErrorHandle(error); 
      }  
    } else {
      console.log('Sending command failed - Device is not connected to WiFi!');
    }
  } 

}
