import { Injectable } from '@angular/core';
import { User } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CONSTANTS from "../utils/constants";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | any>;
  public currentUser: Observable<User>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {

    const userObj = sessionStorage.getItem('currentUser')!;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(userObj));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: User): Observable<any> {
    const url = `${CONSTANTS.LOGIN_URL}?username=${user.username}`;
    return this.http.get<User>(url)
      .pipe(map((userData: User) => {
        // login successful if there's a jwt token in the response
        if (userData) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return userData;
      })
      );
  }


  logout() {
    const userObj = sessionStorage.getItem('currentUser');

    if (userObj) {
      sessionStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }
}
