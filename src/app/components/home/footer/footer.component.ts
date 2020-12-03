import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
userIsAuthenticated = false;
authListenerSubs = new Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.userIsAuthenticated = this.authService.getIsAuth();   
    this.authListenerSubs = this.authService.geAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;      
    });
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
