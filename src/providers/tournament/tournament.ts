import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {SERVER_NAME,SERVER_PATH_IMG} from './../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TournamentProvider {
  private errorObserver: any;
  public error: any;
  constructor(public http: HttpClient) {
    console.log('Hello Players Provider');
  }

  getNewsFeed(userId,rows):Observable<any>{
    console.log(SERVER_NAME+"NewsFeed.aspx?uId=15&rs="+rows+"&rc=5");
    return this.http.get(SERVER_NAME+"NewsFeed.aspx?uId=15&rs="+rows+"&rc=5")
    .map(res => res);
  }

  getTournamentsList(userId,rows):Observable<any>{
    console.log(SERVER_NAME+"Tourney.aspx?t=list&uId=15&rs="+rows+"&rc=5");
    return this.http.get(SERVER_NAME+"Tourney.aspx?t=list&uId=15&rs="+rows+"&rc=5")
    .map(res => res);
  }
  
  private handleError(error) {
    this.errorObserver.next(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}