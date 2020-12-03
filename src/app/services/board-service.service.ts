import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Teams } from '../models/teams.model';
import { Board } from '../models/board.model';
import { Players } from '../models/players.model';
import { map } from 'rxjs/operators';
import { Team } from '../models/post.model';
import { Club } from '../models/team.model';
import { AuthData } from '../components/auth/auth-data.model';
import { environment } from '../../environments/environment';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {
  
  private teamupdated = new Subject<any[]>();
  private organizeupdated = new Subject<any[]>();
  private teamNewupdated = new Subject<any[]>();
  private matchupdated = new Subject<any[]>();
  private boradupdated = new Subject<any[]>();
  private playersupdated = new Subject<any[]>();
  private firstdPlayerUpdated = new Subject<any[]>();
  private secondPlayerUpdated = new Subject<any[]>();


  public teams: Teams[] = [];
  public teamNew: Club[] = [];
  public board: Board[] = [];
  public match: Teams[] = [];
  public players: Players[] = [];
  public player: Players;
  public firstdPlayer: AuthData[] = [];
  public secondPlayer: AuthData[] = [];
  public teamOrganized: any;
  
  constructor(private httpclient: HttpClient) { }

  getBoard() {
    return this.httpclient.get<{ message: string, board: Board[] }>(baseUrl + 'api/board')
      .subscribe(data => {
        this.board = data.board;
        this.boradupdated.next([...this.board]);
      });
  }

  getTeams() {
    this.httpclient
      .get<{ message: string; teams: any }>(
        baseUrl
      )
      .pipe(map((teamData) => {
        return teamData.teams.map(team => {
          return {
            team: team.team,
            score: team.score,
            fname: team.fname,
            sname: team.sname,
            id: team._id
          };
        });
      }))
      .subscribe(transformedTeams => {
        this.teams = transformedTeams;
        this.teamupdated.next([...this.teams]);
      });
  }

  addTeam(team: string, score: string, fname: string, sname: string) {
    const post: Team = { id: null, team: team, score: score, fname: fname, sname: sname };
    this.httpclient
      .post<{ message: string, postId: string }>(baseUrl, post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.teams.push(post);
        this.teamupdated.next([...this.teams]);
      });
  }

  deleteTeam(postId: string) {
    this.httpclient.delete(baseUrl + postId)
      .subscribe(() => {
        const updatedPosts = this.teams.filter(post => post.id !== postId);
        this.teams = updatedPosts;
        this.teamupdated.next([...this.teams]);
      });
  }

  // match

  addMatch(team: string, score: string, firstpalyer: string, secondPlayer: string) {
    const match = { id: null, team: team, score: score, fname: firstpalyer, sname: secondPlayer };
console.log('match created', match);
    return this.httpclient.post<{ message: string, matchid: string }>(baseUrl, match)
      .subscribe(responseData => {
        console.log('match created', responseData);
        const id = responseData.matchid;
        match.id = id;
        this.match.push(match);
        this.matchupdated.next([...this.match]);
      });

  }

  getMatch() {
    return this.httpclient.get<{ message: string, matches: any[] }>(baseUrl + "api/match/")
      .pipe(map((matchData) => {
        return matchData.matches.map(match => {
          return {
            team: match.team,
            score: match.score,
            fname: match.fname,
            sname: match.sname,
            id: match._id
          };
        });
      }))
      .subscribe(transformedmatches => {
        this.match = transformedmatches;
        this.matchupdated.next([...this.match]);
      });
  }

  getMatchRaisedHand(PlayerId: string) {
    return this.httpclient.get<any>(baseUrl + "api/match/" + PlayerId).subscribe(response => {
      console.log(response);
    });
  }

  getPlayers() {
    return this.httpclient.get<any>(baseUrl + 'players')
      .subscribe(data => {
        this.players = data;
        this.playersupdated.next([...this.players]);
      })
      ;
  }



  getAuthorizedPlayer(playerid: number) {
    return this.httpclient.get<any>(`${baseUrl}players/${playerid}`);
  }




  // Observables
  getTeamUpdatedListener() {
    return this.teamupdated.asObservable();
  }

  getMatchUpdatedListener() {
    return this.matchupdated.asObservable();
  }

  getBoardUpdatedListener() {
    return this.boradupdated.asObservable();
  }

  getPlayersUpdatedListener() {
    return this.playersupdated.asObservable();
  }

  getTeamNewUpdatedListener() {
    return this.teamNewupdated.asObservable();
  }

  // New Team based on change structre
  createTeam(teamName) {
    const team = { id: null, team: teamName };
    return this.httpclient.post<{ message: string, teamid: string }>(baseUrl + "api/teams", team)
      .subscribe(result => {
        const id = result.teamid;
        team.id = id;
        this.teamNew.push(team);
        this.teamNewupdated.next([...this.teamNew]);
      });
  }

  getNewTeam() {
    return this.httpclient.get<{ message: string; team: any }>(baseUrl + "api/teams")
      .pipe(map((teamData) => {
        return teamData.team.map(team => {
          return {
            team: team.teamName,
            id: team._id
          };
        });
      }))
      .subscribe(transfrormedData => {
        this.teamNew = transfrormedData;
        this.teamNewupdated.next([...this.teamNew])
      })
  }


  getFirstPlayer() {
    return this.httpclient.get<{ message: string, team: AuthData[] }>(baseUrl + "api/users/clubs")
      .subscribe(response => {
        console.log(response);
        this.firstdPlayer = response.team;
        this.firstdPlayerUpdated.next([...this.firstdPlayer]);
      });
  }

  getfirstdPlayerUpdatedListener() {
    return this.firstdPlayerUpdated.asObservable();
  }

  getSecondPlayer() {
    return this.httpclient.get<{ message: string, team: AuthData[] }>(baseUrl + "api/users/clubs")
      .subscribe(response => {
        console.log(response);
        this.secondPlayer = response.team;
        this.secondPlayerUpdated.next([...this.secondPlayer]);
      });
  }

  getSecondPlayerUpdatedListener() {
    return this.secondPlayerUpdated.asObservable();
  }


  organizeTeam(firstPlayer: string, secondPlayer: string, team: string, score: string) {
    const teamOrganized = { id: null, team: team, firstPlayer: firstPlayer, secondPlayer: secondPlayer, score: score };
    return this.httpclient.post<{ message: string; teamOrganized: any }>(baseUrl + "api/teamOrganized", teamOrganized)
      .subscribe(response => {
        console.log(response.teamOrganized);
      });
  }

  getOrgonizeTeam() {
    return this.httpclient.get<{ message: string, orgnaizedTeam: any }>(baseUrl + "api/teamOrganized")
      .pipe(map((orgnaizedData) => {
        return orgnaizedData.orgnaizedTeam.map(team => {
          return {
            team: team.team,
            firstPlayer: team.firstPlayer,
            secondPlayer: team.secondPlayer,
            score: team.score,
            id: team._id
          };
        });
      }
      ))
      .subscribe(teamTransformed => {
        console.log('teamTransformed', teamTransformed);
        this.teamOrganized = teamTransformed;
        this.organizeupdated.next([...this.teamOrganized]);
      });
  }

  getOrganaizeUpdatedListener() {
    return this.organizeupdated.asObservable();
  }

}
