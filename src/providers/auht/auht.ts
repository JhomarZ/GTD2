import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
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
    console.log("http://www.grandestorneos.com/JSON/User.aspx?t=access&uEmail="+username+"&uPwd="+password);
    return this.http.get("http://www.grandestorneos.com/JSON/User.aspx?t=access&uEmail="+username+"&uPwd="+password)
    .map(res => res);
  }

 private handleError(error) {
    this.errorObserver.next(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
