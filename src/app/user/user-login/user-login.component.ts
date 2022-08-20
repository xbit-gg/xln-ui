import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'xln-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    apiKey: new FormControl('', [Validators.required]),
  });
  textLogin = true;

  hideUsernameInput = !environment.requireUserId;
  hasLnAuth = true;

  constructor(private authService: AuthService, private router: Router) {
    if (this.hideUsernameInput) {
      this.loginForm.setValue({'username': 'unused', 'apiKey': ''});
    }
    this.hasLnAuth = false;
  }

  ngOnInit(): void {
    if (this.hasLnAuth) {
      this.textLogin = false;
    }
  }

  toggleLoginMethod(): void {
    this.textLogin = !this.textLogin;
  }

  login(): void {
    this.authService.userLogin(this.loginForm.value.username, this.loginForm.value.apiKey);
    this.router.navigate(['/dashboard']);
  }
}
