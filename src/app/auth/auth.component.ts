import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';
import { LoginRequest } from "./login-request.model";
import { LoginResult } from "./login-result.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  form!: FormGroup;
  loginVisible = true;
  loading = false;
  error = "";

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  onSwitch() {
    this.loginVisible = !this.loginVisible;
  }

  onSubmit() {
    var loginRequest = <LoginRequest>{};
    loginRequest.email = this.form.value.email;
    loginRequest.password = this.form.value.password;

    this.loading = true;
    if (this.loginVisible) {
      this.authService.login(loginRequest).subscribe(
        (loginResult: LoginResult) => {
          this.loading = false;
          if (loginResult.success) {
            this.router.navigate(['/recipes']);
          }
          else {
            this.error = "Error: " + loginResult.message;
          }
        }, (errorResult: LoginResult) => {
          this.loading = false;
          this.error = "Error: " + errorResult.message;
        }
      );
    }
    else {
      this.authService.createUser(loginRequest).subscribe(
        (loginResult: LoginResult) => {
          this.loading = false;
          if (loginResult.success) {
            this.router.navigate(['/recipes']);
          }
          else {
            this.error = "Error: " + loginResult.message;
          }
        }, (errorResult: LoginResult) => {
          this.loading = false;
          this.error = "Error: " + errorResult.message;
        }
      );
    }
  }
}
