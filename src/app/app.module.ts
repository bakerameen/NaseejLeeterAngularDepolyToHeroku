import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { BoardComponent } from './components/board/board.component';
import {TeamsComponent} from './components/teams/teams.component';
import { TeamCreateComponent } from './components/teams/team-create/team-create.component';
import { TeamListComponent } from './components/teams/team-list/team-list.component';
import { MatchComponent} from './components/match/match.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthInterceptor } from './components/auth/auth-interceptor';



import { ModalModule } from 'ngx-bootstrap/modal';
import { SignupTeamsComponent } from './components/auth/signup-teams/signup-teams.component'; 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,    
    HeaderComponent,
    FooterComponent,
    BoardComponent,
    TeamsComponent,
    TeamCreateComponent,
    TeamListComponent,
    MatchComponent,
    LoginComponent,
    SignupComponent,
    SignupTeamsComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    CountdownModule,
    FormsModule,
    ModalModule.forRoot(),  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
