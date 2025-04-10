import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RobotService implements OnDestroy {

  private keepAlive!: Subscription;

  private batteryLevel: number;
  private connectionStatus: boolean;

  private updateSubject = new Subject<void>();
  updateObservable = this.updateSubject.asObservable();

  constructor(private httpService: HttpService) { 
    this.batteryLevel = -1; // No info available
    this.connectionStatus = false;
    this.keepAlive = interval(5000).subscribe(async () => {
      try {
        let response = await this.httpService.httpGet('http://192.168.1.104:1880/keepalive');
        response = this.httpService.httpResponseHandle(response);
        this.connectionStatus = true;
        this.batteryLevel = response.message;
      } catch (error: any) {
        this.httpService.httpErrorHandle(error);
        this.connectionStatus = false;
        this.batteryLevel = -1;
      }
      this.updateSubject.next();
    });
  }

  getBatteryLevel(): number {
    return this.batteryLevel;
  }

  getConnectionStatus(): boolean {
    return this.connectionStatus;
  }

  ngOnDestroy(): void {
    if (this.keepAlive) {
      this.keepAlive.unsubscribe();
    }
  }

}
