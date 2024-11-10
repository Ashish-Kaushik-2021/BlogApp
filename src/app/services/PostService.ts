import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../interface/IPost';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService
{

  private baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private httpClient: HttpClient)
  {
    this.baseUrl = environment.baseUrl;
  }

  getPosts(searchTerm = ""): Observable<IPost[]>
  {
    return this.httpClient.get<IPost[]>(`${environment.baseUrl}/api/post?searchTerm=${searchTerm}`);
  }

  getPost(id: number): Observable<IPost>
  {
    return this.httpClient.get<IPost>(`${environment.baseUrl}/api/post/${id}`);
  }

  updatePost(id: number, post: IPost): Observable<boolean>
  {
    return this.httpClient.put<boolean>(`${environment.baseUrl}/api/post/${id}`, JSON.stringify(post), this.httpOptions);
  }

  createPost(post: IPost): Observable<boolean>
  {
    return this.httpClient.post<boolean>(`${environment.baseUrl}/api/post`, JSON.stringify(post), this.httpOptions);
  }

  removePost(id: number): Observable<boolean>
  {
    return this.httpClient.delete<boolean>(`${environment.baseUrl}/api/post/${id}`);
  }

}
