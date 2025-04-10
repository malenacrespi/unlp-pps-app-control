import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-robot-status',
  templateUrl: './robot-status.component.html',
  styleUrls: ['./robot-status.component.scss'],
})
export class RobotStatusComponent  implements OnInit {

  private robotStatus!: Subscription;

  private batteryLevelPercentage: number;
  private batteryLevelIcon: string;
  private batteryLevelColor: string;

  private connectionStatus: boolean;
  private connectionStatusColor: string;

  constructor(private robotService: RobotService) { 
    this.batteryLevelPercentage = -1;
    this.batteryLevelIcon = 'battery-full';
    this.batteryLevelColor = '';
    this.connectionStatus = false;
    this.connectionStatusColor = 'danger';
  }

  ngOnInit() {
    this.robotStatus = this.robotService.updateObservable.subscribe(() => {
      this.updateBatteryLevel();
      this.updateConnectionStatus();
    });
  }
  
  getBatteryLevelPercentage(): number {
    return this.batteryLevelPercentage;
  }

  setBatteryLevelPercentage(batteryLevelPercentage: number): void {
    this.batteryLevelPercentage = batteryLevelPercentage;
  }

  getBatteryLevelIcon(): string {
    return this.batteryLevelIcon;
  }

  setBatteryLevelIcon(batteryLevelIcon: string): void {
    this.batteryLevelIcon = batteryLevelIcon;
  }

  getBatteryLevelColor(): string {
    return this.batteryLevelColor;
  }

  setBatteryLevelColor(batteryLevelColor: string): void {
    this.batteryLevelColor = batteryLevelColor;
  }

  private updateBatteryLevel(): void {
    this.batteryLevelPercentage = this.robotService.getBatteryLevel();
    if (this.batteryLevelPercentage >= 66) {
      this.batteryLevelIcon = 'battery-full';
      this.batteryLevelColor = 'success';
    } else if (this.batteryLevelPercentage < 66 && this.batteryLevelPercentage >= 33) {
      this.batteryLevelIcon = 'battery-half';
      this.batteryLevelColor = 'warning';
    } else if (this.batteryLevelPercentage < 33 && this.batteryLevelPercentage >= 0) {
      this.batteryLevelIcon = 'battery-dead';
      this.batteryLevelColor = 'danger';
    } else {
      this.batteryLevelIcon = 'battery-charging';
      this.batteryLevelColor = 'medium';
    }
  }

  getConnectionStatus(): boolean {
    return this.connectionStatus;
  }

  setConnectionStatus(connectionStatus: boolean): void {
    this.connectionStatus = connectionStatus;
  }

  getConnectionStatusColor(): string {
    return this.connectionStatusColor;
  }

  setConnectionStatusColor(connectionStatusColor: string): void {
    this.connectionStatusColor = connectionStatusColor;
  }

  private updateConnectionStatus(): void {
    this.connectionStatus = this.robotService.getConnectionStatus();
    this.connectionStatus ? this.connectionStatusColor = 'success' : this.connectionStatusColor = 'danger';
  }

  ngOnDestroy(): void {
    if (this.robotStatus) {
      this.robotStatus.unsubscribe();
    }
  }

}
