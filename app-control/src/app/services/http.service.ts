import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EdgeNodeReply } from '../common/interfaces';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //static MAX_CONSECUTIVE_ERRORS = 10;
  private consecutiveErrors: number;

  constructor(
    public httpClient: HttpClient,
  ) {
    this.consecutiveErrors = 0;
  }

  httpGet(source: string): Promise<any> {
    return lastValueFrom(this.httpClient.get(source));
  }

  httpPost(data: any, destination: string): Promise<any> {
    return lastValueFrom(this.httpClient.post(destination, data));
  } 

  httpResponseHandle(response: any): EdgeNodeReply {
    response = <EdgeNodeReply>response;
    console.log('--- HTTP RESPONSE -------------------');
    console.log('- RESPONSE.NAME: ' + response.name);
    console.log('- RESPONSE.MESSAGE: ' + response.message);
    console.log('- RESPONSE.STATUS: ' + response.status);
    console.log('-------------------------------------');
    return response;
  }

  httpErrorHandle(error: any): HttpErrorResponse {
    error = <HttpErrorResponse>error;
    console.log('--- HTTP ERROR ----------------------');
    console.log('- ERROR.NAME: ' + error.name);
    console.log('- ERROR.MESSAGE: ' + error.message);
    console.log('- ERROR.STATUS: ' + error.status);
    console.log('-------------------------------------');
    this.consecutiveErrors++;
    console.log('- Consecutive errors: ' + this.consecutiveErrors)
    console.log('-------------------------------------');
    return error;
  }

  getConsecutiveErrors(): number {
    return this.consecutiveErrors;
  }

}

