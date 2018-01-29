import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {SERVER_NAME} from './../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlayerProvider {
  private errorObserver: any;
  public error: any;
  constructor(public http: HttpClient) {
    console.log('Hello Players Provider');
  }

  getPlayersTop(userId):Observable<any>{
    //console.log(SERVER_NAME+"t=access&uEmail="+username+"&uPwd="+password);
    return this.http.get("../../assets/services/top-players.json")
    .map(res => res);
  }

  private handleError(error) {
    this.errorObserver.next(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}