import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {SERVER_NAME} from './../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the AuhtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuhtProvider {
  private errorObserver: any;
  public error: any;
  constructor(public http: HttpClient) {
    console.log('Hello AuhtProvider Provider');
  }

  login(username,password):Observable<any>{
    console.log(SERVER_NAME+"t=access&uEmail="+username+"&uPwd="+password);
    return this.http.get(SERVER_NAME+"t=access&uEmail="+username+"&uPwd="+password)
    .map(res => res);
  }

  register(uName,uEmail,uPwd):Observable<any>{
    console.log(SERVER_NAME+"t=register&uName="+uName+"&uEmail="+uEmail+"&uPwd="+uPwd);
    return this.http.get(SERVER_NAME+"t=register&uName="+uName+"&uEmail="+uEmail+"&uPwd="+uPwd)
    .map(res => res);
  }

 private handleError(error) {
    this.errorObserver.next(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
