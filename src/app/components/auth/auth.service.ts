import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

const baseUrl = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) { };

    createUser(email: string, password: string, user: string, team: string) {
        const authData: AuthData = { email: email,  password: password, user: user,  team: team };
        console.log('authData', authData);
        this.http.post(baseUrl + "api/users/signup", authData)
            .subscribe(response => {
                console.log(response);
            });
    };

    loginUser(email: string, password: string) {
        // const authData: AuthData = { email: email, password: password };
        const authData = { email: email, password: password };
        this.http.post<{ token: string; expiresIn: number, team: string, user: string }>(baseUrl + "api/users/login", authData)
            .subscribe(response => {                
                const expiresInDuration = response.expiresIn;                
                const token = response.token;
                const team = response.team;
                const user = response.user;
                this.token = token;
                console.log(user);
                if (token) {
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    this.setAuthTimer(expiresInDuration);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);                    
                    this.saveAuthData(token, expirationDate, team, user);
                    this.router.navigate(['/']);
                }
            });
    };

    getIsAuth() {
        return this.isAuthenticated;
    }

    getToken() {
        return this.token;
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    geAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    private saveAuthData(token: string, expirationDate: Date, team: string, user: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("user", user);
        localStorage.setItem("team", team)
    }

    getUserClickedInformation() {
        const clickedInformation = this.getAuthData();        
        return clickedInformation;
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();        
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          this.token = authInformation.token;
          this.isAuthenticated = true;
          this.setAuthTimer(expiresIn / 1000);
          this.authStatusListener.next(true);
        }
      }

      private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("team");
        localStorage.removeItem("user");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const team = localStorage.getItem("team");
        const user = localStorage.getItem("user");

        if (!token || !expirationDate) {
          return;
        }
        return {
          token: token,
          expirationDate: new Date(expirationDate),
          team: team,
          user: user
        }
      }
}