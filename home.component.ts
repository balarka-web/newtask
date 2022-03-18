import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'src/login'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public login!: FormGroup;
  public arr!:any;
  flag!: boolean;
  public temp:any;
  public a=true;
  public b=false;
  public c!: boolean;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.login = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['']
    })
  }

  public loginUser() {

    // this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res => {
    // const user = res.find((a: any) => {
    //     return a.email === this.login.value.email && a.password === this.login.value.password
    //   });
    //   const token = {
    //     email:this.login.value.email,
    //     password:this.login.value.password
    //   }

    //   if (user) {
    //     this.login.reset();
    //     // localStorage.setItem('token',JSON.stringify(token));
    //     this.router.navigate(['dashboard']);
    //   } else {
    //     alert("user not found");
    //   }
    // }, err => {
    //     alert("something went wrong");
    //   })




    this.auth.logIn().subscribe(res=>{
      this.arr= res;
      this.flag=this.check();
      const token = {
            email:this.login.value.email,
            password:this.login.value.password
          }
      if (this.flag) {
        this.login.reset();
        localStorage.setItem('token',JSON.stringify(token))
        this.router.navigate(['dashboard']);
      } else {
        alert("user not found");
      }
    }, err => {
        alert("something went wrong");
      })
    }


      public check():boolean {
      for(let i=0;i<this.arr.length;i++){
        if(this.arr[i].email === this.login.value.email && this.arr[i].password === this.login.value.password){
         this.c=this.a;
          }
        }
        return this.c;
      }

//checking
// public check(res:any):boolean {
//   res.forEach((e: { email: any; password: any; }) => {
//     e.email === this.login.value.email && e.password === this.login.value.password;
//   });
// return res.email === this.login.value.email && res.password === this.login.value.password
// }

}
