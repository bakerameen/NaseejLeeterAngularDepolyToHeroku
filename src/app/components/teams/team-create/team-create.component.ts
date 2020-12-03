import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BoardServiceService } from '../../../services/board-service.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthData } from '../../auth/auth-data.model';
import { Club } from '../../../models/team.model';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss']
})
export class TeamCreateComponent implements OnInit {
  userIsAuthenticated = false;
  private teamSub: Subscription;
  private firstPlayerSub: Subscription;
  private secondPlayerSub: Subscription;

  firstPlayer: AuthData[] = [];
  secondPlayer: AuthData[] = [];
  teams: Club[] = [];

  constructor(private teamService: BoardServiceService, private authService: AuthService) { }

  ngOnInit() {

    // check user Auth
    this.userIsAuthenticated = this.authService.getIsAuth();
    // get teams
    this.teamService.getNewTeam();
    this.teamSub = this.teamService.getTeamNewUpdatedListener()
      .subscribe((data: Club[]) => {
        this.teams = data;
      });
    // get First Player
    this.teamService.getFirstPlayer();
    this.firstPlayerSub = this.teamService.getfirstdPlayerUpdatedListener()
      .subscribe((teams: AuthData[]) => {
        this.firstPlayer = teams;
      });
    //get Second Player
    this.teamService.getSecondPlayer();
    this.secondPlayerSub = this.teamService.getSecondPlayerUpdatedListener()
      .subscribe((player: AuthData[]) => {
        this.secondPlayer = player;
      });
  }
  

  onOrganizeTeam(TeamForm: NgForm) {
    if (TeamForm.invalid) {
      return;
    }
    console.log(TeamForm.value);
    
// connect to service
    this.teamService.organizeTeam(TeamForm.value.firstplayer, TeamForm.value.secondplayer, TeamForm.value.team,TeamForm.value.score);

    
    TeamForm.resetForm();
  }

  ngOnDestroy() {
    this.teamSub.unsubscribe();
    this.firstPlayerSub.unsubscribe();
    this.secondPlayerSub.unsubscribe();
  }


}
