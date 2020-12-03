import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BoardServiceService } from '../../../services/board-service.service';
import { Subscription } from 'rxjs';
import { Club } from '../../../models/team.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return
    }
    this.authService.loginUser(loginForm.value.email, loginForm.value.password);
    console.log(loginForm.value);
  }


}
