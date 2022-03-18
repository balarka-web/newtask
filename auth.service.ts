import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url="http://localhost:3000/signupUsers";

  constructor(private http:HttpClient) { }

  signUp(body: any){
  return  this.http.post(this.url,body)
  }

  logIn(){
    return this.http.get(this.url)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
