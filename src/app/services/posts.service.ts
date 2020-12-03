import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Team } from "../models/post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private teams: Team[] = [];
  private postsUpdated = new Subject<Team[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((postData) => {
        console.log('post' + postData);
        return postData.posts.map(post => {
          
          return {
            team: post.team,
            score: post.score,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.teams = transformedPosts;
        this.postsUpdated.next([...this.teams]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addTeam(team: string, score: string, fname: string, sname: string) {
    const post: Team = { id: null, team: team, score: score, fname: fname, sname: sname };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.teams.push(post);
        this.postsUpdated.next([...this.teams]);
      });
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.teams.filter(post => post.id !== postId);
        this.teams = updatedPosts;
        this.postsUpdated.next([...this.teams]);
      });
  }
}
