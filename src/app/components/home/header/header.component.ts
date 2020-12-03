import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardServiceService } from '../../../services/board-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: BoardServiceService) { }

  ngOnInit() {}

}
