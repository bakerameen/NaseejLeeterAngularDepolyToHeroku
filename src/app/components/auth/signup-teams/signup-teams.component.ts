import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BoardServiceService } from '../../../services/board-service.service';
import { Club } from '../../../models/team.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup-teams',
  templateUrl: './signup-teams.component.html',
  styleUrls: ['./signup-teams.component.scss']
})
export class SignupTeamsComponent implements OnInit {
  teams: Club[] = [];
  private teamSub: Subscription;

  constructor(private teamService: BoardServiceService) { }

  ngOnInit() {
    this.teamService.getNewTeam();
    this.teamSub = this.teamService.getTeamNewUpdatedListener()
      .subscribe((teams: Club[]) => {
        this.teams = teams;
        console.log(this.teams);
      });
  }

  onAddTeam(teamForm: NgForm) {
    console.log(teamForm.value.team);
    this.teamService.createTeam(teamForm.value.team);
  }

  

}
