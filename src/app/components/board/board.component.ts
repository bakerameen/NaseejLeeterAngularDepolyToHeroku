import { Component, OnInit } from '@angular/core';
import { BoardServiceService } from '../../services/board-service.service';
import { Board } from '../../models/board.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
Boards: Board[] = [];
private datasSub: Subscription;
  constructor(private boradSrv: BoardServiceService) { }

  ngOnInit() {
    this.boradSrv.getBoard();
    this.datasSub = this.boradSrv.getBoardUpdatedListener().subscribe(data => {
      this.Boards = data;
      console.log(data);
    });
  }

}
