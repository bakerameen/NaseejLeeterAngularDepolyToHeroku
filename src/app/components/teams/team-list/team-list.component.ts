import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { BoardServiceService } from '../../../services/board-service.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private organizeSub: Subscription;
  public organizedTeams: any;

  constructor(private teamService: BoardServiceService, private authService: AuthService) { }

  ngOnInit() {

    // check user Auth
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.teamService.getOrgonizeTeam();

    this.organizeSub = this.teamService.getOrganaizeUpdatedListener()
    .subscribe( team => {
      this.organizedTeams = team;   
    });
    
    
  }

  onDelete(teamId: string) {
    console.log(teamId)
    this.teamService.deleteTeam(teamId);
  }

  onAddMatch(match) {   
    this.teamService.addMatch(match.team, match.score, match.firstPlayer, match.secondPlayer);
  }

ngOnDestroy() {
  this.organizeSub.unsubscribe();
} 
  
}
