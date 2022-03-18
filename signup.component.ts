import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    //console.log(JSON.stringify(this.form.value, null, 2));
    // this.http.post<any>("http://localhost:3000/signupUsers", this.form.value).subscribe(res => {
    //   alert("Signup Success");
    //   this.form.reset();
    //   this.router.navigate(['home']);
    // }, err => {
    //   alert("wrong");
    // })
    const body = {
      username:this.form.value.username,
      email:this.form.value.email,
      password:this.form.value.password
    }
    this.auth.signUp(body)
    .subscribe(data =>{
      console.log(data);
    }, (err)=>{
      console.log('error');
    })
    alert("Signup Success");
    this.form.reset();
    this.router.navigate(['home']);
  }
}
