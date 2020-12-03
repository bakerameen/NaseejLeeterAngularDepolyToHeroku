import { Component, OnInit , TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';  

import { ActivatedRoute } from '@angular/router';
import { BoardServiceService } from '../../services/board-service.service';
import { Team } from '../../models/post.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  modalRef: BsModalRef; 
  matches: Team[] = [];
  playerClicked = false;
  constructor(private roue: ActivatedRoute, private matchService: BoardServiceService, private modalService: BsModalService, private userInformation: AuthService) { }
  user;
  matchSub : Subscription
  
  
  ngOnInit() {
    this.matchService.getMatch();
    this.matchSub = this.matchService.getMatchUpdatedListener()
      .subscribe((match: Team[]) => {
         this.matches = match;
        
      });
  }

  handRaised(playerID: string, template: TemplateRef<any>) {    
    this.user = this.userInformation.getUserClickedInformation();
     this.playerClicked = true;
     this.modalRef = this.modalService.show(  
       template,  
       Object.assign({}, { class: 'gray modal-lg' })  
     );  

    // this.matchService.getMatchRaisedHand(playerID);
   }
    

}