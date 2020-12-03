import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Club } from '../../../models/team.model';
import { Subscription } from 'rxjs';
import { BoardServiceService } from '../../../services/board-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  teams: Club[] = [];
  private teamSub: Subscription;

  constructor(public authService: AuthService, private teamService: BoardServiceService) { }

  ngOnInit() {
    this.teamService.getNewTeam();
this.teamSub = this.teamService.getTeamNewUpdatedListener()
.subscribe( (data: Club[]) => {
  this.teams = data;
});
  }

  onSignup(SignupForm: NgForm) {
    console.log(SignupForm);
    if (SignupForm.invalid) {
return;
    }
    this.authService.createUser(SignupForm.value.email, SignupForm.value.password, SignupForm.value.user, SignupForm.value.team);
  }

  ngOnDestroy() {
    this.teamSub.unsubscribe();
  }
}
