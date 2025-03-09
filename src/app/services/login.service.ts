import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
// import { UserFile } from 'src/app/routes/domain/UserFile';
// import { User } from 'src/app/routes/domain/User';

const defaultUser = null;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user$ = new BehaviorSubject<any | null>(defaultUser);
  baseUrl: string = environment.apiRootURL;
  constructor(private httpClient: HttpClient) {

  }

  public loginRequest(data1: any) {
    console.log(data1);
    return this.httpClient.post<any>(this.baseUrl + 'Login', data1)
  }


  logout() {
    // this.storage.remove(CredentialKeys.Login);
    this.user$.next(defaultUser);
    // this.storage.clear();
  }

}
